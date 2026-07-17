import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/badge"

const tags = ["Field Recording", "Phonology", "Corpus Building", "Open Access"]

export function Project() {
  return (
    <div className="border-t border-border py-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          {"Active Projects"}
        </h2>
      </div>
      <div className="group flex cursor-pointer flex-col overflow-hidden border border-border bg-card transition-shadow duration-200 hover:shadow-md md:flex-row">
        <div className="relative h-56 shrink-0 overflow-hidden bg-muted md:h-auto md:w-80">
          <Image
            src="https://images.unsplash.com/photo-1706038416148-59f92ceeedb2?w=800&h=600&fit=crop&auto=format"
            alt="Bengali books in Kolkata"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between p-6">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-secondary-foreground">
                {"ONGOING"}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {"Since 2026"}
              </span>
            </div>
            <h3 className="font-header mb-3 text-2xl font-black">
              {"Bengali Language Documentation Project"}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {
                "A collaborative effort to document spoken Bengali dialects across the world: capturing phonological variation, code-switching patterns, and endangered subdialects before they disappear."
              }
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Badge key={t} name={t} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6 font-mono text-xs text-muted-foreground">
            <span>{"12 contributors"}</span>
            <span>{"100+ hours recorded"}</span>
            <Link
              href="#"
              className="ml-auto font-medium text-foreground hover:underline"
            >
              {"Learn more →"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
