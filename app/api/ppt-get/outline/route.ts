import { streamObject } from "ai";
import { z } from "zod";
import { google } from "@ai-sdk/google";

const slideSchema = z.object({
  title: z.string().describe("Title of the slide"),
  bulletPoints: z.array(z.string()).describe("Key bullet points"),
  template: z
    .enum([
      "SlideForIntroduction",
      "SlideConflictOverview",
      "SlideCircularProcesss",
      "SlideScaleOperations",
      "SlideBusinessFlow",
      "SlideValidateIdea",
      "SlideLongTermStrategy",
      `TimelineSlide`,
    ])
    .describe("Template of the slide"),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "Artificial Intelligence";
  const language = searchParams.get("language");
  const cards = searchParams.get("cards");
  const { elementStream } = streamObject({
    model: google("gemini-1.5-flash"),
    prompt: `Create an outline for a presentation on "${topic}". Include slide titles and bullet points. Number of slides to generate = ${cards}, language = ${language}
            each slide must use one of these templates:

            - Use "SlideForIntroduction" when:
              * Content is an overview or introduction
              * Information has a clear title with supporting points
              * Content needs a hierarchical structure
              * It's the first or last slide of a section

            - Use "SlideConflictOverview" when:
              * Content naturally divides into 3-4 distinct themes
              * You need to compare different aspects
              * Information shows multiple perspectives
              * Points can be grouped into categories

            - Use "SlideCircularProcesss" when:
              * Content describes a repeating cycle
              * Steps flow into each other
              * Process is continuous or iterative
              * You have 4-6 interconnected elements
              * Topics show cause-and-effect relationships

            - Use "SlideScaleOperations" when:
              * Content presents exactly four equal aspects
              * Information fits a quadrant format (SWOT, 4Ps)
              * Topics are balanced in importance
              * You need to show different dimensions

            - Use "SlideBusinessFlow" when:
              * Content shows a linear progression
              * Steps have a clear sequence
              * Process moves from start to finish
              * Information shows transformation stages

            - Use "SlideValidateIdea" when:
              * You have exactly 3 main points
              * Content benefits from visual support
              * Topics need side-by-side comparison
              * Points require detailed explanation

            - Use "SlideLongTermStrategy" when:
              * Content involves strategic planning
              * Information shows four core elements
              * Topics are interconnected pillars
              * Points represent key focus areas

            - Use "TimelineSlide" when:
              * Content has chronological order
              * Information shows progression
              * Topics are phase-based
              * Points represent historical events

              you must make sure that you keep the variety of slide templates, in outline, dont use same template more than thrice!!

              `,

    schema: slideSchema,
    output: "array",
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const slide of elementStream) {
        const chunk = encoder.encode(JSON.stringify({ ...slide }) + "\n");
        controller.enqueue(chunk);
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked",
    },
  });
}
