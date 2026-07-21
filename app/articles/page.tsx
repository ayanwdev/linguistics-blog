import Image from "next/image"
import Link from "next/link"
import { getFileViewUrl, getPosts } from "@/lib/post"
import { ArticleCard } from "@/components/home/article/card"

export const dynamic = "force-dynamic"

function postToArticle(post: any) {
  return {
    issue: post.$sequence,
    tag: "Article",
    title: post.title,
    excerpt: post.description,
    img: getFileViewUrl(
      process.env.NEXT_PUBLIC_APPRWITE_CVIMAGE_BUCKET!,
      `${post.$id}.jpg`,
    ),
    alt: post.title,
    slug: post.slug,
  }
}

export default async function ArticlesPage() {
  const posts = await getPosts()

  return (
    <section className="py-12">
      <h1 className="text-3xl font-semibold">{"Articles"}</h1>
      <p className="mt-1 text-muted-foreground">{`${posts.length} articles`}</p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.$id} article={postToArticle(post)} />
        ))}
      </div>
    </section>
  )
}
