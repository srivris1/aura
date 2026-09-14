import { streamText } from 'ai';
import { google } from '@ai-sdk/google';


export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-1.5-pro'),
    messages,
    system: `You are Aura, an advanced AI programming assistant. 
When asked to build a UI component, return the code enclosed in a block like this:
\`\`\`tsx
export default function Component() {
  return <div>Hello World</div>;
}
\`\`\`
Focus on returning functional, beautiful Tailwind CSS components. Keep explanations concise.`,
  });

  return result.toTextStreamResponse();
}
