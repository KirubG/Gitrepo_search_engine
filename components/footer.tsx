import { Github, Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} GitHub Repository Finder</p>
        </div>

        <nav className="flex gap-4">
          <Link
            href="/privacy"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
          >
            Privacy
          </Link>
          <Link href="/terms" className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline">
            Terms
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
          >
            GitHub
          </Link>
        </nav>
      </div>
    </footer>
  )
}
