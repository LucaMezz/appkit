import {
  Suspense,
  useActionState,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";
import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { getErrorMessage } from "@/utils/get-error-message";
import { useUsers } from "./use-users";
import { UserList } from "./user-list";

interface RegisterUserState {
  error: string | null;
  success: boolean;
}

interface DeleteAllUsersState {
  error: string | null;
  success: boolean;
}

export function Home(): React.JSX.Element {
  const { usersPromise, registerUser, deleteUsers } = useUsers();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const handleRegisterUser = useCallback(
    async (
      _: RegisterUserState,
      formData: FormData,
    ): Promise<RegisterUserState> => {
      try {
        const name = formData.get("name");

        if (typeof name !== "string") {
          return { error: "Name is not a string", success: false };
        }

        if (name.trim() === "") {
          return { error: null, success: false };
        }

        await registerUser(name);
        return { error: null, success: true };
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        return { error: errorMessage, success: false };
      }
    },
    [registerUser],
  );

  const [registerState, registerAction, isRegisterPending] = useActionState(
    handleRegisterUser,
    { error: null, success: false },
  );

  const handleDeleteAllUsers = useCallback(
    async (_: DeleteAllUsersState): Promise<DeleteAllUsersState> => {
      try {
        const users = await usersPromise;
        const allUserIds = users.map((user) => user.id);
        await deleteUsers(allUserIds);
        return { error: null, success: true };
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        return { error: errorMessage, success: false };
      }
    },
    [usersPromise, deleteUsers],
  );

  const [deleteState, deleteAction, isDeletePending] = useActionState(
    handleDeleteAllUsers,
    { error: null, success: false },
  );

  useEffect(function focusOnMount() {
    nameInputRef.current?.focus();
  }, []);

  useEffect(
    function restoreFocusAfterSuccess() {
      if (!isRegisterPending && nameInputRef.current) {
        nameInputRef.current.focus();
      }
    },
    [isRegisterPending],
  );

  const isPending = isRegisterPending || isDeletePending;

  return (
    <>
      <h1>Home</h1>
      <p>Welcome to the Electron Boilerplate app!</p>
      <section>
        <h2>New User</h2>
        <form action={registerAction} className="space-y-2">
          <Input
            name="name"
            type="text"
            id={inputId}
            disabled={isPending}
            ref={nameInputRef}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isRegisterPending ? "Adding..." : "Submit"}
            </Button>
          </div>
        </form>

        {registerState.error && (
          <p className="text-red-500">{registerState.error}</p>
        )}
      </section>

      <section>
        <h2>Users</h2>
        <form action={deleteAction} className="flex justify-end">
          <Button type="submit" disabled={isPending} variant="destructive">
            {isDeletePending ? "Deleting..." : "Delete all users"}
          </Button>
        </form>

        {deleteState.error && (
          <p className="text-red-500">{deleteState.error}</p>
        )}

        <Suspense fallback={<p>Loading users...</p>}>
          <UserList usersPromise={usersPromise} />
        </Suspense>
      </section>
    </>
  );
}
