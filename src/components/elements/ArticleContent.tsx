'use client'

import { useEffect, useRef } from 'react'
import { useAnalytics } from '@/components/Analytics'

interface ArticleContentProps {
  content: string
}

export function ArticleContent({ content }: ArticleContentProps) {
  const { trackEvent } = useAnalytics()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = contentRef.current
    if (!container) return

    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const link = target.closest('a')
      if (!link) return

      trackEvent('Article: Link Click', {
        href: link.href,
        text: link.textContent?.trim(),
      })
    }

    container.addEventListener('click', handleLinkClick)
    return () => {
      container.removeEventListener('click', handleLinkClick)
    }
  }, [trackEvent])

  return (
    <div
      ref={contentRef}
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
