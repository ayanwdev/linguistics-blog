import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/badge"
import { Skeleton } from "@/components/ui/skeleton"

type Article = {
  issue: string
  tag: string
  title: string
  excerpt: string
  img: string
  alt: string
  slug?: string
}

export function ArticleCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden border border-border bg-card">
      <Skeleton className="aspect-video w-full" />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="mb-2 h-5 w-3/4" />
        <div className="mb-4 flex-1 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-shadow duration-200 hover:shadow-md">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={article.img}
          alt={article.alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-[10px] text-muted-foreground">
            {article.issue}
          </span>
          <Badge name={article.tag} />
        </div>
        <h3 className="font-header mb-2 text-base leading-snug font-black">
          {article.title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {article.excerpt.length > 156
            ? article.excerpt.slice(0, 156) + "…"
            : article.excerpt}
        </p>
        <Link
          href={article.slug ? `/articles/${article.slug}` : "#"}
          className="text-xs font-medium text-foreground group-hover:underline"
        >
          {"Read issue →"}
        </Link>
      </div>
    </article>
  )
}
