/**
 * Prerender script for static site generation.
 *
 * After `vite build`, this script copies dist/index.html to every blog-post
 * path so that GitHub Pages (or any static host) can serve each article at its
 * canonical URL without relying on a client-side redirect from 404.html.
 *
 * Generated structure:
 *   dist/blog/<slug>/index.html   (EN posts)
 *   dist/es/index.html            (ES home)
 *   dist/es/blog/<slug>/index.html (ES posts)
 */

import { readdir, readFile, mkdir, copyFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

const contentDir = './content'
const distDir = './dist'
const indexHtml = join(distDir, 'index.html')

function normalizeDate(rawDate) {
  if (!rawDate) return new Date().toISOString().split('T')[0]
  if (rawDate instanceof Date) return rawDate.toISOString().split('T')[0]
  return String(rawDate)
}

async function generatePages() {
  const files = await readdir(contentDir)
  const now = new Date()
  now.setHours(0, 0, 0, 0)

  // ── English posts ──────────────────────────────────────────────────────────
  const enFiles = files.filter((f) => f.endsWith('.en.md'))
  for (const file of enFiles) {
    const slug = file.replace('.en.md', '')
    const raw = await readFile(join(contentDir, file), 'utf-8')
    const { data } = matter(raw)
    const date = normalizeDate(data.date)

    if (new Date(date) > now) {
      console.log(`Skipping future post: /blog/${slug}`)
      continue
    }

    const dir = join(distDir, 'blog', slug)
    await mkdir(dir, { recursive: true })
    await copyFile(indexHtml, join(dir, 'index.html'))
    console.log(`Generated /blog/${slug}/index.html`)
  }

  // ── Spanish home ───────────────────────────────────────────────────────────
  await mkdir(join(distDir, 'es'), { recursive: true })
  await copyFile(indexHtml, join(distDir, 'es', 'index.html'))
  console.log('Generated /es/index.html')

  // ── Spanish posts ──────────────────────────────────────────────────────────
  const esFiles = files.filter((f) => f.endsWith('.es.md'))
  for (const file of esFiles) {
    const slug = file.replace('.es.md', '')
    const raw = await readFile(join(contentDir, file), 'utf-8')
    const { data } = matter(raw)
    const date = normalizeDate(data.date)

    if (new Date(date) > now) {
      console.log(`Skipping future post: /es/blog/${slug}`)
      continue
    }

    const dir = join(distDir, 'es', 'blog', slug)
    await mkdir(dir, { recursive: true })
    await copyFile(indexHtml, join(dir, 'index.html'))
    console.log(`Generated /es/blog/${slug}/index.html`)
  }

  console.log('\nPrerender complete!')
}

generatePages().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
