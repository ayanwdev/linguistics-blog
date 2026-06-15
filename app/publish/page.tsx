"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/form-field"
import { FileIcon, Upload } from "lucide-react"
import { Storage, TablesDB, ID } from "appwrite"
import { client as getClient } from "@/lib/appwrite"

export default function Page() {
  return <PublishForm />
}

function PublishForm() {
  const router = useRouter()
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [slug, setSlug] = React.useState("")
  const [authorName, setAuthorName] = React.useState("")
  const [authorDescription, setAuthorDescription] = React.useState("")
  const [institution, setInstitution] = React.useState("")
  const [markdownName, setMarkdownName] = React.useState("")
  const [imageName, setImageName] = React.useState("")
  const [busy, setBusy] = React.useState(false)
  const [message, setMessage] = React.useState<string | null>(null)

  const mdRef = React.useRef<HTMLInputElement>(null)
  const imgRef = React.useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    setMessage(null)

    const mdFile = mdRef.current?.files?.[0]
    const imgFile = imgRef.current?.files?.[0]

    if (
      !title ||
      !description ||
      !slug ||
      !authorName ||
      !authorDescription ||
      !mdFile ||
      !imgFile
    ) {
      setMessage("Please fill all required fields and upload both files.")
      return
    }

    const safeSlug = slug
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")

    try {
      setBusy(true)
      const client = getClient()
      const storage = new Storage(client)
      const tables = new TablesDB(client)
      const id = ID.unique()

      const postsBucket = process.env.NEXT_PUBLIC_APPRWITE_POSTS_BUCKET!
      const imageBucket = process.env.NEXT_PUBLIC_APPRWITE_CVIMAGE_BUCKET!
      const databaseId = process.env.NEXT_PUBLIC_APPRWITE_POSTS_DB!

      const ext = imgFile.name.split(".").pop() || "jpg"

      await storage.createFile(
        postsBucket,
        `${id}.md`,
        new File([mdFile], `${id}.md`, { type: "text/markdown" }),
      )
      await storage.createFile(
        imageBucket,
        `${id}.${ext}`,
        new File([imgFile], `${id}.${ext}`, { type: imgFile.type }),
      )

      await tables.createRow(databaseId, "posts", id, {
        title,
        description,
        slug: safeSlug,
        viewCount: 0,
        authorName,
        authorDescription,
        institution,
      })

      setMessage("Published successfully!")
      router.push(`/articles/${safeSlug}`)
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="my-8 flex w-full flex-col bg-card p-8 md:p-12">
      <h1 className="text-3xl font-semibold">{"Publish Article"}</h1>
      <p className="pt-1 text-muted-foreground">
        {"Fill out the form below to publish a new article."}
      </p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <FormField
          id="title"
          label="Title"
          required
          placeholder="e.g. Lexical Frequency in Morphology"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          <label htmlFor="description" className="text-sm font-medium">
            {"Description"}
            <span className="text-red-500">{"*"}</span>
          </label>
          <Textarea
            id="description"
            required
            placeholder="Provide a short summary of your article."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1"
          />
        </div>

        <FormField
          id="slug"
          label="Slug"
          required
          placeholder="lexical-frequency-in-morphology"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="authorName"
            label="Author Full Name"
            required
            placeholder="John Doe"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="min-w-0"
          />
          <FormField
            id="institution"
            label="Institution"
            placeholder="University of Dhaka"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            className="min-w-0"
          />
        </div>

        <div>
          <label htmlFor="authorDescription" className="text-sm font-medium">
            {"About Author"}
            <span className="text-red-500">{"*"}</span>
          </label>
          <Textarea
            id="authorDescription"
            required
            placeholder="Briefly describe the author's background."
            value={authorDescription}
            onChange={(e) => setAuthorDescription(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <span className="text-sm font-medium">
            {"Upload Markdown File (.md)"}
            <span className="text-red-500">{"*"}</span>
          </span>
          <label
            htmlFor="markdown-file"
            className="flex min-h-18 cursor-pointer items-center justify-center border-[2px] border-dashed border-border bg-background/50 px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
          >
            <span className="flex min-w-0 items-center gap-3">
              {markdownName ? (
                <FileIcon className="size-4" />
              ) : (
                <Upload className="size-4" />
              )}
              <span className="min-w-0 break-words">
                {markdownName ||
                  "Choose a markdown file containing your article"}
              </span>
            </span>
          </label>
          <input
            ref={mdRef}
            id="markdown-file"
            type="file"
            accept=".md,text/markdown,text/plain"
            className="sr-only"
            onChange={(e) => setMarkdownName(e.target.files?.[0]?.name ?? "")}
          />
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <span className="text-sm font-medium">
            {"Cover Image (PNG, JPG, JPEG)"}
            <span className="text-red-500">{"*"}</span>
          </span>
          <label
            htmlFor="cover-image"
            className="flex min-h-18 cursor-pointer items-center justify-center border-[2px] border-dashed border-border bg-background/50 px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
          >
            <span className="flex min-w-0 items-center gap-3">
              {imageName ? (
                <FileIcon className="size-4" />
              ) : (
                <Upload className="size-4" />
              )}
              <span className="min-w-0 break-words">
                {imageName || "Choose a cover image for your article"}
              </span>
            </span>
          </label>
          <input
            ref={imgRef}
            id="cover-image"
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="sr-only"
            onChange={(e) => setImageName(e.target.files?.[0]?.name ?? "")}
          />
        </div>

        {message && <p className="text-sm text-red-500">{message}</p>}

        <Button type="submit" disabled={busy} className="w-full">
          {busy ? "Publishing..." : "Publish"}
        </Button>
      </form>
    </div>
  )
}
