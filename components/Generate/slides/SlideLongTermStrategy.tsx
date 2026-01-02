import React from "react";
import { tool } from "ai";
import { z } from "zod";
import PptxGenJS from "pptxgenjs";

export const SlideLongTermStrategyTool = tool({
  description:
    "Create a quadrant-style 'Long-Term Strategy' slide with four strategies including headings, descriptions, and center-aligned numbers.",
  parameters: z.object({
    title: z.string().describe("Slide title"),
    quadrants: z
      .array(
        z.object({
          id: z.number().describe("Number to show inside the quadrant (1–4)"),
          heading: z.string().describe("Heading text for the quadrant"),
          description: z.string().describe("Description text for the quadrant"),
        }),
      )
      .length(4)
      .describe("Four quadrant strategies for long-term growth"),
  }),
});

type SlideProps = z.infer<typeof SlideLongTermStrategyTool.parameters>;
type sudoSlideProps = SlideProps & {
  backgroundColor?: string;
  headingColor?: string;
  subHeadingColor?: string;
  bulletColor?: string;
};

// React component after the generate function
export const SlideLongTermStrategy: React.FC<sudoSlideProps> = ({
  title,
  quadrants,
  backgroundColor = "#fffbe6",
  headingColor = "#0f172a",
  subHeadingColor = "#334155",
  bulletColor = "#2563eb",
}) => {
  return (
    <div
      className="flex flex-col items-center px-10 py-8 rounded-xl"
      style={{
        height: "450px",
        width: "1000px",
        maxWidth: "1050px",
        margin: "0 auto",
        backgroundColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${bulletColor} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <h1
          className="text-3xl font-bold text-center mb-12"
          style={{ color: headingColor }}
        >
          {title}
        </h1>

        <div className="grid grid-cols-2 gap-x-12 gap-y-8 flex-1 px-4">
          {quadrants.map((q) => (
            <div
              key={q.id}
              className="flex items-start space-x-6 p-6 rounded-lg hover:bg-white/50 transition-colors duration-300"
              style={{
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110 duration-300"
                style={{
                  backgroundColor: bulletColor,
                  boxShadow: `0 4px 12px ${bulletColor}40`,
                }}
              >
                <span className="text-xl font-bold text-white">{q.id}</span>
              </div>

              <div className="flex-1">
                <h2
                  className="text-xl font-semibold mb-2 leading-tight"
                  style={{ color: headingColor }}
                >
                  {q.heading}
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: subHeadingColor }}
                >
                  {q.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export function generateLongTermStrategySlide(
  pptx: PptxGenJS,
  data: sudoSlideProps,
) {
  const {
    title,
    quadrants,
    backgroundColor = "#fffbe6",
    headingColor = "#0f172a",
    subHeadingColor = "#334155",
    bulletColor = "#2563eb",
  } = data;

  const slide = pptx.addSlide();

  // Background with pattern
  slide.background = { color: backgroundColor };

  // Title
  slide.addText(title, {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.8,
    fontSize: 32,
    color: headingColor,
    bold: true,
    align: "center",
  });

  // Quadrant layout
  const startY = 1.2;
  const quadrantWidth = 4.4;
  const quadrantHeight = 1.7;
  const padding = 0.3;

  quadrants.forEach((quadrant, index) => {
    const row = Math.floor(index / 2);
    const col = index % 2;
    const xPos = 0.5 + col * (quadrantWidth + padding);
    const yPos = startY + row * (quadrantHeight + padding);

    slide.addShape(pptx.ShapeType.ellipse, {
      x: xPos + 0.1,
      y: yPos + 0.5,
      w: 0.5,
      h: 0.5,
      fill: { color: bulletColor },
      line: { color: bulletColor },
      shadow: { type: "outer", blur: 3, offset: 1, angle: 45, opacity: 0.3 },
    });

    // Smaller number text
    slide.addText(quadrant.id.toString(), {
      x: xPos + 0.1,
      y: yPos + 0.5,
      w: 0.5,
      h: 0.5,
      fontSize: 16,
      color: "FFFFFF",
      bold: true,
      align: "center",
      valign: "middle",
    });

    slide.addText(quadrant.heading, {
      x: xPos + 0.7,
      y: yPos + 0.28, // align with circle
      w: quadrantWidth - 0.9,
      h: 0.5,
      fontSize: 18,
      color: headingColor,
      bold: true,
    });

    // Description closer to heading
    slide.addText(quadrant.description, {
      x: xPos + 0.7,
      y: yPos + 0.38, // just below heading
      w: quadrantWidth - 0.9,
      h: 1.2,
      fontSize: 12,
      color: subHeadingColor,
      breakLine: true,
      lineSpacing: 16,
      align: "left",
    });
  });

  return slide;
}

export default SlideLongTermStrategy;
