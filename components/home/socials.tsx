import Link from "next/link"

const SOCIALS = [
  {
    name: "Twitter / X",
    handle: "@parallellingclub",
    url: "#",
    desc: "Daily language facts, thread deep-dives, and issue previews.",
  },
  {
    name: "Instagram",
    handle: "@parallellingclub",
    url: "#",
    desc: "Script spotlights, field photos, and parallel-text infographics.",
  },
  {
    name: "Discord",
    handle: "PLC Community",
    url: "#",
    desc: "Live reading circles, study groups, and member discussion.",
  },
  {
    name: "Substack",
    handle: "parallelclub.substack",
    url: "#",
    desc: "Full archive of all issues, free to read, free to share.",
  },
]

export function Socials() {
  return (
    <div className="border-t border-border py-12">
      <h2 className="mb-8 font-mono text-xs tracking-widest text-muted-foreground uppercase">
        {"Find Us"}
      </h2>
      <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
        {SOCIALS.map((s) => (
          <Link
            key={s.name}
            href={s.url}
            className="group flex flex-col gap-3 bg-card p-6 transition-colors hover:bg-secondary"
          >
            <span className="font-mono text-xs text-muted-foreground">
              {s.name}
            </span>
            <span className="font-header text-sm font-black group-hover:underline">
              {s.handle}
            </span>
            <span className="mt-auto text-xs leading-relaxed text-muted-foreground">
              {s.desc}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
