import Image from "next/image"
import Link from "next/link"
import { getFileViewUrl, getPosts } from "@/lib/post"

export const dynamic = "force-dynamic"

export default async function ArticlesPage() {
  const posts = await getPosts()

  return (
    <section className="py-12">
      <h1 className="text-3xl font-semibold">{"Articles"}</h1>
      <p className="mt-1 text-muted-foreground">{`${posts.length} articles`}</p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.$id}
            href={`/articles/${post.slug}`}
            className="group flex flex-col overflow-hidden border border-border bg-card transition hover:border-ring"
          >
            <div className="relative aspect-video w-full">
              <Image
                src={getFileViewUrl(
                  process.env.NEXT_PUBLIC_APPRWITE_CVIMAGE_BUCKET!,
                  `${post.$id}.jpg`,
                )}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 p-4">
              <span className="leading-snug font-medium group-hover:underline">
                {post.title}
              </span>
              <span className="text-sm text-muted-foreground">
                {post.authorName}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
