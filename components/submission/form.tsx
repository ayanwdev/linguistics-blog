"use client"
import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/form-field"
import { Upload } from "lucide-react"

const contactEmail = "peepeepoopoo@mail.com"

export function SubmissionForm() {
  const [fileName, setFileName] = React.useState("")

  return (
    <div className="min-w-0 bg-muted p-8 md:p-12">
      <h1 className="text-3xl font-semibold">{"Submit an Article"}</h1>
      <p className="pt-1 text-muted-foreground">
        {"Publish your article on linguistics."}
      </p>

      <form className="mt-8 space-y-4">
        <FormField
          required
          id="article-title"
          label="Title of Your Article"
          placeholder="Enter the title of your article"
        />

        <div>
          <label htmlFor="article-description" className="text-sm font-medium">
            {"Description"}
            <span className="text-red-500">{"*"}</span>
          </label>
          <Textarea
            required
            id="article-description"
            placeholder="Summarize your article in a few sentences"
            className="mt-1"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            required
            id="author-email"
            label="Your Email"
            placeholder="example@mail.com"
            className="min-w-0"
          />
          <FormField
            required
            id="author-name"
            label="Your Name"
            placeholder="Enter your full name"
            className="min-w-0"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="author-institution"
            label="Your Institution"
            placeholder="Enter your institution"
            className="min-w-0"
          />
          <FormField
            required
            id="author-about"
            label="About You"
            placeholder="Researcher, student, hobbyist etc."
            className="min-w-0"
          />
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <span className="text-sm font-medium">
            {"Upload Manuscript (PDF / Word / Markdown)"}
            <span className="text-red-500">{"*"}</span>
          </span>
          <label
            htmlFor="article-file"
            className="flex min-h-18 cursor-pointer items-center justify-center border-[2px] border-dashed border-border bg-background/50 px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
          >
            <span className="flex min-w-0 items-center gap-3">
              <Upload className="size-4" aria-hidden="true" />
              <span className="min-w-0 break-words">
                {fileName || "Select a PDF, Word, or Markdown file (max 10 MB)"}
              </span>
            </span>
          </label>
          <p className="text-xs text-muted-foreground">
            {"Or send your manuscript via email: "}
            <a
              href={`mailto:${contactEmail}`}
              className="break-all text-primary underline underline-offset-2"
            >
              {contactEmail}
            </a>
          </p>
          <input
            required
            id="article-file"
            type="file"
            accept=".docx,.pdf,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/markdown,text/plain"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </div>

        <Button type="submit" className="w-full">
          {"Submit Article"}
        </Button>
      </form>
    </div>
  )
}
