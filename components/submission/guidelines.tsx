const guidelines = [
  {
    title: "Original work only",
    description:
      "Submissions must be your own original writing. Plagiarism will result in removal.",
  },
  {
    title: "Cite your sources",
    description:
      "Back up claims with references to academic papers, books, or reputable sources.",
  },
  {
    title: "Stay on topic",
    description:
      "Articles should be relevant to linguistics, language, or related fields.",
  },
  {
    title: "Clear and accessible",
    description:
      "Write for a broad audience. Avoid unnecessary jargon without explanation.",
  },
  {
    title: "Minimum length",
    description:
      "Articles should be at least 500 words to ensure sufficient depth.",
  },
  {
    title: "No promotional content",
    description:
      "Articles must not be advertisements or promotional material for products or services.",
  },
]

export function SubmissionGuidelines() {
  return (
    <div className="min-w-0 bg-muted p-8 md:p-12">
      <h2 className="text-3xl font-semibold">{"Guidelines"}</h2>
      <p className="pt-1 text-muted-foreground">
        {"Please read before submitting."}
      </p>
      <ul className="mt-8 space-y-4">
        {guidelines.map((g) => (
          <li key={g.title} className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">{g.title}</span>
            <span className="text-sm text-muted-foreground">
              {g.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
