import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* main footer grid */}
        <div className="grid grid-cols-1 gap-12 py-14 md:grid-cols-[1.8fr_1fr_1fr_1fr]">
          {/* brand column */}
          <div>
            <div className="font-header mb-3 text-xl font-black">
              ¶ The Parallel
              <br />
              Linguistics Club
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              A quarterly journal for people obsessed with how language works —
              and why no two languages work the same way. Est. 2019.
            </p>
            <div className="mt-6 flex gap-4">
              {["X", "IG", "DC", "RSS"].map((s) => (
                <Link
                  key={s}
                  href="#"
                  className="border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* link columns */}
          {[
            {
              heading: "Explore",
              links: ["Issues", "Languages", "Projects", "Archive"],
            },
            {
              heading: "Contribute",
              links: ["Submit a Pitch", "Field Notes", "Guidelines", "Contact"],
            },
            {
              heading: "Community",
              links: ["Discord", "Reading Circles", "Newsletter", "About"],
            },
          ].map((col) => (
            <div key={col.heading}>
              <h3 className="mb-5 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-start justify-between gap-2 border-t border-border py-5 sm:flex-row sm:items-center">
          <span className="font-mono text-xs text-muted-foreground">
            © 2026 The Parallel Linguistics Club. All rights reserved.
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            ABCD EF-GH
          </span>
        </div>
      </div>
    </footer>
  )
}
