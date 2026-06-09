import { SubmissionForm } from "@/components/submission/form"
import { SubmissionGuidelines } from "@/components/submission/guidelines"

export default function SubmitPostPage() {
  return (
    <section className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(16rem,1fr)] md:gap-12">
      <SubmissionForm />
      <SubmissionGuidelines />
    </section>
  )
}
