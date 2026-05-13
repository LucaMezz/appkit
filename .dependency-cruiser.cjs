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
      name: "api-must-not-import-other-apps",
      severity: "error",
      comment: "The API app should not depend on web, desktop, or CLI app code.",
      from: {
        path: "^apps/api/",
      },
      to: {
        path: "^(apps/web|apps/desktop|apps/cli)/",
      },
    },

    {
      name: "web-must-not-import-other-apps",
      severity: "error",
      comment: "The web app should not depend on API, desktop, or CLI app code.",
      from: {
        path: "^apps/web/",
      },
      to: {
        path: "^(apps/api|apps/desktop|apps/cli)/",
      },
    },

    {
      name: "desktop-must-not-import-other-apps",
      severity: "error",
      comment: "The desktop app should not depend on API, web, or CLI app code.",
      from: {
        path: "^apps/desktop/",
      },
      to: {
        path: "^(apps/api|apps/web|apps/cli)/",
      },
    },

    {
      name: "cli-must-not-import-other-apps",
      severity: "error",
      comment:
        "The CLI app should communicate through shared packages and APIs, not import other app implementations.",
      from: {
        path: "^apps/cli/",
      },
      to: {
        path: "^(apps/api|apps/web|apps/desktop)/",
      },
    },

    {
      name: "core-must-stay-independent",
      severity: "error",
      comment:
        "@appkit/core should stay framework-agnostic and must not depend on UI, frontend, API client, or app code.",
      from: {
        path: "^packages/core/",
      },
      to: {
        path: "^(packages/ui|packages/frontend|packages/api-client|apps)/",
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
      name: "api-client-must-not-import-ui-or-frontend",
      severity: "error",
      comment:
        "@appkit/api-client should stay transport-focused and must not depend on React UI or frontend application code.",
      from: {
        path: "^packages/api-client/",
      },
      to: {
        path: "^(packages/ui|packages/frontend)/",
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
      name: "ui-must-not-import-frontend",
      severity: "error",
      comment:
        "@appkit/ui is the reusable design-system layer and must not depend on @appkit/frontend.",
      from: {
        path: "^packages/ui/",
      },
      to: {
        path: "^packages/frontend/",
      },
    },

    {
      name: "ui-must-not-import-api-client",
      severity: "error",
      comment:
        "@appkit/ui must stay presentational and must not call API client functions directly. Put API-backed flows in @appkit/frontend.",
      from: {
        path: "^packages/ui/",
      },
      to: {
        path: "^packages/api-client/",
      },
    },

    {
      name: "ui-must-not-import-core",
      severity: "error",
      comment:
        "@appkit/ui should avoid app/domain coupling. Put schema-aware or domain-aware logic in @appkit/frontend or @appkit/core consumers.",
      from: {
        path: "^packages/ui/",
      },
      to: {
        path: "^packages/core/",
      },
    },

    {
      name: "ui-must-not-import-react-router",
      severity: "error",
      comment:
        "@appkit/ui should not own routing. Route-aware components and navigation flows belong in @appkit/frontend.",
      from: {
        path: "^packages/ui/",
      },
      to: {
        dependencyTypes: ["npm"],
        path: "^react-router-dom$",
      },
    },

    {
      name: "frontend-must-not-import-apps",
      severity: "error",
      comment:
        "@appkit/frontend should be shared across web and desktop and must not depend on app-specific implementation code.",
      from: {
        path: "^packages/frontend/",
      },
      to: {
        path: "^apps/",
      },
    },

    {
      name: "frontend-must-not-import-desktop-specific-code",
      severity: "error",
      comment:
        "@appkit/frontend must stay platform-neutral. Electron title bars, window controls, preload APIs, and desktopApi usage belong in apps/desktop.",
      from: {
        path: "^packages/frontend/",
      },
      to: {
        path: "^apps/desktop/",
      },
    },

    {
      name: "frontend-must-not-import-web-specific-code",
      severity: "error",
      comment:
        "@appkit/frontend must stay platform-neutral. Browser-host-specific code belongs in apps/web.",
      from: {
        path: "^packages/frontend/",
      },
      to: {
        path: "^apps/web/",
      },
    },

    {
      name: "api-must-not-import-ui-or-frontend",
      severity: "error",
      comment: "The API app should not depend on React, UI, or frontend application code.",
      from: {
        path: "^apps/api/",
      },
      to: {
        path: "^(packages/ui|packages/frontend)/",
      },
    },

    {
      name: "cli-must-not-import-ui-or-frontend",
      severity: "error",
      comment:
        "The CLI app should stay terminal-focused and must not depend on React UI or shared frontend route/page code.",
      from: {
        path: "^apps/cli/",
      },
      to: {
        path: "^(packages/ui|packages/frontend)/",
      },
    },

    {
      name: "web-must-not-import-ui-pages-directly",
      severity: "error",
      comment:
        "The web app should consume shared pages/routes from @appkit/frontend, not page-level code from @appkit/ui.",
      from: {
        path: "^apps/web/",
      },
      to: {
        path: "^packages/ui/src/(pages|screens|routes)/",
      },
    },

    {
      name: "desktop-must-not-import-ui-pages-directly",
      severity: "error",
      comment:
        "The desktop app should consume shared pages/routes from @appkit/frontend, not page-level code from @appkit/ui.",
      from: {
        path: "^apps/desktop/",
      },
      to: {
        path: "^packages/ui/src/(pages|screens|routes)/",
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
