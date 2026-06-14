import { Geist_Mono, Noto_Sans, Playfair_Display } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { NavBar } from "@/components/nav/bar"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Metadata } from "next"
import { Footer } from "@/components/footer"

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
})

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Linguistics Blog",
  description: "A blog about linguistics and related topics.",
  metadataBase: new URL("https://linguistics-blog.vercel.app"),
  other: {
    "darkreader-lock": "",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        notoSans.variable,
        playfairDisplayHeading.variable,
      )}
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <NavBar />
          <section className="mx-auto min-h-svh w-full max-w-7xl flex-1 px-4 sm:px-6 md:border-x-2 md:border-dashed md:border-accent md:pt-4 lg:px-8">
            {children}
          </section>
          <section className="bg-muted">
            <Footer />
          </section>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
