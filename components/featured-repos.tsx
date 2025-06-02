import { Github, Star, GitFork } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Featured repositories data
const featuredRepos = [
  {
    id: 1,
    name: "vercel/next.js",
    description: "The React Framework for the Web. The platform for building full-stack React applications.",
    stars: 115000,
    forks: 24800,
    language: "JavaScript",
    topics: ["react", "framework", "javascript", "typescript", "ssr"],
    url: "https://github.com/vercel/next.js",
  },
  {
    id: 2,
    name: "facebook/react",
    description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    stars: 213000,
    forks: 44500,
    language: "JavaScript",
    topics: ["ui", "javascript", "library", "frontend"],
    url: "https://github.com/facebook/react",
  },
  {
    id: 3,
    name: "microsoft/vscode",
    description:
      "Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.",
    stars: 152000,
    forks: 26700,
    language: "TypeScript",
    topics: ["editor", "development", "typescript", "microsoft"],
    url: "https://github.com/microsoft/vscode",
  },
]

export function FeaturedRepos() {
  return (
    <section id="featured" className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Repositories</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore some of the most popular open source projects on GitHub
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          {featuredRepos.map((repo) => (
            <Link href={repo.url} key={repo.id} target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Github className="h-5 w-5" />
                    <span className="line-clamp-1">{repo.name}</span>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{repo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{repo.language}</Badge>
                    {repo.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{repo.stars.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks.toLocaleString()}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
