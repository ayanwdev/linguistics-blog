# AGENTS.md - Workspace Map & Guidelines

Welcome to the **Linguistics Blog** workspace. This file serves as the single source of truth for the project structure, active technologies, and codebase conventions.

---

## 📋 Project Overview

A Next.js blogging application dedicated to linguistics topics, utilizing Appwrite for backend services and authentication.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16.x (App Router, Turbopack)
- **Runtime & UI:** React 19.x
- **Backend:** Appwrite (Database, Users, Avatars)
- **Styling:** Tailwind CSS v4.x (using `@tailwindcss/postcss`)
- **Theme Support:** Next Themes (dark/light modes)
- **UI Components:** Shadcn UI (Radix UI primitives, Lucide Icons)
- **Analytics:** Vercel Analytics & Speed Insights
- **Package Manager:** Yarn (v4/modern berry configuration)

---

## 📂 Directory Structure

```
linguistics-blog/
├── .agents/                 # Agent configuration
│   └── mcp_config.json      # Workspace MCP servers configuration
├── app/                     # Next.js App Router root
│   ├── auth/                # Sign In & Sign Up pages
│   ├── profile/             # User Profile dashboard page
│   ├── layout.tsx           # Root HTML layout and global styles configuration
│   ├── page.tsx             # Main dashboard page
│   └── globals.css          # Tailwind CSS global styles
├── components/              # Reusable UI React components
│   ├── auth/                # Authentication forms (sign-in, sign-up)
│   ├── nav/                 # Navigation bar and drawer components
│   ├── ui/                  # Shared base elements (button, input, avatar, etc.)
│   ├── theme-provider.tsx   # Light/dark mode provider
│   └── theme-toggler.tsx    # Button to toggle themes
├── hooks/                   # Custom application hooks
│   ├── use-auth.ts          # Authentication status and utilities
│   ├── use-current-user.ts  # Current logged-in user profile resolver
│   └── use-mobile.ts        # Screen width state resolver
├── lib/                     # Libraries & utility helpers
│   ├── appwrite.ts          # Safe Appwrite client initializers (request isolated)
│   ├── auth.ts              # Authentication helpers
│   └── utils.ts             # CN classes merge tool
├── declarations.d.ts        # Global TS type assertions (includes CSS declarations)
├── package.json             # NPM package definitions & dev tasks
└── tsconfig.json            # TypeScript configuration
```

---

## 🔒 Crucial Conventions & Rules

### 1. Appwrite Client Isolation (SSR Safety)

- **Rule:** Never reuse a global Appwrite `Client` instance across multiple requests. Doing so leaks user sessions.
- **Implementation:** Always initialize a new `Client` instance per server-side request (using functions inside [lib/appwrite.ts](file:///home/ayanw/Work/Web/linguistics-blog/lib/appwrite.ts)).
- **Types:** Never cast Appwrite proxies to `any`. Use key assertions (`as keyof Account`) and ensure that retrieved methods are bound (`value.bind(instance)`).

### 2. Styling (Tailwind CSS v4)

- **Rule:** Do not write inline custom styles or ad-hoc helper utilities. Use predefined tailwind configuration styles.
- **CSS Import:** The root stylesheet is `app/globals.css`. Ensure `declarations.d.ts` remains present so that `import "./globals.css"` compiles under TypeScript `moduleResolution: "bundler"`.

### 3. Scripts

- **Development:** `yarn dev`
- **Build Production:** `yarn build`
- **Linting & Check:** `yarn lint` (runs `tsc --noemit`, formats code, and runs ESLint).
