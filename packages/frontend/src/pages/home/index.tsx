import { Button } from "@appkit/ui";
import { Link } from "react-router-dom";

export function Home(): React.JSX.Element {
  return (
    <div className="space-y-4 p-4">
      <h1>Home</h1>
      <p>Welcome to the Electron Boilerplate app!</p>
      <section>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/sign-up">Sign Up</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
