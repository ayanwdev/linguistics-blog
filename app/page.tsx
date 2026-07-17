import { Hero } from "@/components/home/hero"
import { ArticleGrid } from "@/components/home/article/grid"
import { Project } from "@/components/home/project"
import { Socials } from "@/components/home/socials"
import { Newsletter } from "@/components/home/newsletter"

export default function Page() {
  return (
    <section>
      <Hero />
      <ArticleGrid />
      <Project />
      <Socials />
      <Newsletter />
    </section>
  )
}
