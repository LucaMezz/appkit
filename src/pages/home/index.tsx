import {
  Suspense,
  useActionState,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";
import { Link } from "react-router-dom";
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
  const { usersPromise, registerUser, deleteAllUsers } = useUsers();
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
        await deleteAllUsers();
        return { error: null, success: true };
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        return { error: errorMessage, success: false };
      }
    },
    [deleteAllUsers],
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
    <div>
      <header>
        <img alt="logo" src="vite.svg" />
        <h1>Hello, world!</h1>
        <nav>
          <Link to="/about">Go to about page</Link>
        </nav>
      </header>

      <main>
        <section>
          <form action={registerAction}>
            <label htmlFor={inputId}>Name:</label>
            <Input
              name="name"
              type="text"
              id={inputId}
              disabled={isPending}
              ref={nameInputRef}
            />
            <Button type="submit" disabled={isPending}>
              {isRegisterPending ? "Adding..." : "Submit"}
            </Button>
          </form>

          {registerState.error && (
            <p className="text-red-500">{registerState.error}</p>
          )}
        </section>

        <section>
          <form action={deleteAction}>
            <Button type="submit" disabled={isPending}>
              {isDeletePending ? "Deleting..." : "Delete all users"}
            </Button>
          </form>

          {deleteState.error && (
            <p className="text-red-500">{deleteState.error}</p>
          )}
        </section>

        <section>
          <Suspense fallback={<p>Loading users...</p>}>
            <UserList usersPromise={usersPromise} />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
