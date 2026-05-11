import { Button } from "#shadcn/button";
import type { Link } from "#types/link";

interface HomeScreenProps {
  Link: Link;
}

export function HomeScreen({ Link }: HomeScreenProps): React.JSX.Element {
  return (
    <>
      <h1>Home</h1>
      <p>Welcome to the Electron Boilerplate app!</p>
      <section>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/sign-up">Sign Up</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
