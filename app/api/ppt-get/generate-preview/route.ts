import { NextApiRequest, NextApiResponse } from "next"; // Typically for Next.js pages/app router, but using Request/Response for broader compatibility
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { number, z } from "zod";
import { max } from "drizzle-orm";

// --- Schemas for individual slide type parameters ---
const slideForIntroductionParams = z.object({
  title: z.string().describe("Main heading of the slide"),
  overview: z.string().describe("Sub-heading or overview text"),
  description: z.string().describe("Body copy/description below the overview"),
  bullets: z.array(z.string()).describe("List of bullet-point items"),
});

const SlideScaleOperationsParams = z.object({
  title: z.string().describe("Main heading of the slide"),
  quadrants: z.array(
    z
      .object({
        id: z.number().describe("Number to show inside the quadrant (1–4)"),
        heading: z.string().describe("Heading text for the quadrant"),
        description: z.string().describe("Description text for the quadrant"),
      })
      .describe("Four quadrant strategies to scale operations"),
  ),
});

const SlideBusinessFlowParams = z.object({
  title: z.string().describe("Title of the slide"),
  steps: z
    .array(
      z.object({
        iconSrc: z.string().describe("URL of the icon"),
        heading: z.string().describe("Step title"),
        description: z.string().describe("Step description"),
        color: z
          .string()
          .optional()
          .describe("Hex color used for this step's icon and title"),
      }),
    )
    .describe("Array of business flow steps"),
});

const SlideValidateIdeaParams = z.object({
  steps: z.array(
    z.object({
      number: z.number(),
      heading: z.string(),
      description: z.string(),
    }),
  ),
});

const slideConflictOverviewParams = z.object({
  title: z.string().describe("Main heading of the slide"),
  sections: z
    .array(
      z.object({
        iconSrc: z
          .string()
          .describe(
            "URL of the section icon. Generate a relevant placeholder if specific icon not known. E.g., 'placeholder_icon_cause.png', 'placeholder_icon_event.png'.",
          ),
        heading: z.string().describe("Section title"),
        contents: z
          .array(z.string())
          .describe("Array of paragraph or bullet texts for this section"),
      }),
    )
    .min(1)
    .max(4)
    .describe(
      "List of sections to display on the slide. Generate 3 to 4 sections.",
    ),
});

const slideCircularProcesssParams = z.object({
  title: z.string().describe("Main heading of the slide"),
  steps: z
    .array(
      z.object({
        heading: z.string().describe("Step title or strategy name"),
        description: z.string().describe("Detail or explanation of this step"),
      }),
    )
    .min(1)
    .max(8)
    .describe(
      "Ordered list of steps to display around the circle, numbered by their index. Min 1, Max 8 steps.",
    ),
});

const TimelineSlideParams = z.object({
  title: z.string().describe("Main presentation title"),
  subtitle: z.string().describe("Section subtitle e.g., HEADING of the ppt"),
  items: z.array(
    z.object({
      label: z.string().describe("Left column label (e.g., year, phase)"),
      title: z.string().describe("Main item title"),
      description: z.string().describe("Detailed description"),
    }),
  ),
});

const SlideLongTermStrategyParams = z.object({
  title: z.string().describe("Slide title"),
  quadrants: z
    .array(
      z.object({
        id: z.number().describe("Number to show inside the quadrant (1–4)"),
        heading: z.string().describe("Heading text for the quadrant"),
        description: z.string().describe("Description text for the quadrant"),
      }),
    )
    .min(2)
    .max(6)
    .describe("Four quadrant strategies for long-term growth"),
});

