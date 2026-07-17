import Link from "next/link"

export function Hero() {
  return (
    <div className="border-b border-border py-16 text-center">
      <p className="mb-5 font-mono text-xs tracking-widest text-muted-foreground uppercase">
        {"est 2025 · 13 articles · 284 members"}
      </p>
      <h1 className="font-header mb-5 text-[clamp(3rem,9vw,6.5rem)] leading-none font-black tracking-tight">
        {"The "}
        <span>{"Parallel"}</span>
        <br />
        {"Linguistics Club"}
      </h1>
      <p className="mx-auto mb-8 max-w-sm text-base leading-relaxed text-muted-foreground">
        {
          "A quarterly journal about how language works, and why no two languages work the same way."
        }
      </p>
      <Link
        href="#join"
        className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        {"Subscribe to Newsletter"}
      </Link>
    </div>
  )
}
