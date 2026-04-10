# GitHub Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a React blog website project with the following characteristics:

## Project Structure
- Built with Vite, React 19, and TypeScript
- Uses TanStack Router for routing
- Styled with Tailwind CSS v4
- Blog content stored as Markdown files in `content/`

## Key Features
- Blog post listing on the home page
- Individual article detail pages
- Markdown content parsing and rendering
- Responsive design with modern UI
- SEO-friendly structure

## Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Implement proper SEO meta tags
- Ensure responsive design
- Use TanStack Router conventions
- Keep components clean and reusable

## Documentation Guidelines
- Create project documentation in the `docs/` folder only.
- Use kebab-case filenames (example: `deployment-checklist.md`).
- Keep docs short and practical. Prefer quick guides and checklists over long summaries.

## Git Guidelines
- Always commit and push changes to the `main` branch.
- After every `git push`, check the CI pipeline status using `gh run list --limit 1` and `gh run view <run_id>`.
- Wait for the pipeline to finish. If it fails, diagnose and fix the issue in the same session before moving on.
- Never leave the session with a broken pipeline.
