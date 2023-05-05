// NOTE: NOT IN USE - JUST STASHING THIS

// ---
interface Props {
  tone: 'funny' | 'serious' | 'sarcastic'
  numTweets?: number
  transcript: string
}

// Simulates another compiled prompt file (would be its own file and imported here as `import TopicsPrompt from './topics.prompt'`)
// NOTE: This one returns a string[], thinking we may wont some sort of `postprocess()` function that can transform the LLM result into anything it wants
// but we'd have to figure out how to get the typescript language server to see the return type of the `postprocess()` function. I think it's possible, but not sure.
import TopicsPrompt from './topics.prompt'
// async function TopicsPrompt(_transcript: string): Promise<string[]> {
//   await new Promise((resolve) => setTimeout(resolve, 1000))
//   return ['topic1', 'topic2']
// }3

export async function render(props: Props) {
  // Do whatever, including calling other prompts
  const topics = await TopicsPrompt(props.transcript)

  return {
    ...props,
    topics,
  }
}

// ---

export const template = `You are a <%= tone %> marketing copywriter. Given the following conversation I had, come up with <%= numTweets %> interesting statements that I can share on social media.
<%- if (topics && topics.length > 0) { %>
Make sure to focus on the following sub-topics:
"""
<% topics.forEach((topic) => { %>
  - <%= topic %>
<% }) %>
"""
<%- } %>

Conversation:
"""
<%= transcript %>
"""

Use these rules to guide your writing:
- Place each tweet on a new line and number them
- Do not use hash tags
- Do not refer to the conversation
- When in doubt, you can pull a direct quote from the conversation that's interesting and relevant
- Keep it under 100 words

Tweets:

1.
`
