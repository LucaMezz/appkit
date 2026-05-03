import { MdInbox } from "react-icons/md";

import { Button } from "./shadcn-ui/button";

export function Inbox(): React.JSX.Element {
  return (
    <Button variant="ghost" size="sm" className="w-7 h-6" style={{ WebkitAppRegion: "no-drag" }}>
      <MdInbox />
    </Button>
  );
}
