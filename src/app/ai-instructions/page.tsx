import { getPostBySlug } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { ArticleDetailPage } from '@/components/pages/ArticleDetailPage'

export default async function AIInstructionsPage() {
  try {
    const post = await getPostBySlug('my-github-copilot-instructions')
    
    if (!post) {
      notFound()
    }

    return (
      <ArticleDetailPage 
        post={post}
      />
    )
  } catch {
    notFound()
  }
}
