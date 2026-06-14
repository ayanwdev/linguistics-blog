import Link from "next/link"

const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "Articles", href: "/articles" },
      { label: "Miscellaneous", href: "/miscellaneous" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Contribute",
    links: [
      { label: "Submit an Article", href: "/submit" },
      { label: "Guidelines", href: "/guidelines" },
      { label: "Contact Us", href: "mailto:placeholder@mail.com" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Forum", href: "/forum" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "RSS Feed", href: "/rss" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-col gap-10 md:flex-row md:justify-between">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-foreground/75">
            {"PlaceHolder"}
          </h1>
          <p className="mt-1 text-sm text-foreground/50">
            {
              "An independent platform for discussing politics. Bla bla bla yappity yappity yap yap pee pee poo poo. i hate university."
            }
          </p>
        </div>
        <div className="flex flex-1 flex-wrap gap-10">
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-1 flex-col gap-2">
              <span className="text-sm font-semibold text-foreground/75">
                {section.title}
              </span>
              {section.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-foreground/50 transition hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex w-full justify-between border-t border-border pt-4">
        <p className="text-xs text-foreground/40">
          {"© " +
            new Date().getFullYear() +
            " PlaceHolder. All rights reserved."}
        </p>
        <p className="text-xs text-foreground/40">
          I don't know what to write here
        </p>
      </div>
    </footer>
  )
}