// --- Schema for a single generated slide (AI chooses one of these) ---
const individualGeneratedSlideSchema = z.discriminatedUnion("slideType", [
  z
    .object({
      slideType: z.literal("SlideForIntroduction"),
      originalRequestIndex: z
        .number()
        .describe(
          "The 0-based index of the original slide request this corresponds to.",
        ),
      arguments: slideForIntroductionParams,
    })
    .describe(
      "Best for opening/closing slides or when you need to present a clear hierarchy of information with a main message and supporting points. Choose this when the content is primarily text-based and needs a clear title-subtitle-bullets structure.",
    ),
  z
    .object({
      slideType: z.literal("SlideConflictOverview"),
      originalRequestIndex: z
        .number()
        .describe(
          "The 0-based index of the original slide request this corresponds to.",
        ),
      arguments: slideConflictOverviewParams,
    })
    .describe(
      "Use when information naturally falls into 3-4 distinct categories or themes. Perfect for comparing different aspects, showing problem-solution pairs, or organizing related concepts into clear groups. Each section supports multiple bullet points.",
    ),
  z
    .object({
      slideType: z.literal("SlideCircularProcesss"),
      originalRequestIndex: z
        .number()
        .describe(
          "The 0-based index of the original slide request this corresponds to.",
        ),
      arguments: slideCircularProcesssParams,
    })
    .describe(
      "Ideal for showing cyclical relationships, continuous processes, or iterative workflows. Best when your points represent steps that flow into each other or form a repeating cycle. Most effective for 4-6 interconnected elements that form a loop or cycle.",
    ),
  z
    .object({
      slideType: z.literal("SlideScaleOperations"),
      originalRequestIndex: z
        .number()
        .describe(
          "The 0-based index of the original slide request this corresponds to.",
        ),
      arguments: SlideScaleOperationsParams,
    })
    .describe(
      "Perfect for comparing four equal aspects or dimensions of a topic. Use when you need to show different facets of equal importance, like SWOT analysis, four pillars/principles, or key features. Each quadrant should represent a distinct but related concept.",
    ),
  z
    .object({
      slideType: z.literal("SlideBusinessFlow"),
      originalRequestIndex: z
        .number()
        .describe(
          "The 0-based index of the original slide request this corresponds to.",
        ),
      arguments: SlideBusinessFlowParams,
    })
    .describe(
      "Best for linear processes, step-by-step instructions, or sequential workflows. Use when your points represent a clear progression from start to finish. Ideal for showing transformations, procedures, or development stages with clear directionality.",
    ),
  z
    .object({
      slideType: z.literal("SlideValidateIdea"),
      originalRequestIndex: z
        .number()
        .describe(
          "The 0-based index of the original slide request this corresponds to.",
        ),
      arguments: SlideValidateIdeaParams,
    })
    .describe(
      "Effective for presenting key points alongside visual evidence or illustration. Use when you have 3 main points that benefit from a supporting image, like product features, methodology explanation, or concept validation. The right-side image adds visual context to your points.",
    ),
  z
    .object({
      slideType: z.literal("SlideLongTermStrategy"),
      originalRequestIndex: z
        .number()
        .describe(
          "The 0-based index of the original slide request this corresponds to.",
        ),
      arguments: SlideLongTermStrategyParams,
    })
    .describe(
      "Optimal for strategic planning and high-level conceptual frameworks. Use when presenting four interconnected strategic elements, like strategic pillars, core values, or key focus areas. Each quadrant should represent an essential component of the overall strategy.",
    ),
  z
    .object({
      slideType: z.literal("TimelineSlide"),
      originalRequestIndex: z
        .number()
        .describe(
          "The 0-based index of the original slide request this corresponds to.",
        ),
      arguments: TimelineSlideParams,
    })
    .describe(
      "Perfect for chronological sequences, historical progression, or phase-based planning. Use when your content has a clear temporal or sequential order, like project phases, historical events, or evolutionary stages. Best for showing progression over time or clear sequential stages.",
    ),
]);

