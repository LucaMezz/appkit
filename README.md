# ⚡ Modern Electron Boilerplate

Electron boilerplate with React, TypeScript, and modern tooling

## 🛠️ Tech Stack

| Category         | Technology                                                                       |
| ---------------- | -------------------------------------------------------------------------------- |
| **Framework**    | [Electron](https://electronjs.org/) v38                                          |
| **Frontend**     | [React](https://reactjs.org/) 19 + [TypeScript](https://www.typescriptlang.org/) |
| **Toolchain**    | [Electron Forge](https://www.electronforge.io/) + [Vite](https://vitejs.dev/)    |
| **Database**     | [SQLite](https://sqlite.org/) + [Drizzle ORM](https://orm.drizzle.team/)         |
| **Styling**      | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)   |
| **Routing**      | [React Router](https://reactrouter.com/en/main)                                  |
| **Testing**      | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)  |
| **Code Quality** | [Biome](https://biomejs.dev/) + [Prettier](https://prettier.io/)                 |

## 🚀 Quick Start

### Prerequisites

- Node.js 22.12.0 or higher

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/kimizuy/electron-boilerplate
   cd electron-boilerplate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

The app will open automatically with hot reload enabled!

## 📦 Building & Distribution

### Development Build

```bash
npm run package
```

### Production Distributables

```bash
npm run make
```

This creates platform-specific installers in the `out/` directory.

## ⚠️ Important Notes

- **Electron & SQLite Compatibility**: When upgrading Electron or better-sqlite3, ensure version compatibility. Check [better-sqlite3 releases](https://github.com/WiseLibs/better-sqlite3/releases) for supported Electron versions.

## 📄 License

This project is based on the [Electron Forge Vite + TypeScript template](https://www.electronforge.io/templates/vite-+-typescript).

---

**Happy coding!** 🎉
