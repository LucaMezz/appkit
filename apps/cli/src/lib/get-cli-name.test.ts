import { describe, expect, it } from "vitest";

import { getCliName } from "#lib/get-cli-name";

describe("getCliName", () => {
  it("returns the CLI name", () => {
    expect(getCliName()).toBe("appkit");
  });
});
