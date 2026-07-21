import Link from "next/link"
import { ArticleCard } from "./card"
import { Button } from "@/components/ui/button"

const ARTICLES = [
  {
    issue: 15,
    tag: "Syntax",
    title: "The Grammar That Broke Chomsky",
    excerpt:
      "A small Amazonian language with no numbers, no color terms, and no recursion — and what it means for everything we thought we knew.",
    img: "https://images.unsplash.com/photo-1610413310834-c677f3acf391?w=800&h=500&fit=crop&auto=format",
    alt: "Amazon rainforest river",
  },
  {
    issue: 14,
    tag: "Phonology",
    title: "When Pitch Means Everything",
    excerpt:
      "From Mandarin's four tones to Hmong's eight — how tone systems evolved independently across continents.",
    img: "https://images.unsplash.com/photo-1546638008-efbe0b62c730?w=800&h=500&fit=crop&auto=format",
    alt: "Person doing kanji calligraphy",
  },
  {
    issue: 13,
    tag: "Isolate",
    title: "The Language With No Family",
    excerpt:
      "Basque stands alone. No known relatives, no traceable ancestor — a living fossil still thriving in the Pyrenees.",
    img: "https://images.unsplash.com/photo-1734357288506-5271d99f306c?w=800&h=500&fit=crop&auto=format",
    alt: "Ancient Egyptian writing on papyrus",
  },
]

export function ArticleGrid() {
  return (
    <div className="py-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          {"Recent Articles"}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.slice(0, 6).map((art, i) => (
          <div key={art.issue} className={i >= 3 ? "hidden md:block" : ""}>
            <ArticleCard article={art} />
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <Button
          type="button"
          className="w-full bg-secondary text-primary hover:bg-secondary/90 md:w-auto"
        >
          EXPLORE ALL
        </Button>
      </div>
    </div>
  )
}
