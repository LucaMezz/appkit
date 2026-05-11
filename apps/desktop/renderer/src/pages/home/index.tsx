import { HomeScreen } from "@appkit/ui";

import { DesktopLink } from "#renderer/src/components/link";

export function Home(): React.JSX.Element {
  return <HomeScreen Link={DesktopLink} />;
}
