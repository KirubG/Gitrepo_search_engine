import { GoogleGenerativeAI } from "@google/generative-ai"
import type { GitHubRepository } from "./github"

export async function enhanceWithGemini(
  repositories: GitHubRepository[],
  searchQuery: string,
): Promise<GitHubRepository[]> {
  // Check if API key is available
  if (!process.env.GOOGLE_AI_API_KEY) {
    console.warn("GOOGLE_AI_API_KEY not found, falling back to mock implementation")
    return fallbackEnhancement(repositories, searchQuery)
  }

  try {
    // Initialize Google Generative AI with your API key
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY)

    // For Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    // Process each repository
    const enhancedRepos = await Promise.all(
      repositories.map(async (repo) => {
        // Create a prompt for the AI
        const prompt = `
          Repository: ${repo.full_name}
          Description: ${repo.description || "No description"}
          Language: ${repo.language || "Not specified"}
          Stars: ${repo.stargazers_count}
          Forks: ${repo.forks_count}
          Topics: ${repo.topics?.join(", ") || "None"}

          User search query: "${searchQuery}"

          Task 1: On a scale of 1-10, how relevant is this repository to the search query? Provide just the number.
          Task 2: Write a brief 1-2 sentence summary explaining why this repository might be useful for someone searching for "${searchQuery}".
        `

        try {
          // Call Gemini API
          const result = await model.generateContent(prompt)
          const text = result.response.text()

          // Parse the response
          const scoreMatch = text.match(/Task 1:?\s*(\d+(?:\.\d+)?)/i)
          const summaryMatch = text.match(/Task 2:?\s*(.*)/is)

          const aiRelevanceScore = scoreMatch ? Number.parseFloat(scoreMatch[1]) : undefined
          const aiSummary = summaryMatch ? summaryMatch[1].trim() : undefined

          return {
            ...repo,
            aiRelevanceScore,
            aiSummary,
          }
        } catch (error) {
          console.error(`Error generating AI content for ${repo.full_name}:`, error)
          return {
            ...repo,
            aiRelevanceScore: undefined,
            aiSummary: undefined,
          }
        }
      }),
    )

    // Sort by relevance score
    return enhancedRepos.sort((a, b) => (b.aiRelevanceScore || 0) - (a.aiRelevanceScore || 0))
  } catch (error) {
    console.error("Error initializing Gemini:", error)
    return fallbackEnhancement(repositories, searchQuery)
  }
}

// Fallback implementation in case the API key is missing or there's an error
function fallbackEnhancement(repositories: GitHubRepository[], searchQuery: string): GitHubRepository[] {
  return repositories
    .map((repo) => {
      // Calculate a mock relevance score based on stars and query match
      const nameMatch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 0.5 : 0
      const descMatch = repo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ? 0.3 : 0
      const normalizedStars = Math.min(repo.stargazers_count / 10000, 1) * 0.2

      const aiRelevanceScore = Number.parseFloat(((nameMatch + descMatch + normalizedStars) * 10).toFixed(1))

      // Generate a mock AI summary
      const aiSummary = generateMockSummary(repo, searchQuery)

      return {
        ...repo,
        aiRelevanceScore,
        aiSummary,
      }
    })
    .sort((a, b) => (b.aiRelevanceScore || 0) - (a.aiRelevanceScore || 0))
}

/**
 * Generate a mock AI summary for a repository
 * Used as fallback when the Gemini API is unavailable
 */
function generateMockSummary(repo: GitHubRepository, query: string): string {
  const summaries = [
    `This repository appears to be a good match for "${query}". It has ${repo.stargazers_count.toLocaleString()} stars and is actively maintained.`,
    `A popular ${repo.language || "multi-language"} project related to your search for "${query}". It's been forked ${repo.forks_count.toLocaleString()} times.`,
    `This ${repo.language || "project"} repository matches your search criteria and has a strong community with ${repo.stargazers_count.toLocaleString()} stars.`,
    `Based on your search for "${query}", this repository offers relevant functionality and is regularly updated.`,
    `This project aligns with your interest in "${query}" and has gained significant traction in the open source community.`,
  ]

  // Select a random summary
  const randomIndex = Math.floor(Math.random() * summaries.length)
  return summaries[randomIndex]
}
