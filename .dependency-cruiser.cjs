/** @type {import("dependency-cruiser").IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      comment:
        "Circular dependencies make code harder to refactor and can cause runtime initialization bugs.",
      from: {},
      to: {
        circular: true,
      },
    },

    {
      name: "packages-must-not-import-apps",
      severity: "error",
      comment:
        "Shared packages must not depend on deployable apps. Move shared code into packages/* instead.",
      from: {
        path: "^packages/",
      },
      to: {
        path: "^apps/",
      },
    },

    {
      name: "api-must-not-import-web-or-desktop",
      severity: "error",
      comment: "The API app should not depend on web or desktop app code.",
      from: {
        path: "^apps/api/",
      },
      to: {
        path: "^(apps/web|apps/desktop)/",
      },
    },

    {
      name: "web-must-not-import-api-or-desktop",
      severity: "error",
      comment: "The web app should not depend on API or desktop app code.",
      from: {
        path: "^apps/web/",
      },
      to: {
        path: "^(apps/api|apps/desktop)/",
      },
    },

    {
      name: "desktop-must-not-import-api-or-web",
      severity: "error",
      comment: "The desktop app should not depend on API or web app code.",
      from: {
        path: "^apps/desktop/",
      },
      to: {
        path: "^(apps/api|apps/web)/",
      },
    },

    {
      name: "core-must-stay-independent",
      severity: "error",
      comment:
        "@appkit/core should stay framework-agnostic and must not depend on UI, API client, desktop, web, or API app code.",
      from: {
        path: "^packages/core/",
      },
      to: {
        path: "^(packages/ui|packages/api-client|apps/)",
      },
    },

    {
      name: "ui-must-not-import-apps",
      severity: "error",
      comment: "@appkit/ui should stay reusable and must not depend on deployable apps.",
      from: {
        path: "^packages/ui/",
      },
      to: {
        path: "^apps/",
      },
    },

    {
      name: "api-client-must-not-import-apps",
      severity: "error",
      comment: "@appkit/api-client should stay reusable and must not depend on apps.",
      from: {
        path: "^packages/api-client/",
      },
      to: {
        path: "^apps/",
      },
    },

    {
      name: "api-must-not-import-ui",
      severity: "error",
      comment: "The API app should not depend on React/UI code.",
      from: {
        path: "^apps/api/",
      },
      to: {
        path: "^packages/ui/",
      },
    },

    {
      name: "no-import-from-build-output",
      severity: "error",
      comment: "Source code should not import generated build output.",
      from: {
        path: "^(apps|packages)/",
      },
      to: {
        path: "/(dist|build|out|\\.next|\\.vite|coverage)/",
      },
    },

    {
      name: "no-test-imports-from-source",
      severity: "error",
      comment: "Production source files should not import test/spec files.",
      from: {
        path: "^(apps|packages)/",
        pathNot: "[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$",
      },
      to: {
        path: "[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$",
      },
    },
  ],

  options: {
    doNotFollow: {
      path: ["node_modules"],
    },

    exclude: {
      path: [
        "(^|/)node_modules/",
        "(^|/)dist/",
        "(^|/)build/",
        "(^|/)out/",
        "(^|/)\\.next/",
        "(^|/)\\.vite/",
        "(^|/)coverage/",
        "(^|/)\\.turbo/",
        "(^|/)\\.git/",
        "(^|/)\\.cache/",
        "(^|/)\\.output/",
      ],
    },

    combinedDependencies: true,

    detectProcessBuiltinModuleCalls: true,

    tsPreCompilationDeps: true,

    tsConfig: {
      fileName: "tsconfig.json",
    },

    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".mjs", ".cjs", ".d.ts"],
      mainFields: ["module", "main", "types", "typings"],
    },

    reporterOptions: {
      dot: {
        collapsePattern: "node_modules/(?:@[^/]+/[^/]+|[^/]+)",
      },

      archi: {
        collapsePattern: "^(?:apps|packages)/[^/]+|node_modules/(?:@[^/]+/[^/]+|[^/]+)",
      },

      text: {
        highlightFocused: true,
      },
    },
  },
};
