# IconHub

> Customize & export icons in seconds. Browse thousands of Lucide icons, customize every detail, and export to your project.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## ✨ Features

- 🎨 **1800+ Icons** - Comprehensive Lucide icon collection
- 🎯 **Real-time Customization** - Colors, size, stroke width, gradients
- 📦 **Multiple Formats** - Export as SVG, PNG, or copy to clipboard
- 🔍 **Smart Search** - Fast fuzzy search with Fuse.js
- 🌓 **Dark Mode** - Beautiful theme support
- 📱 **Responsive** - Works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone repository
git clone https://github.com/Atul250603/iconhub.git
cd iconhub

# Install dependencies
pnpm install

# Generate icon index
pnpm generate-overall-index

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm generate-registry` | Generate registry index for an icon library |
| `pnpm generate-overall-index` | Generate overall icon index from all registries |

### Icon Index Generation

**Icon Registry** (`generate-registry`):
- Creates a `registry.json` file for each icon library folder
- Scans SVG files in a library directory (e.g., `public/lucide/`)
- Generates a registry with icon names, paths, and source information
- Run this when adding a new icon library or updating icons in a library

**Overall Icon Index** (`generate-overall-index`):
- Merges all `registry.json` files from all icon libraries
- Creates a single `icons-index.json` file used by the application
- Must be run after generating or updating registries
- This is the main index file that powers the icon browsing and search

**Workflow**: When adding new icons or libraries:
1. Run `pnpm generate-registry` for each library you've updated
2. Run `pnpm generate-overall-index` to merge all registries

## 🛠️ Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn** - Accessible components
- **Motion** - Animations
- **Lucide Icons** - Icon library

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables (optional):
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # For analytics
   NEXT_PUBLIC_SITE_URL=https://your-domain.com  # For SEO
   ```
4. Deploy automatically

The app can also be deployed on Netlify, Railway, or any platform supporting Next.js.

## 📊 Analytics (Optional)

For production tracking, add Google Analytics 4:

1. Create GA4 property at [analytics.google.com](https://analytics.google.com/)
2. Get Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to environment variables in your hosting platform
4. Analytics will automatically track:
   - Icon views
   - Exports (format preferences)
   - Customization actions

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Lucide](https://lucide.dev/) for the icon collection
- [Shadcn](https://ui.shadcn.com/) for components
- [Next.js](https://nextjs.org/) team

---

Created by [Atul Goyal](https://x.com/AtulGoyal383989)
