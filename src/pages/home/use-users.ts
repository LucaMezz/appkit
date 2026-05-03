import { useCallback, useState } from "react";

import type { users } from "@/schema";

type User = typeof users.$inferSelect;

interface UseUsersReturn {
  usersPromise: Promise<User[]>;
  registerUser: (name: string) => Promise<void>;
  deleteUsers: (userIds: number[]) => Promise<void>;
}

export function useUsers(): UseUsersReturn {
  const [usersPromise, setUsersPromise] = useState<Promise<User[]>>(() =>
    window.desktopApi.storage.users.fetch(),
  );

  const registerUser = useCallback(
    async (name: string): Promise<void> => {
      const newUsersPromise = (async (): Promise<User[]> => {
        const [currentUsers, newUser] = await Promise.all([
          usersPromise,
          window.desktopApi.storage.users.register(name),
        ]);
        return [...currentUsers, newUser];
      })();

      setUsersPromise(newUsersPromise);
      await newUsersPromise;
    },
    [usersPromise],
  );

  const deleteUsers = useCallback(
    async (userIds: number[]): Promise<void> => {
      if (userIds.length === 0) {
        return;
      }

      const newUsersPromise = (async (): Promise<User[]> => {
        const currentUsers = await usersPromise;
        await window.desktopApi.storage.users.delete(userIds);
        return currentUsers.filter((user) => !userIds.includes(user.id));
      })();

      setUsersPromise(newUsersPromise);
      await newUsersPromise;
    },
    [usersPromise],
  );

  return {
    usersPromise,
    registerUser,
    deleteUsers,
  };
}

if (import.meta.vitest) {
  const { describe, it, expect, vi, beforeEach } = import.meta.vitest;

  describe("useUsers", async () => {
    const { renderHook, act } = await import("@testing-library/react");

    const mockUsers: User[] = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];

    const mockNewUser: User = { id: 3, name: "Charlie" };

    beforeEach(() => {
      vi.clearAllMocks();

      vi.stubGlobal("desktopApi", {
        storage: {
          users: {
            fetch: vi.fn(() => Promise.resolve(mockUsers)),
            register: vi.fn(() => Promise.resolve(mockNewUser)),
            delete: vi.fn(() => Promise.resolve()),
          },
        },
      });
    });

    it("should initialize useUsers hook properly", () => {
      const { result } = renderHook(() => useUsers());

      expect(result.current.usersPromise).toBeDefined();
      expect(typeof result.current.registerUser).toBe("function");
      expect(typeof result.current.deleteUsers).toBe("function");
    });

    it("should call fetchUsers on initialization", async () => {
      const { result } = renderHook(() => useUsers());

      await result.current.usersPromise;

      expect(window.desktopApi.storage.users.fetch).toHaveBeenCalledTimes(1);
    });

    it("should perform optimistic update when registerUser succeeds", async () => {
      const { result } = renderHook(() => useUsers());

      await act(async () => {
        await result.current.registerUser("Charlie");
      });

      const updatedUsers = await result.current.usersPromise;
      expect(updatedUsers).toEqual([...mockUsers, mockNewUser]);
    });

    it("should delete specific users when deleteUsers succeeds", async () => {
      const { result } = renderHook(() => useUsers());

      await act(async () => {
        await result.current.deleteUsers([1]);
      });

      const users = await result.current.usersPromise;
      expect(users).toEqual([{ id: 2, name: "Bob" }]);
    });

    it("should reject Promise when registerUser fails", async () => {
      vi.stubGlobal("desktopApi", {
        storage: {
          users: {
            fetch: () => Promise.resolve(mockUsers),
            register: () => Promise.reject(new Error("Registration failed")),
            delete: () => Promise.resolve(),
          },
        },
      });

      const { result } = renderHook(() => useUsers());

      await expect(
        act(async () => {
          await result.current.registerUser("Charlie");
        }),
      ).rejects.toThrow("Registration failed");
    });

    it("should reject Promise when deleteUsers fails", async () => {
      vi.stubGlobal("desktopApi", {
        storage: {
          users: {
            fetch: () => Promise.resolve(mockUsers),
            register: () => Promise.resolve(mockNewUser),
            delete: () => Promise.reject(new Error("Delete failed")),
          },
        },
      });

      const { result } = renderHook(() => useUsers());

      await expect(
        act(async () => {
          await result.current.deleteUsers([1]);
        }),
      ).rejects.toThrow("Delete failed");
    });
  });
}
