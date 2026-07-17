import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { avatars } from "@/lib/appwrite"
import { getPost } from "@/lib/post"
import { MDXRemote } from "next-mdx-remote/rsc"
import Image from "next/image"
import Link from "next/link"
import remarkGfm from "remark-gfm"

export const dynamic = "force-dynamic"

export function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = await getPost(slug)

  if (!data) return <div className="p-12">{"Article not found."}</div>

  const { post, content, cover } = data

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      {cover ? (
        <div className="relative mb-8 aspect-video w-full overflow-hidden">
          <Image src={cover} alt={post.title} fill className="object-cover" />
        </div>
      ) : null}

      <h1 className="text-3xl font-semibold md:text-4xl">{post.title}</h1>
      <p className="my-10 flex items-center gap-2 text-muted-foreground">
        <Link
          href={`/profile/${post.authorId}`}
          className="flex items-center gap-2 text-foreground hover:underline"
        >
          <Avatar>
            <AvatarImage
              src={avatars.getInitials({
                name: post.authorName,
                width: 90,
                height: 90,
              })}
              alt={`${post.authorName} avatar`}
            />
          </Avatar>
          <span className="font-medium">{post.authorName}</span>
        </Link>
        {[
          new Date(post.$createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          readingTime(content),
        ].map((item, i) => (
          <span key={i}>
            <span className="mx-2">{"·"}</span>
            {item}
          </span>
        ))}
      </p>
      <div className="prose mt-5 max-w-none prose-neutral dark:prose-invert prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-7 prose-li:leading-7">
        <MDXRemote
          source={content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  )
}
