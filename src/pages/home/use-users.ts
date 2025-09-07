import { useCallback, useState } from "react";
import type { AllowedChannel } from "@/preload";
import type { users } from "@/schema";

type User = typeof users.$inferSelect;

interface UseUsersReturn {
  usersPromise: Promise<User[]>;
  registerUser: (name: string) => Promise<void>;
  deleteAllUsers: () => Promise<void>;
}

export function useUsers(): UseUsersReturn {
  const [usersPromise, setUsersPromise] = useState<Promise<User[]>>(
    window.ipcRenderer.invoke("fetchUsers"),
  );

  const registerUser = useCallback(
    async (name: string): Promise<void> => {
      const newUsersPromise = (async (): Promise<User[]> => {
        const [currentUsers, newUser] = await Promise.all([
          usersPromise,
          window.ipcRenderer.invoke("registerUser", name),
        ]);
        return [...currentUsers, newUser];
      })();

      setUsersPromise(newUsersPromise);
      await newUsersPromise;
    },
    [usersPromise],
  );

  const deleteAllUsers = useCallback(async (): Promise<void> => {
    await window.ipcRenderer.invoke("deleteUsers");
    setUsersPromise(Promise.resolve([]));
  }, []);

  return {
    usersPromise,
    registerUser,
    deleteAllUsers,
  };
}

if (import.meta.vitest) {
  const { describe, it, expect, vi, beforeEach, beforeAll } = import.meta
    .vitest;

  describe("useUsers", async () => {
    const { renderHook, act } = await import("@testing-library/react");
    const mockUsers: User[] = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];

    const mockNewUser: User = { id: 3, name: "Charlie" };

    // Mock IPC renderer
    const mockIpcRenderer = {
      invoke: vi.fn(),
    };

    beforeAll(() => {
      // Setup global window object once
      Object.defineProperty(globalThis, "window", {
        value: {
          ipcRenderer: mockIpcRenderer,
        },
        writable: true,
        configurable: true,
      });
    });

    beforeEach(() => {
      vi.clearAllMocks();

      mockIpcRenderer.invoke.mockImplementation((channel: AllowedChannel) => {
        switch (channel) {
          case "fetchUsers":
            return Promise.resolve(mockUsers);
          case "registerUser":
            return Promise.resolve(mockNewUser);
          case "deleteUsers":
            return Promise.resolve();
          default:
            throw new Error(`Unknown channel: ${channel satisfies never}`);
        }
      });
    });

    it("should initialize useUsers hook properly", () => {
      const { result } = renderHook(() => useUsers());

      // Check if required properties exist
      expect(result.current).toHaveProperty("usersPromise");
      expect(result.current).toHaveProperty("registerUser");
      expect(result.current).toHaveProperty("deleteAllUsers");

      // Check if functions are properly defined
      expect(typeof result.current.registerUser).toBe("function");
      expect(typeof result.current.deleteAllUsers).toBe("function");
    });

    it("should call fetchUsers on initialization", () => {
      renderHook(() => useUsers());

      expect(mockIpcRenderer.invoke).toHaveBeenCalledWith("fetchUsers");
      expect(mockIpcRenderer.invoke).toHaveBeenCalledTimes(1);
    });

    it("should perform optimistic update when registerUser succeeds", async () => {
      const { result } = renderHook(() => useUsers());

      await act(async () => {
        await result.current.registerUser("Charlie");
      });

      expect(mockIpcRenderer.invoke).toHaveBeenCalledWith(
        "registerUser",
        "Charlie",
      );

      const updatedUsers = await result.current.usersPromise;
      expect(updatedUsers).toEqual([...mockUsers, mockNewUser]);
    });

    it("should set empty array Promise when deleteAllUsers succeeds", async () => {
      const { result } = renderHook(() => useUsers());

      await act(async () => {
        await result.current.deleteAllUsers();
      });

      expect(mockIpcRenderer.invoke).toHaveBeenCalledWith("deleteUsers");

      const users = await result.current.usersPromise;
      expect(users).toEqual([]);
    });

    it("should reject Promise when registerUser fails", async () => {
      const error = new Error("Registration failed");
      mockIpcRenderer.invoke.mockImplementation((channel: AllowedChannel) => {
        if (channel === "fetchUsers") {
          return Promise.resolve(mockUsers);
        }
        if (channel === "registerUser") {
          return Promise.reject(error);
        }
        return Promise.resolve();
      });

      const { result } = renderHook(() => useUsers());

      await expect(
        act(async () => {
          await result.current.registerUser("Charlie");
        }),
      ).rejects.toThrow("Registration failed");
    });

    it("should reject Promise when deleteAllUsers fails", async () => {
      const error = new Error("Delete failed");
      mockIpcRenderer.invoke.mockImplementation((channel: AllowedChannel) => {
        if (channel === "fetchUsers") {
          return Promise.resolve(mockUsers);
        }
        if (channel === "deleteUsers") {
          return Promise.reject(error);
        }
        return Promise.resolve();
      });

      const { result } = renderHook(() => useUsers());

      await expect(
        act(async () => {
          await result.current.deleteAllUsers();
        }),
      ).rejects.toThrow("Delete failed");
    });
  });
}
