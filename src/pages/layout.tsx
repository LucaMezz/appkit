import { Link, Outlet } from "react-router-dom";

export function Layout(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-4xl px-4">
      <header className="not-prose flex items-center gap-6 py-4">
        <Link to="/" className="text-lg font-semibold">
          Electron Boilerplate
        </Link>
        <nav>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <main className="prose prose-slate mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
