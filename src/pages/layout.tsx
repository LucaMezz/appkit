import { Outlet } from "react-router-dom";

export function Layout(): React.JSX.Element {
  return (
    <div className="mx-auto px-4">
      <main className="w-full h-full max-w-none">
        <Outlet />
      </main>
    </div>
  );
}
