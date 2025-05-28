# Tech Blog

A modern blog website built with Next.js 15, TypeScript, and Tailwind CSS. Features a clean, responsive design with markdown-based content management.

## Features

- 📝 **Markdown Content** - Blog posts written in Markdown with frontmatter metadata
- 🎨 **Modern Design** - Clean, responsive UI built with Tailwind CSS
- ⚡ **Fast Performance** - Static site generation with Next.js App Router
- 🔍 **SEO Optimized** - Proper meta tags and Open Graph support
- 📱 **Mobile Friendly** - Responsive design that works on all devices
- 🏷️ **Tag System** - Categorize posts with tags
- 📅 **Date Formatting** - Human-readable date display

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown with gray-matter
- **Date Handling**: date-fns

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── blog/[slug]/     # Dynamic blog post pages
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   └── BlogCard.tsx     # Blog post card component
│   └── lib/
│       ├── blog.ts          # Blog content utilities
│       └── utils.ts         # Utility functions
├── content/                 # Markdown blog posts
├── public/                  # Static assets
└── .github/
    └── copilot-instructions.md
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and visit [http://localhost:3000](http://localhost:3000)

## Adding New Blog Posts

1. Create a new `.md` file in the `content/` directory
2. Add frontmatter with the following structure:

```markdown
---
title: "Your Post Title"
date: "YYYY-MM-DD"
excerpt: "A brief description of your post"
image: "https://example.com/image.jpg"
author: "Author Name"
tags: ["tag1", "tag2"]
---

# Your Post Title

Your markdown content goes here...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This project is ready to deploy on platforms like:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

## Customization

### Styling
- Modify Tailwind classes in components
- Update `tailwind.config.ts` for custom theme
- Edit `src/app/globals.css` for global styles

### Content
- Add new markdown files to `content/`
- Modify blog data structure in `src/lib/blog.ts`
- Update metadata in `src/app/layout.tsx`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and TypeScript
