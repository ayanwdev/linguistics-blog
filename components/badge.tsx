export function Badge({ name }: { name: string }) {
  return (
    <span className="mr-1 bg-foreground/50 px-1 font-mono text-sm text-background">
      {name.toUpperCase()}
    </span>
  )
}
