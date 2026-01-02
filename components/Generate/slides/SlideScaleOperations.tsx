import React from "react";
import { tool } from "ai";
import { z } from "zod";
import PptxGenJS from "pptxgenjs";

export const SlideScaleOperationsTool = tool({
  description:
    "Create a quadrant-style 'Scale Your Operations' slide with four strategies including headings, descriptions, and center-aligned numbers.",
  parameters: z.object({
    title: z.string().describe("Slide title"),
    quadrants: z
      .array(
        z.object({
          id: z.number().describe("Number to show inside the quadrant (1–4)"),
          heading: z.string().describe("Heading text for the quadrant"),
          description: z.string().describe("Description text for the quadrant"),
        })
      )
      .length(4)
      .describe("Four quadrant strategies to scale operations"),
  }),
});

type SlideProps = z.infer<typeof SlideScaleOperationsTool.parameters>;
type sudoSlideProps = SlideProps & {
  backgroundColor: string;
  headingColor: string;
  subHeadingColor: string;
  bulletColor: string;
};

export const SlideScaleOperations: React.FC<sudoSlideProps> = ({
  title,
  quadrants,
  backgroundColor = "#f5f0e6",
  headingColor = "#1f433e",
  subHeadingColor = "#1f433e",
  bulletColor = "#1f433e",
}) => {
  // Ensure we have exactly 4 quadrants
  const safeQuadrants = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    heading: quadrants[index]?.heading || `Strategy ${index + 1}`,
    description: quadrants[index]?.description || "Description pending...",
  }));

  return (
    <div
      className="flex flex-col items-center gap-6 px-8 py-12 rounded-xl shadow-lg"
      style={{
        height: "450px",
        width: "1000px",
        maxWidth: "1050px",
        margin: "0 auto",
        backgroundColor: backgroundColor,
        color: headingColor,
      }}
    >
      <h1 className="text-3xl font-semibold mb-4">{title}</h1>
      <div className="grid grid-cols-3 gap-6 max-w-4xl">
        {/* Left top */}
        <div className="flex flex-col justify-center items-end pr-6 text-right">
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: headingColor }}
          >
            {safeQuadrants[0].heading}
          </h2>
          <p
            className="text-sm leading-snug"
            style={{ color: subHeadingColor }}
          >
            {safeQuadrants[0].description}
          </p>
        </div>

        {/* Center quadrant numbers */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 place-items-center">
          {safeQuadrants.map((q) => (
            <div
              key={q.id}
              className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold transition-transform hover:scale-110 duration-300"
              style={{
                backgroundColor: bulletColor,
                color: "#ffffff",
                boxShadow: `0 4px 12px ${bulletColor}40`,
              }}
            >
              {q.id}
            </div>
          ))}
        </div>

        {/* Right top */}
        <div className="flex flex-col justify-center items-start pl-6 text-left">
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: headingColor }}
          >
            {safeQuadrants[1].heading}
          </h2>
          <p
            className="text-sm leading-snug"
            style={{ color: subHeadingColor }}
          >
            {safeQuadrants[1].description}
          </p>
        </div>

        {/* Left bottom */}
        <div className="flex flex-col justify-center items-end pr-6 text-right">
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: headingColor }}
          >
            {safeQuadrants[2].heading}
          </h2>
          <p
            className="text-sm leading-snug"
            style={{ color: subHeadingColor }}
          >
            {safeQuadrants[2].description}
          </p>
        </div>

        <div className="hidden" />

        {/* Right bottom */}
        <div className="flex flex-col justify-center items-start pl-6 text-left">
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: headingColor }}
          >
            {safeQuadrants[3].heading}
          </h2>
          <p
            className="text-sm leading-snug"
            style={{ color: subHeadingColor }}
          >
            {safeQuadrants[3].description}
          </p>
        </div>
      </div>
    </div>
  );
};

export function generateSlideScaleOperations(
  pptx: PptxGenJS,
  data: sudoSlideProps
) {
  const {
    title,
    quadrants,
    backgroundColor = "#f5f0e6",
    headingColor = "#1f433e",
    subHeadingColor = "#1f433e",
    bulletColor = "#1f433e",
  } = data;

  const slide = pptx.addSlide();
  slide.background = { color: backgroundColor };

  // Updated Layout constants with 10% size reduction
  const LAYOUT = {
    marginX: 0.45,
    marginY: 0.45,
    titleSpacing: 0.9,
    circleSize: 0.9,
    circleGap: 1.2,
    textWidth: 2.7,
  };

  // Add main title with reduced size
  slide.addText(title, {
    x: 0,
    y: 0.7,
    w: 10,
    h: 0.7,
    fontSize: 32,
    bold: true,
    color: headingColor,
    align: "center",
  });

  // Create safe quadrants array to handle missing data
  const safeQuadrants = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    heading: quadrants[index]?.heading || `Strategy ${index + 1}`,
    description: quadrants[index]?.description || "Description pending...",
  }));

  const positions = [
    { x: 0.5, y: 2.0, align: "right" }, //top left
    { x: 6.5, y: 2.0, align: "left" }, //top right
    { x: 0.5, y: 3.6, align: "right" }, //bottom left
    { x: 6.5, y: 3.6, align: "left" }, //bottom right
  ];

  // Add quadrant text with content from LLM
  safeQuadrants.forEach((quadrant, idx) => {
    // Add heading
    slide.addText(quadrant.heading, {
      x: positions[idx].x,
      y: positions[idx].y,
      w: LAYOUT.textWidth,
      h: 0.36,
      fontSize: 14,
      color: headingColor,
      bold: true,
      align: positions[idx].align as "left" | "right",
    });

    // Add description
    slide.addText(quadrant.description, {
      x: positions[idx].x,
      y: positions[idx].y + 0.36,
      w: LAYOUT.textWidth,
      h: 0.45,
      fontSize: 12,
      color: subHeadingColor,
      align: positions[idx].align as "left" | "right",
      breakLine: true,
      wrap: true,
    });
  });

  // Updated circle positions with more centered placement
  const circles = [
    { x: 3.6, y: 2, number: "1" },
    { x: 5.3, y: 2, number: "2" },
    { x: 3.6, y: 3.6, number: "3" },
    { x: 5.3, y: 3.6, number: "4" },
  ];

  // Add numbered circles
  circles.forEach((circle) => {
    // Add circle shape
    slide.addShape(pptx.ShapeType.ellipse, {
      x: circle.x,
      y: circle.y,
      w: LAYOUT.circleSize,
      h: LAYOUT.circleSize,
      fill: { color: bulletColor },
    });

    // Add number
    slide.addText(circle.number, {
      x: circle.x,
      y: circle.y + 0.22,
      w: LAYOUT.circleSize,
      h: LAYOUT.circleSize - 0.45,
      fontSize: 18,
      bold: true,
      color: "#FFFFFF",
      align: "center",
      valign: "middle",
    });
  });

  return slide;
}

export default SlideScaleOperations;
