import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { email } from "@/lib/constants"

export function EmailButton() {
  return (
    <Sheet>
      <SheetTrigger asChild className="w-full">
        <Button type="button" variant={"secondary"} className="w-full">
          {"or just email us your article"}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="mx-auto max-w-7xl">
        <SheetHeader>
          <SheetTitle className="font-sans">Guidelines</SheetTitle>
          <SheetDescription>
            <div>
              Please follow our guidelines before sending an email to{" "}
              <Link
                className="text-blue-500"
                href={`mailto:${email.name}@${email.domain}`}
                target="_blank"
              >
                {`${email.name}[at]${email.domain}`}
              </Link>
            </div>
            <ul className="mt-2">
              <li>waba</li>
              <li>daba</li>
              <li>dub</li>
              <li>dub</li>
            </ul>
          </SheetDescription>
          <Button
            type="button"
            className="w-full"
            onClick={() =>
              window.open(`mailto:${email.name}@${email.domain}`, "_blank")
            }
          >
            {"Open Email"}
          </Button>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
