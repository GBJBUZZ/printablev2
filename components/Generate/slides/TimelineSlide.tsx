import React from "react";
import { tool } from "ai";
import { z } from "zod";
import PptxGenJS from "pptxgenjs";

export const TimelineSlideTool = tool({
  description: "Create a vertical timeline slide for various content types",
  parameters: z.object({
    title: z.string().describe("Main presentation title"),
    subtitle: z
      .string()
      .describe("Section subtitle e.g., EDUCATION, WORK EXPERIENCE"),
    items: z.array(
      z.object({
        label: z.string().describe("Left column label (e.g., year, phase)"),
        title: z.string().describe("Main item title"),
        description: z.string().describe("Detailed description"),
      }),
    ),
  }),
});

type TimelineSlideProps = z.infer<typeof TimelineSlideTool.parameters> & {
  headingColor?: string;
  subHeadingColor?: string;
  bulletColor?: string;
  titleSize?: string;
  spacing?: string;
  backgroundColor?: string;
};

export const TimelineSlide: React.FC<TimelineSlideProps> = ({
  title,
  subtitle,
  items,
  headingColor = "#0f172a", // matched with SlideLongTermStrategy headingColor
  subHeadingColor = "#334155", // matched with SlideLongTermStrategy subHeadingColor
  bulletColor = "#2563eb", // matched with SlideLongTermStrategy bulletColor
  titleSize = "text-6xl",
  backgroundColor = "#fffbe6", // matched with SlideLongTermStrategy backgroundColor
  spacing = "space-y-6",
}) => {
  return (
    <div
      className="flex flex-col h-[450px] w-[1000px] rounded-2xl shadow-2xl p-10"
      style={{
        backgroundColor: backgroundColor, // matched with SlideLongTermStrategy backgroundColor
      }}
    >
      {/* Header Section */}
      <div className="mb-12">
        <p className="text-sm mb-1" style={{ color: subHeadingColor }}>
          {subtitle}
        </p>
        <h1
          className={`${titleSize} font-extrabold tracking-tight`}
          style={{ color: headingColor }}
        >
          {title}
        </h1>
      </div>

      {/* Content Area */}
      <div
        className={`flex-1 flex gap-6 justify-between items-start ${spacing}`}
      >
        {items.map((item, index) => (
          <div key={index} className="w-1/3">
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: bulletColor }}
            >
              {item.label}
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: subHeadingColor }} // Changed from text-gray-300 to match subHeadingColor
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export function generateTimelineSlide(
  pptx: PptxGenJS,
  data: TimelineSlideProps,
) {
  const {
    title,
    subtitle,
    items,
    headingColor = "#0f172a",
    subHeadingColor = "#334155",
    bulletColor = "#2563eb",
  } = data;

  const slide = pptx.addSlide();

  // Set slide background
  slide.background = { color: "#fffbe6" };

  // Add subtitle
  slide.addText(subtitle, {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.4,
    fontSize: 16,
    color: subHeadingColor,
    align: "left",
  });

  // Add main title
  slide.addText(title, {
    x: 0.5,
    y: 1.0,
    w: 9,
    h: 0.8,
    fontSize: 32,
    bold: true,
    color: headingColor,
    align: "left",
  });

  // Calculate positions for items
  const startX = 0.5;
  const totalWidth = 9;
  const itemWidth = totalWidth / 3; // Divide into 3 equal parts
  const contentStartY = 2.2;

  // Add timeline items
  items.forEach((item, idx) => {
    const x = startX + idx * itemWidth;

    // Add year/phase label
    slide.addText(item.label, {
      x: x,
      y: contentStartY,
      w: itemWidth - 0.2, // Slight gap between columns
      h: 0.3,
      fontSize: 14,
      bold: true,
      color: bulletColor,
      align: "left",
    });

    // Add description
    slide.addText(item.description, {
      x: x,
      y: contentStartY - 0.1,
      w: itemWidth - 0.2,
      h: 2,
      fontSize: 12,
      color: subHeadingColor,
      align: "left",
      breakLine: true,
      wrap: true,
      lineSpacing: 16,
    });
  });

  return slide;
}

export default TimelineSlide;
