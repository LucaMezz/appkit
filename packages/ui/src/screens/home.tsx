import { Link } from "react-router-dom";

import { Button } from "#shadcn/button";

export function HomeScreen(): React.JSX.Element {
  return (
    <>
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
    </>
  );
}
