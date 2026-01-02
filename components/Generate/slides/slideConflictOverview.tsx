import React from "react";
import { z } from "zod";
import { tool } from "ai";
import { useFirstPexelsImage } from "@/components/ui/pixelsPhoto";
import { Rows } from "lucide-react";
import PptxGenJS from "pptxgenjs";

export const SlideConflictOvervieww = tool({
  description:
    "Generate a slide with a full-width header image, a main title, and a flexible grid of informational sections (each with an icon, subheading, and content). Ideal for historical or thematic overviews divided into Causes, Key Events, Outcomes, etc., with customizable color theming.",
  parameters: z.object({
    imageSrc: z.string().describe("URL of the main slide image"),
    title: z.string().describe("Main heading of the slide"),
    sections: z
      .array(
        z.object({
          iconSrc: z.string().describe("URL of the section icon"),
          heading: z.string().describe("Section title"),
          contents: z
            .array(z.string())
            .describe("Array of paragraph or bullet texts for this section"),
        })
      )
      .describe("List of sections to display on the slide"),
  }),
});

export const SlideTemplateSchema = SlideConflictOvervieww.parameters;

type Section = z.infer<typeof SlideTemplateSchema>["sections"][number];
type SlideTemplateProps = z.infer<typeof SlideTemplateSchema>;

interface StyleProps {
  backgroundColor?: string;
  headingColor?: string;
  subHeadingColor?: string;
  bulletColor?: string;
}

type Props = SlideTemplateProps & StyleProps;

export const SlideConflictOverview: React.FC<Props> = ({
  imageSrc,
  title,
  sections,
  backgroundColor = "#f5f0e6",
  headingColor = "#1f433e",
  subHeadingColor = "#1f433e",
  bulletColor = "#1f433e",
}) => {
  const { photo, error, refresh } = useFirstPexelsImage(title, {
    refreshInterval: 0,
  });

  return (
    <div
      style={{
        height: "450px",
        width: "1000px",
        maxWidth: "1050px",
        margin: "0 auto",
        fontFamily: "Georgia, serif",
        backgroundColor,
        color: headingColor,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
      {/* Top Image Area */}
      <div
        style={{
          height: "250px",
          width: "100%",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={photo?.src?.landscape || imageSrc}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Bottom Content Area */}
      <div
        style={{
          flex: 1,
          padding: "1.5rem",
          backgroundColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "1rem",
            color: headingColor,
          }}
        >
          {title}
        </h1>

        {/* Section Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${sections.length}, 1fr)`,
            gap: "1.5rem",
          }}
        >
          {sections.map((sec, idx) => (
            <div key={idx}>
              <img
                src="/AI-PDF/check.png"
                alt={`${sec.heading} icon`}
                style={{
                  width: "24px",
                  height: "24px",
                  marginBottom: "0.5rem",
                  background: "#e8e2d8",
                  padding: "4px",
                  borderRadius: "4px",
                }}
              />
              <h2
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.25rem",
                  color: subHeadingColor,
                }}
              >
                {sec.heading}
              </h2>
              <div style={{ fontSize: "0.95rem", color: bulletColor }}>
                {sec.contents.map((line, i) => (
                  <p key={i} style={{ margin: "0.25rem 0" }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export function generateConflictOverviewSlide(pptx: PptxGenJS, data: Props) {
  const {
    imageSrc,
    title,
    sections,
    backgroundColor = "#f5f0e6",
    headingColor = "#1f433e",
    subHeadingColor = "#1f433e",
    bulletColor = "#1f433e",
  } = data;

  const slide = pptx.addSlide();
  slide.background = { color: backgroundColor };

  // Add header image
  if (imageSrc) {
    slide.addImage({
      path: imageSrc,
      x: 0,
      y: 0,
      w: 10,
      h: 2.5,
    });
  }

  // Add title
  slide.addText(title, {
    x: 0.5,
    y: 2.7,
    w: 9.0,
    fontSize: 24,
    color: headingColor,
    bold: true,
    align: "left",
  });

  // Layout setup
  const numSections = sections.length;
  const sectionWidth = 9.0 / numSections;
  const startY = 3.5;
  const contentPadding = 0.2;

  sections.forEach((section, index) => {
    const xPos = 0.5 + index * sectionWidth;
    let yPos = startY;

    // Section heading
    slide.addText(section.heading, {
      x: xPos,
      y: yPos,
      w: sectionWidth - contentPadding,
      fontSize: 16,
      color: subHeadingColor,
      bold: true,
      align: "left",
    });
    yPos += 0.5;

    // Section bullets
    const formattedBullets = section.contents.map((content) => `• ${content}`);

    slide.addText(formattedBullets.join("\n"), {
      x: xPos,
      y: yPos,
      w: sectionWidth - contentPadding,
      fontSize: 11,
      color: bulletColor,
      lineSpacing: 16,
      breakLine: true,
      align: "left",
      bullet: { type: "bullet" },
      valign: "top",
    });
  });
}
export default SlideConflictOverview;
