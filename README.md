# 🚀 Amr Ahmed - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, featuring smooth animations, internationalization, and a beautiful user experience. This portfolio showcases my skills, projects, experience, and services as a Frontend Developer.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🌍 **Internationalization (i18n)** - Full support for English and Arabic with RTL layout
- 🎨 **Dark/Light Theme** - Seamless theme switching with persistent preferences
- 🎭 **Smooth Animations** - Beautiful page transitions and micro-interactions powered by Framer Motion
- 🖱️ **Custom Cursor** - Interactive animated cursor for enhanced user experience
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **Performance Optimized** - Built with Next.js Turbopack for lightning-fast development
- 🔍 **SEO Friendly** - Optimized metadata and semantic HTML
- 🎯 **Section Navigation** - Smooth scrolling navigation with active section highlighting
- 💼 **Project Showcase** - Filterable project gallery with live demos and source code links
- 📄 **Resume Download** - Easy access to downloadable resume

## 🛠️ Tech Stack

### Core Technologies
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework

### Key Libraries & Tools
- **[next-intl](https://next-intl-docs.vercel.app/)** - Internationalization for Next.js
- **[Motion (Framer Motion)](https://www.framer.com/motion/)** - Animation library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Iconify](https://iconify.design/)** - Icon framework

## 📁 Project Structure

```
src/
├── app/
│   └── [locale]/          # Internationalized routes
│       ├── layout.tsx     # Root layout with providers
│       └── page.tsx       # Main page component
├── components/
│   ├── animations/        # Animation configurations
│   ├── layout/           # Layout components (Sidebar, Providers)
│   ├── sections/         # Page sections (Hero, Skills, Projects, etc.)
│   ├── shared/           # Reusable components
│   └── ui/               # UI components (Button, Card, Sheet)
├── contexts/             # React contexts (Theme)
├── data/                 # Static data (projects, skills, experience)
├── i18n/                 # Internationalization configuration
├── lib/                  # Utility functions
├── messages/             # Translation files (en.json, ar.json)
└── types/                # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🌐 Internationalization

The portfolio supports multiple languages:
- **English** (`/en`) - Default locale
- **Arabic** (`/ar`) - With RTL layout support

Language files are located in `src/messages/` directory. To add a new language:
1. Create a new JSON file in `src/messages/`
2. Add the locale to `src/i18n/routing.ts`
3. Update translations accordingly

## 🎨 Customization

### Updating Content

- **Personal Information**: Edit `src/data/site.ts`
- **Projects**: Modify `src/data/projects.ts`
- **Skills**: Update `src/data/skills.ts`
- **Experience**: Edit `src/data/experience.ts`
- **Services**: Update `src/data/services.ts`

### Styling

The project uses Tailwind CSS v4. Customize colors, fonts, and other design tokens in `src/app/globals.css` or through Tailwind configuration.

### Theme

Theme customization is handled through the `ThemeContext` in `src/contexts/ThemeContext.tsx`. Modify theme colors and preferences there.

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔗 Links

- **Live Demo**: [Your Portfolio URL]
- **Resume**: Available for download in the sidebar

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Amr Ahmed**
- Frontend Developer specializing in React, Next.js, and modern web technologies
- Passionate about creating beautiful, performant, and accessible web experiences

---

⭐ If you find this portfolio inspiring, feel free to star the repository!
