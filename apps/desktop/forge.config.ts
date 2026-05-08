import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { VitePlugin } from "@electron-forge/plugin-vite";
import type { ForgeConfig } from "@electron-forge/shared-types";
import { FuseV1Options, FuseVersion } from "@electron/fuses";

const appName = "appkit-desktop";
const productName = "AppKit";

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,

    // Important:
    // Keep this unscoped. Squirrel can break when it tries to use
    // the package name "@appkit/desktop" in generated .nuspec paths.
    name: appName,
    executableName: appName,

    appBundleId: "com.appkit.desktop",
    appCategoryType: "public.app-category.developer-tools",

    // extraResource: ["drizzle"],
  },

  rebuildConfig: {},

  makers: [
    new MakerSquirrel({
      name: appName,
      title: productName,
      authors: "Luca Mezzavilla",
      setupExe: `${productName}Setup.exe`,
      noMsi: true,
    }),

    new MakerZIP({}, ["darwin"]),

    new MakerRpm({
      options: {
        name: appName,
        productName,
      },
    }),

    new MakerDeb({
      options: {
        name: appName,
        productName,
      },
    }),
  ],

  plugins: [
    new VitePlugin({
      build: [
        {
          entry: "main/index.ts",
          config: "vite.main.config.ts",
          target: "main",
        },
        {
          entry: "preload/index.ts",
          config: "vite.preload.config.ts",
          target: "preload",
        },
      ],
      renderer: [
        {
          name: "main_window",
          config: "vite.renderer.config.ts",
        },
      ],
    }),

    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },

    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

// oxlint-disable-next-line import/no-default-export
export default config;
