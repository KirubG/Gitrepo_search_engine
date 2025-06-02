// GitHub API types
export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string
  language: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
  // AI-enhanced properties
  aiRelevanceScore?: number
  aiSummary?: string
}

interface GitHubSearchResponse {
  total_count: number
  incomplete_results: boolean
  items: GitHubRepository[]
}

/**
 * Search for repositories on GitHub
 */
export async function searchRepositories(
  query: string,
  language?: string,
  sort = "stars",
): Promise<GitHubRepository[]> {
  // Build the search query
  let searchQuery = query
  if (language && language !== "any") {
    searchQuery += ` language:${language}`
  }

  // GitHub API URL with parameters
  const url = new URL("https://api.github.com/search/repositories")
  url.searchParams.append("q", searchQuery)
  url.searchParams.append("sort", sort)
  url.searchParams.append("per_page", "10")

  try {
    // Prepare headers
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    }

    // Add GitHub token if available
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`
    }

    // Fetch data from GitHub API
    const response = await fetch(url.toString(), {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data: GitHubSearchResponse = await response.json()
    return data.items
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error)
    return []
  }
}

/**
 * Get repository details by owner and repo name
 */
export async function getRepositoryDetails(owner: string, repo: string): Promise<GitHubRepository | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching repository details:", error)
    return null
  }
}
