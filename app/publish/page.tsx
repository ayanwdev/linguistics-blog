"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Dialog as DialogPrimitive } from "radix-ui"
import {
  ArrowLeft,
  CheckIcon,
  FileIcon,
  PlusIcon,
  SearchIcon,
  Upload,
  UserPlus,
} from "lucide-react"
import { Storage, TablesDB, ID } from "appwrite"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { client as getClient, avatars } from "@/lib/appwrite"

// ─── Types ───────────────────────────────────────────────────────────────────

type AuthorOption = {
  $id: string
  name: string
  institution: string
  initials: string
  role: string
  labels: string[]
}

export enum Category {
  PHONETICS = 0,
  PHONOLOGY = 1,
  MORPHOLOGY = 2,
  SYNTAX = 3,
  SEMANTICS = 4,
  PRAGMATICS = 5,
  SOCIOLINGUISTICS = 6,
  PSYCHOLINGUISTICS = 7,
  NEUROLINGUISTICS = 8,
  COMPUTATIONAL_LINGUISTICS = 9,
  HISTORICAL_LINGUISTICS = 10,
  APPLIED_LINGUISTICS = 11,
}

const CATEGORY_OPTIONS: Array<{ value: Category; label: string }> = [
  { value: Category.PHONETICS, label: "Phonetics" },
  { value: Category.PHONOLOGY, label: "Phonology" },
  { value: Category.MORPHOLOGY, label: "Morphology" },
  { value: Category.SYNTAX, label: "Syntax" },
  { value: Category.SEMANTICS, label: "Semantics" },
  { value: Category.PRAGMATICS, label: "Pragmatics" },
  { value: Category.SOCIOLINGUISTICS, label: "Sociolinguistics" },
  { value: Category.PSYCHOLINGUISTICS, label: "Psycholinguistics" },
  { value: Category.NEUROLINGUISTICS, label: "Neurolinguistics" },
  {
    value: Category.COMPUTATIONAL_LINGUISTICS,
    label: "Computational Linguistics",
  },
  { value: Category.HISTORICAL_LINGUISTICS, label: "Historical Linguistics" },
  { value: Category.APPLIED_LINGUISTICS, label: "Applied Linguistics" },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Extracts up to 2 initials from a full name string */
function getInitials(value: string) {
  return (
    value
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "A"
  )
}

function getCategoryLabel(value: Category) {
  return (
    CATEGORY_OPTIONS.find((option) => option.value === value)?.label ??
    "Category"
  )
}

// ─── Main Form ────────────────────────────────────────────────────────────────

export default function PublishForm() {
  const router = useRouter()

  // Form fields
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [slug, setSlug] = React.useState("")
  const [institution, setInstitution] = React.useState("")

  // Category selection
  const [categories, setCategories] = React.useState<Category[]>([])
  const [categoryOpen, setCategoryOpen] = React.useState(false)

  // Author selection
  const [author, setAuthor] = React.useState<AuthorOption | null>(null)
  const [authors, setAuthors] = React.useState<AuthorOption[]>([])
  const [authorOpen, setAuthorOpen] = React.useState(false)

  // File uploads
  const [markdownFile, setMarkdownFile] = React.useState<File | null>(null)
  const [coverFile, setCoverFile] = React.useState<File | null>(null)

  // UI state
  const [busy, setBusy] = React.useState(false)
  const [message, setMessage] = React.useState<string | null>(null)

  // ── Load authors from Appwrite profiles table on mount ──
  React.useEffect(() => {
    const loadAuthors = async () => {
      const databaseId = process.env.NEXT_PUBLIC_APPWRITE_PROFILES_DB
      if (!databaseId) return

      try {
        const tables = new TablesDB(getClient())
        const result = await tables.listRows({
          databaseId,
          tableId: "profiles",
        })

        const nextAuthors = (result.rows as Array<Record<string, unknown>>).map(
          (row) => {
            const name = String(row.name ?? "")
            const institutionValue = String(row.institution ?? "")
            const initials = getInitials(name || "Author")
            const rawLabels = Array.isArray(row.labels)
              ? row.labels
              : typeof row.labels === "string"
                ? [row.labels]
                : []
            const labels = rawLabels
              .map((label) => String(label ?? "").trim())
              .filter(Boolean)

            return {
              $id: String(row.$id ?? ""),
              name: name || "Anonymous author",
              institution: institutionValue,
              initials,
              role: institutionValue || "Contributor",
              labels,
            }
          },
        )

        setAuthors(nextAuthors)
      } catch (error) {
        console.error("Failed to load authors", error)
      }
    }

    void loadAuthors()
  }, [])

  // ── Category selection helpers ──
  function toggleCategory(value: Category) {
    setCategories((current) => {
      if (current.includes(value)) {
        return current.filter((item) => item !== value)
      }

      if (current.length >= 2) {
        return current
      }

      return [...current, value]
    })
  }

  // ── When an author is selected, pre-fill the institution field ──
  function handleAuthorSelect(value: AuthorOption) {
    setAuthor(value)
    setInstitution(value.institution)
    setAuthorOpen(false)
  }

  // ── Form submission: upload files then create post document ──
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage(null)

    if (
      !title ||
      !description ||
      !slug ||
      categories.length === 0 ||
      !author ||
      !markdownFile ||
      !coverFile
    ) {
      setMessage(
        "Please select up to 2 categories and fill all other required fields.",
      )
      return
    }

    // Sanitize slug: lowercase, hyphens only, no leading/trailing hyphens
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

      // Use a single ID for both files and the post document
      const id = ID.unique()

      const postsBucket = process.env.NEXT_PUBLIC_APPRWITE_POSTS_BUCKET!
      const imageBucket = process.env.NEXT_PUBLIC_APPRWITE_CVIMAGE_BUCKET!
      const databaseId = process.env.NEXT_PUBLIC_APPRWITE_POSTS_DB!
      const ext = coverFile.name.split(".").pop() || "jpg"

      // Upload markdown file
      await storage.createFile(
        postsBucket,
        `${id}.md`,
        new File([markdownFile], `${id}.md`, { type: "text/markdown" }),
      )

      // Upload cover image
      await storage.createFile(
        imageBucket,
        `${id}.${ext}`,
        new File([coverFile], `${id}.${ext}`, { type: coverFile.type }),
      )

      // Create post document in TablesDB
      await tables.createRow({
        databaseId,
        tableId: "posts",
        rowId: id,
        data: {
          title,
          description,
          slug: safeSlug,
          viewCount: 0,
          categories: categories.map((category) => Category[category]),
          authorName: author.name,
          authorId: author.$id,
          author: author.name,
          institution: institution || author.institution,
        },
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
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <div className="border-b border-border py-10">
        <h1 className="font-header text-4xl font-black">{"Publish Article"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {"Fill out the form below to publish a new article"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="pb-16">
        <FormTextField
          label="Title"
          required
          value={title}
          onValueChange={setTitle}
          placeholder="e.g. Lexical Frequency in Morphology"
        />

        <FormTextField
          label="Description"
          required
          value={description}
          onValueChange={setDescription}
          as="textarea"
          rows={4}
          placeholder="Provide a short summary of your article."
        />

        <FormTextField
          label="Slug"
          required
          value={slug}
          onValueChange={setSlug}
          placeholder="lexical-frequency-in-morphology"
        />

        <Field label="Categories" required>
          <button
            type="button"
            onClick={() => setCategoryOpen(true)}
            className="group flex min-h-14 w-full flex-wrap items-center gap-2 border border-dashed border-border px-4 py-3 text-left transition-colors hover:border-muted-foreground"
          >
            {categories.length > 0 ? (
              <>
                {categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-foreground"
                  >
                    {getCategoryLabel(category)}
                  </span>
                ))}
                <span className="ml-auto text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                  {"Change"}
                </span>
              </>
            ) : (
              <>
                <div className="flex size-10 shrink-0 items-center justify-center border border-dashed border-border">
                  <PlusIcon className="size-4 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {"Assign categories"}
                </span>
              </>
            )}
          </button>
        </Field>

        {/* Author picker — opens a search dialog */}
        <Field label="Author" required>
          <button
            type="button"
            onClick={() => setAuthorOpen(true)}
            className="group flex w-full items-center gap-3 border border-dashed border-border px-4 py-3 text-left transition-colors hover:border-muted-foreground"
          >
            {author ? (
              <>
                <Avatar className="size-10">
                  <AvatarImage
                    src={avatars.getInitials({
                      name: author.name,
                      width: 72,
                      height: 72,
                    })}
                    alt={`${author.name} avatar`}
                  />
                  <AvatarFallback>{author.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-foreground">
                    {author.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {author.role}
                  </div>
                </div>
                <span className="ml-auto text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                  {"Change"}
                </span>
              </>
            ) : (
              <>
                <div className="flex size-10 shrink-0 items-center justify-center border border-dashed border-border">
                  <UserPlus className="size-4 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {"Assign an author"}
                </span>
              </>
            )}
          </button>
        </Field>

        {/* File uploads */}
        <Field label="Article File" required>
          <Dropzone
            accept=".md,.markdown"
            hint="Choose the markdown file containing your article"
            file={markdownFile}
            onFile={setMarkdownFile}
          />
        </Field>

        <Field label="Cover Image" required>
          <Dropzone
            accept=".png,.jpg,.jpeg"
            hint="Choose the cover image for your article"
            file={coverFile}
            onFile={setCoverFile}
          />
        </Field>

        {message ? (
          <p className="pt-4 text-sm text-red-500">{message}</p>
        ) : null}

        <div className="pt-8">
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </form>

      <CategoryDialog
        open={categoryOpen}
        onOpenChange={setCategoryOpen}
        selected={categories}
        onToggle={toggleCategory}
      />

      {/* Author selection dialog */}
      <AuthorDialog
        key={authorOpen ? "author-open" : "author-closed"}
        open={authorOpen}
        onOpenChange={setAuthorOpen}
        authors={authors}
        selected={author}
        onSelect={handleAuthorSelect}
      />
    </section>
  )
}

// ─── Category Dialog ────────────────────────────────────────────────────────

type CategoryDialogProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
  selected: Category[]
  onToggle: (value: Category) => void
}

function CategoryDialog({
  open,
  onOpenChange,
  selected,
  onToggle,
}: CategoryDialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 border border-border bg-card shadow-2xl focus:outline-none">
          <DialogPrimitive.Title className="sr-only">
            {"Select Categories"}
          </DialogPrimitive.Title>

          <div className="border-b border-border px-4 py-3">
            <div className="text-sm font-medium text-foreground">
              {"Choose up to 2 categories"}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {"Pick the topics that best fit this article."}
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto p-2">
            {CATEGORY_OPTIONS.map((option) => {
              const isSelected = selected.includes(option.value)
              const disabled = !isSelected && selected.length >= 2

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onToggle(option.value)}
                  disabled={disabled}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${isSelected ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"} ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
                >
                  <span>{option.label}</span>
                  {isSelected ? (
                    <span className="text-xs font-medium">{"✓"}</span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

// ─── Author Dialog ────────────────────────────────────────────────────────────

type AuthorDialogProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
  authors: AuthorOption[]
  selected: AuthorOption | null
  onSelect: (value: AuthorOption) => void
}

function AuthorDialog({
  open,
  onOpenChange,
  authors,
  selected,
  onSelect,
}: AuthorDialogProps) {
  const [query, setQuery] = React.useState("")
  const [creating, setCreating] = React.useState(false)
  const [newName, setNewName] = React.useState("")
  const [newRole, setNewRole] = React.useState("")
  const searchRef = React.useRef<HTMLInputElement>(null)

  // Focus the search input when the dialog opens
  React.useEffect(() => {
    if (open) {
      window.setTimeout(() => searchRef.current?.focus(), 50)
    }
  }, [open])

  // Filter authors by name or role
  const filtered = authors.filter((author) => {
    const search = query.toLowerCase()
    return (
      author.name.toLowerCase().includes(search) ||
      author.role.toLowerCase().includes(search)
    )
  })

  // Create a local (non-persisted) author option and select it
  function handleCreate() {
    if (!newName.trim()) return

    const created: AuthorOption = {
      $id: `local-${Date.now()}`,
      name: newName.trim(),
      institution: newRole.trim() || "Contributor",
      initials: getInitials(newName.trim()),
      role: newRole.trim() || "Contributor",
      labels: [],
    }

    onSelect(created)
    onOpenChange(false)
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 border border-border bg-card shadow-2xl focus:outline-none">
          <DialogPrimitive.Title className="sr-only">
            {"Select Author"}
          </DialogPrimitive.Title>

          {!creating ? (
            <>
              {/* Search bar */}
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <SearchIcon className="size-4 text-muted-foreground" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search authors..."
                  className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <DialogPrimitive.Close className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                  {"ESC"}
                </DialogPrimitive.Close>
              </div>

              {/* Author list */}
              <div className="max-h-64 overflow-y-auto">
                {filtered.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                    {"No authors found."}
                  </p>
                ) : (
                  filtered.map((author) => (
                    <button
                      key={author.$id}
                      type="button"
                      onClick={() => onSelect(author)}
                      className={`flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors last:border-0 hover:bg-secondary ${selected?.$id === author.$id ? "bg-secondary" : ""}`}
                    >
                      <Avatar className="size-8">
                        <AvatarImage
                          src={avatars.getInitials({
                            name: author.name,
                            width: 64,
                            height: 64,
                          })}
                          alt={`${author.name} avatar`}
                        />
                        <AvatarFallback>{author.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-foreground">
                          {author.name}
                        </div>
                      </div>
                      {/* Checkmark for currently selected author */}
                      {selected?.$id === author.$id ? (
                        <CheckIcon
                          className="size-4 text-foreground"
                          aria-label="Selected"
                        />
                      ) : null}
                    </button>
                  ))
                )}
              </div>

              {/* Create new author button */}
              <div className="border-t border-border">
                <button
                  type="button"
                  onClick={() => setCreating(true)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center border border-dashed border-border">
                    <PlusIcon className="size-4" />
                  </div>
                  {"Create new author"}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Create author form */}
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <button
                  type="button"
                  onClick={() => setCreating(false)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <span className="text-sm font-medium text-foreground">
                  {"New author"}
                </span>
              </div>

              <div className="flex flex-col gap-4 p-4">
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-muted-foreground">
                    {"FULL NAME "}
                    <span className="text-destructive">{"*"}</span>
                  </label>
                  <Input
                    autoFocus
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Amara Diallo"
                    className="w-full border-border bg-background text-sm text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-muted-foreground">
                    {"ROLE"}
                  </label>
                  <Input
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="e.g. Field Linguist"
                    className="w-full border-border bg-background text-sm text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleCreate}
                  disabled={!newName.trim()}
                >
                  {"Create author"}
                </Button>
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

// ─── Dropzone ─────────────────────────────────────────────────────────────────

/** Drag-and-drop file input with click-to-browse fallback */
function Dropzone({
  accept,
  hint,
  file,
  onFile,
}: {
  accept: string
  hint: string
  file: File | null
  onFile: (value: File) => void
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          const nextFile = event.dataTransfer.files[0]
          if (nextFile) onFile(nextFile)
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed py-8 transition-colors ${dragging ? "border-foreground bg-secondary" : "border-border hover:border-muted-foreground"} ${file ? "bg-secondary" : ""}`}
      >
        {file ? (
          <div className="flex flex-col items-center gap-2">
            <FileIcon className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {file.name}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{hint}</span>
          </div>
        )}
        {/* Show accepted formats as a hint */}
        <span className="text-xs text-muted-foreground">
          {accept.replace(/,/g, " / ").replace(/\./g, "").toUpperCase()}
        </span>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => {
          const nextFile = event.target.files?.[0]
          if (nextFile) onFile(nextFile)
        }}
      />
    </div>
  )
}

// ─── FormTextField ────────────────────────────────────────────────────────────

/** Renders either an Input or Textarea inside a Field wrapper */
function FormTextField({
  label,
  required,
  value,
  onValueChange,
  placeholder,
  description,
  as = "input",
  rows = 4,
}: {
  label: string
  required?: boolean
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  description?: string
  as?: "input" | "textarea"
  rows?: number
}) {
  return (
    <Field label={label} required={required}>
      {as === "textarea" ? (
        <Textarea
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          required={required}
          rows={rows}
          placeholder={placeholder}
          className="w-full resize-none border-b border-border bg-transparent p-2 text-sm outline-none placeholder:text-muted-foreground"
        />
      ) : (
        <Input
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          required={required}
          placeholder={placeholder}
          className="w-full border-b border-border bg-transparent p-2 text-sm outline-none placeholder:text-muted-foreground"
        />
      )}
      {description ? (
        <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      ) : null}
    </Field>
  )
}

// ─── Field ────────────────────────────────────────────────────────────────────

/** Two-column layout wrapper for form fields (label left, input right) */
function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-4 border-b border-border py-6 md:grid-cols-[220px_1fr] md:items-start">
      <label className="pt-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
        {label}{" "}
        {required ? <span className="text-destructive">{"*"}</span> : null}
      </label>
      <div>{children}</div>
    </div>
  )
}
