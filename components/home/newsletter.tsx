export function Newsletter() {
  return (
    <div id="join" className="border-t border-border py-16 text-center">
      <h2 className="font-header mb-2 text-3xl font-black">
        {"Stay in the loop."}
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        {"Quarterly. No spam. 8,400 readers."}
      </p>
      <form className="mx-auto flex max-w-sm gap-3">
        <input
          type="email"
          placeholder="your@email.com"
          className="flex-1 rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="shrink-0 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          {"Subscribe"}
        </button>
      </form>
    </div>
  )
}
