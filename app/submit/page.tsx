import { SubmissionForm } from "@/components/submission/form"
import { SubmissionGuidelines } from "@/components/submission/guidelines"

export default function SubmitPostPage() {
  return (
    <section className="flex flex-col gap-8 md:flex-row">
      <SubmissionForm />
      <SubmissionGuidelines />
    </section>
  )
}
