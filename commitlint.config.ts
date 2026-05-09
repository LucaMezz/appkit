// oxlint-disable-next-line import/no-default-export
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      ["api", "api-client", "core", "cli", "desktop", "web", "ui", "deps", "ci", "config", "repo"],
    ],
  },
};
