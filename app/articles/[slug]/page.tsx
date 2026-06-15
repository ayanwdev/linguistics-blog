import { getPost } from "@/lib/post"
import { MDXRemote } from "next-mdx-remote/rsc"
import Image from "next/image"
import remarkGfm from "remark-gfm"

export const dynamic = "force-dynamic"

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

      <h1 className="text-4xl font-semibold">{post.title}</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        {"By "}
        {post.authorName}
        {post.institution ? `, ${post.institution}` : ""}
      </p>
      <div className="prose mt-10 max-w-none prose-neutral dark:prose-invert prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-7 prose-li:leading-7">
        <MDXRemote
          source={content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  )
}
