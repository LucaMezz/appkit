# ⚡ Modern Electron Boilerplate

> A production-ready Electron boilerplate with React, TypeScript, and modern tooling

Build cross-platform desktop applications with the power of web technologies. This boilerplate provides everything you need to get started quickly with a modern development experience.

## 🛠️ Tech Stack

| Category          | Technology                                                                       |
| ----------------- | -------------------------------------------------------------------------------- |
| **Framework**     | [Electron](https://electronjs.org/) v36                                          |
| **Frontend**      | [React](https://reactjs.org/) 19 + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool**    | [Vite](https://vitejs.dev/)                                                      |
| **Database**      | [SQLite](https://sqlite.org/) + [Drizzle ORM](https://orm.drizzle.team/)         |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)   |
| **Routing**       | [React Router](https://reactrouter.com/en/main)                                  |
| **Testing**       | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)  |

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