// --- Schema for the overall AI output (an array of generated slides) ---
const allGeneratedSlidesSchema = z.object({
  generatedSlides: z
    .array(individualGeneratedSlideSchema)
    .describe(
      "An array of generated slide objects, one for each input slide request. The order of objects in this array MUST match the order of the input slide requests. Strive for variety in slideType choices across the array to create an engaging presentation.",
    ),
});

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.slides || !Array.isArray(body.slides) || body.slides.length === 0) {
    return Response.json(
      { error: "Missing or empty slides array in request body" },
      { status: 400 },
    );
  }

  const slideRequests = body.slides.map(
    (
      slideInfo: { title: string; bulletPoints: string[]; template: string },
      index: number,
    ) => ({
      index,
      title: slideInfo.title,
      bulletPoints: slideInfo.bulletPoints,
      template: slideInfo.template,
    }),
  );

  const prompt = `
You are an expert slide deck generation assistant. Your primary goal is to create a varied, engaging, and informative presentation based on the provided slide requests.
You will be given an array of 'slideRequests', each containing an 'index', a 'title', and 'bulletPoints'.
For each request in the input array, you must perform the following steps:
1. Carefully analyze the 'title' and 'bulletPoints' to understand the core message and structure of the information.
2. Choose the MOST appropriate slide type based on these specific content patterns:

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

IMPORTANT:
- Analyze each slide's content structure carefully before choosing a type
- No more than two consecutive slides should use the same type
- Each presentation should use at least 4 different slide types
- If content could fit multiple types, choose the less-used one
- Consider the presentation flow and visual variety

3. **Crucially, as you select a slide type for the current request, consider the slide types you have (notionally) selected for the *preceding* requests in this batch. Your objective is to achieve a balanced and diverse set of slide layouts throughout the entire deck. This variety is key to maintaining audience engagement.**
  4. If the content for multiple consecutive slides seems similar in nature, actively try to vary the slide type if different types can still effectively represent the information. Avoid defaulting to the same slide type repeatedly unless the content for several distinct slides overwhelmingly dictates that specific format. For instance, if three slides in a row could technically use 'SlideForIntroduction', consider if one could be 'SlideConflictOverview' if its points can be grouped into 3-4 themes, or if a different framing would allow another type.
  5. Based on the chosen slide type, generate the specific content (arguments) by intelligently interpreting the 'title' and 'bulletPoints'. Ensure all required fields for that slide type are populated and adhere strictly to all constraints specified in the schema (like the section count for SlideConflictOverview or step count for SlideCircularProcesss).
  6. Populate the 'originalRequestIndex' field in your output object with the 'index' from the corresponding input slide request. This is vital for maintaining order.
  7. The final 'generatedSlides' array in your output must contain one object for each input slide request, and these objects MUST be in the same sequential order as the input requests.

  Input slide requests to process:
  ${JSON.stringify(slideRequests, null, 2)}

  Think of yourself as designing a cohesive presentation. A good presentation uses a mix of layouts to tell a story and keep the audience interested. Before finalizing your full list of 'generatedSlides', mentally review your choices. If you notice a lack of variety or an over-reliance on one slide type, or if any generated slide type violates its specific constraints (like section count), please re-evaluate and correct your output to enhance the overall presentation quality and schema compliance.

  Generate the slide data strictly according to the 'allGeneratedSlidesSchema'.
  Pay close attention to all constraints defined in the schema for each slide type (e.g., number of sections for SlideConflictOverview, number of steps for SlideCircularProcesss).
  For 'iconSrc' in 'SlideConflictOverview', provide descriptive placeholders like 'icon_history.svg' or 'icon_breed.svg' as you did in the error example, if specific icons aren't implied by the content.
  `;

  try {
    const { object: aiOutput } = await generateObject({
      model: google("gemini-1.5-flash-8b"),
      schema: allGeneratedSlidesSchema,
      prompt: prompt,
    });
    console.log("AI output:", aiOutput);

    const sortedGeneratedSlides = aiOutput.generatedSlides.sort(
      (a, b) => a.originalRequestIndex - b.originalRequestIndex,
    );

    // Transform the AI's output into the desired API response format
    const responseSlides = sortedGeneratedSlides.map((genSlide) => {
      return {
        type: genSlide.slideType,
        content: genSlide.arguments,
      };
    });

    return Response.json({ slides: responseSlides });
  } catch (error) {
    console.error("Error generating slides:", error);
    console.log(error);
    return Response.json(
      { error: "Failed to generate slides." },
      { status: 500 },
    );
  }
}
