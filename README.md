# FINIX - Financial Dashboard Application

FINIX is a modern, feature-rich financial dashboard application built with Next.js 16, React 19, and TypeScript. It provides comprehensive financial management capabilities including expense tracking, wallet management, travel budgeting, fair share calculations, and AI-powered smart suggestions.

## 🚀 Features

- **Smart Analytics**: Real-time insights into your spending patterns with AI-powered recommendations
- **Expense Tracking**: Comprehensive expense management and categorization
- **Wallet Management**: Multi-wallet support with balance tracking
- **FairShare**: Split expenses with friends and track shared costs
- **Travel Budgeting**: Plan and track travel expenses
- **Smart Suggestions**: AI-powered recommendations to optimize your finances
- **Dark Mode**: Beautiful dark and light themes with smooth transitions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **Package Manager**: pnpm

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 18.17 or higher (LTS recommended)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
- **pnpm**: Package manager (recommended, or use npm/yarn)
  - Install pnpm: `npm install -g pnpm`
  - Verify installation: `pnpm --version`
- **Git**: Version control system
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

## 🏃 Running Locally

Follow these steps to set up and run the project on your local machine:

> **Note**: Most commands work cross-platform (pnpm, npm, git, etc.). File operations like copying files differ between Windows PowerShell and macOS/Linux bash/terminal, so platform-specific instructions are provided where needed.

### 🚀 Quick Start (Bash/Terminal)

If you're using **bash** (macOS, Linux, WSL, or Git Bash on Windows):

```bash
# 1. Clone the repository (if needed)
git clone <your-repository-url>
cd finix2

# 2. Install dependencies
pnpm install

# 3. Copy environment file (optional)
cp .env.example .env.local

# 4. Start the development server
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Step 1: Clone the Repository

```bash
# If you haven't already cloned the repository
git clone <your-repository-url>
cd finix2
```

> **Note**: `git` and `cd` commands work the same on Windows, macOS, and Linux.

### Step 2: Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# OR using npm
npm install

# OR using yarn
yarn install
```

> **Note**: Package manager commands (pnpm, npm, yarn) work identically on all platforms.

> **Note**: This project uses `pnpm` as the package manager. If you encounter issues, ensure you're using the correct package manager. The lock file (`pnpm-lock.yaml`) indicates pnpm was used.

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory (if needed):

**Windows (PowerShell):**
```powershell
# Copy the example file (if it exists)
Copy-Item .env.example .env.local

# Or create a new .env.local file
New-Item .env.local -ItemType File
```

**macOS/Linux (Bash/Terminal):**
```bash
# Copy the example file (if it exists)
cp .env.example .env.local

# Or create a new .env.local file
touch .env.local
```

Currently, the application doesn't require specific environment variables to run locally. However, if you need to configure:
- API endpoints
- Analytics keys
- Other external services

Add them to your `.env.local` file.

### Step 4: Run the Development Server

```bash
# Using pnpm
pnpm dev

# OR using npm
npm run dev

# OR using yarn
yarn dev
```

The application will start on [http://localhost:3000](http://localhost:3000).

Open your browser and navigate to the URL above. You should see the FINIX landing page.

### Step 5: Build for Production (Optional)

To create a production build:

```bash
# Using pnpm
pnpm build

# OR using npm
npm run build

# OR using yarn
yarn build
```

To start the production server:

```bash
# Using pnpm
pnpm start

# OR using npm
npm start

# OR using yarn
yarn start
```

## 📁 Project Structure

```
finix2/
├── app/                      # Next.js App Router pages
│   ├── dashboard/           # Dashboard pages
│   │   ├── expenses/        # Expenses page
│   │   ├── fairshare/       # FairShare page
│   │   ├── travel/          # Travel page
│   │   ├── wallet/          # Wallet page
│   │   ├── suggestions/     # Smart Suggestions page
│   │   └── page.tsx         # Dashboard overview
│   ├── landing/             # Landing page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Root page (redirects)
│   └── globals.css          # Global styles with Tailwind
├── components/              # React components
│   ├── main-content.tsx     # Main dashboard content
│   ├── right-sidebar.tsx   # Right sidebar component
│   ├── sidebar.tsx          # Navigation sidebar
│   ├── smart-suggestions.tsx
│   ├── theme-provider.tsx   # Theme context provider
│   └── transaction-table.tsx
├── lib/                     # Utility functions
│   ├── financial-data.ts   # Financial data utilities
│   └── utils.ts            # General utilities
├── public/                  # Static assets
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   └── ...
├── styles/                  # Additional styles (if any)
├── components.json          # shadcn/ui configuration
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies and scripts
├── postcss.config.mjs       # PostCSS configuration
├── pnpm-lock.yaml           # pnpm lock file
└── tsconfig.json            # TypeScript configuration
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start the development server on port 3000 |
| `pnpm build` | Create an optimized production build |
| `pnpm start` | Start the production server (requires build first) |
| `pnpm lint` | Run ESLint to check code quality |

## 🎨 Styling and Theming

This project uses Tailwind CSS 4 with a custom theme configured for FINIX. The theme supports:
- Light and dark modes
- Custom color palette optimized for financial data visualization
- Smooth transitions and animations

The theme configuration is located in `app/globals.css`.

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is already in use:

**Windows (PowerShell):**
```powershell
# Find and kill the process using port 3000
netstat -ano | findstr :3000
# Note the PID from the output, then:
taskkill /PID <PID> /F

# Or use a different port
pnpm dev -- -p 3001
```

**macOS/Linux:**
```bash
# Find and kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
pnpm dev -- -p 3001
```

### Dependency Installation Issues

**Windows (PowerShell):**
```powershell
# Clear cache and reinstall
Remove-Item -Recurse -Force node_modules, pnpm-lock.yaml
pnpm install

# Or with npm
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

**macOS/Linux:**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Or with npm
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

The project is configured to ignore TypeScript build errors in `next.config.mjs`. If you encounter TypeScript issues:

1. Ensure all dependencies are installed
2. Restart your TypeScript server (VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")
3. Check that your Node.js version is compatible

### Module Not Found Errors

**Windows (PowerShell):**
```powershell
# Clear Next.js cache
Remove-Item -Recurse -Force .next
pnpm dev
```

**macOS/Linux:**
```bash
# Clear Next.js cache
rm -rf .next
pnpm dev
```

## 📦 Dependencies

### Core Dependencies
- **next**: 16.0.0 - React framework
- **react**: 19.2.0 - UI library
- **react-dom**: 19.2.0 - React DOM bindings
- **typescript**: ^5 - TypeScript compiler

### UI & Styling
- **tailwindcss**: ^4.1.9 - Utility-first CSS framework
- **@radix-ui/react-*** - Accessible UI primitives
- **lucide-react**: ^0.454.0 - Icon library
- **recharts**: latest - Chart library

### Forms & Validation
- **react-hook-form**: ^7.60.0 - Form state management
- **zod**: 3.25.76 - Schema validation
- **@hookform/resolvers**: ^3.10.0 - Form resolvers

### Utilities
- **clsx**: ^2.1.1 - Conditional className utility
- **tailwind-merge**: ^2.5.5 - Merge Tailwind classes
- **date-fns**: 4.1.0 - Date manipulation
- **next-themes**: latest - Theme management

## 🤝 Contributing

This project was created with [v0.app](https://v0.app). If you want to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📞 Support

For issues or questions:
- Check the troubleshooting section above
- Review the Next.js and React documentation
- Ensure all prerequisites are correctly installed

---

**Built with ❤️ using Next.js, React, and TypeScript**
