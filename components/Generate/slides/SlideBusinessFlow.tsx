import React from "react";
import { z } from "zod";
import { tool } from "ai";
import PptxGenJS from "pptxgenjs";

export const SlideFlow = tool({
  description:
    "Generate a horizontal business process flow slide with circular icons, headings, and descriptions for each stage like Business, Process, Target, Growth, Profit.",
  parameters: z.object({
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
        })
      )
      .describe("Array of business flow steps"),
  }),
});

export const SlideFlowSchema = SlideFlow.parameters;

export type Props = z.infer<typeof SlideFlowSchema>;
export type sudoProps = Props & {
  backgroundColor: string;
  headingColor: string;
  subHeadingColor: string;
};

export const SlideBusinessFlow: React.FC<sudoProps> = ({
  title,
  steps,
  backgroundColor = "#f5f0e6",
  headingColor = "#1f433e",
  subHeadingColor = "#1f433e",
}) => {
  return (
    <div
      style={{
        height: "450px",
        width: "1000px",
        maxWidth: "1050px",
        margin: "0 auto",
        padding: "2rem 1rem",
        fontFamily: "Arial, sans-serif",
        backgroundColor: backgroundColor,
        color: headingColor,
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "1.75rem",
          marginBottom: "2rem",
          color: headingColor,
        }}
      >
        {title}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        {steps.map((step, idx) => (
          <div
            key={idx}
            style={{
              flex: "1 1 150px",
              minWidth: "150px",
              maxWidth: "180px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                backgroundColor: headingColor,
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                margin: "0 auto 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={step.iconSrc}
                alt=""
                style={{ width: "28px", height: "28px" }}
              />
            </div>
            <h3
              style={{
                color: headingColor,
                marginBottom: "0.5rem",
                fontSize: "1.1rem",
              }}
            >
              {step.heading}
            </h3>
            <p style={{ fontSize: "0.9rem", color: subHeadingColor ?? "#555" }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export function generateBusinessFlowSlide(pptx: PptxGenJS, data: sudoProps) {
  const {
    title,
    steps,
    backgroundColor = "#f5f0e6",
    headingColor = "#1f433e",
    subHeadingColor = "#1f433e",
  } = data;

  const slide = pptx.addSlide();
  slide.background = { color: backgroundColor };

  // Add title - matching h1 styles from React component
  slide.addText(title, {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.8,
    fontSize: 28, // equivalent to 1.75rem
    bold: true,
    align: "center",
    color: headingColor,
    margin: 32, // equivalent to 2rem marginBottom
  });

  // Calculate positions for steps - matching the flex layout
  const startX = 0.5;
  const totalWidth = 9;
  const stepWidth = totalWidth / steps.length;
  const stepGap = 0.24; // equivalent to 1.5rem gap

  // Add each step
  steps.forEach((step, idx) => {
    const x = startX + idx * (stepWidth + stepGap);

    // Add circle background - matching the div circle styles
    slide.addShape(pptx.ShapeType.ellipse, {
      x: x + stepWidth / 2 - 0.47, // centering circle (60px equivalent)
      y: 1.8,
      w: 0.94, // equivalent to 60px width
      h: 0.94, // equivalent to 60px height
      fill: { color: headingColor },
    });

    // Add icon - matching img styles
    // if (step.iconSrc) {
    //   try {
    //     slide.addImage({
    //       path: step.iconSrc,
    //       x: x + stepWidth / 2 - 0.22, // centering icon (28px equivalent)
    //       y: 2.0,
    //       w: 0.44, // equivalent to 28px width
    //       h: 0.44, // equivalent to 28px height
    //     });
    //   } catch (error) {
    //     console.warn(`Failed to add icon for step ${step.heading}`);
    //   }
    // }

    // Add heading - matching h3 styles
    slide.addText(step.heading, {
      x: x,
      y: 2.9,
      w: stepWidth,
      h: 0.5,
      fontSize: 18, // equivalent to 1.1rem
      bold: true,
      align: "center",
      color: headingColor,
      margin: 8, // equivalent to 0.5rem marginBottom
    });

    // Add description - matching p styles
    slide.addText(step.description, {
      x: x,
      y: 3.5,
      w: stepWidth,
      h: 1,
      fontSize: 14, // equivalent to 0.9rem
      align: "center",
      color: subHeadingColor ?? "#555",
      breakLine: true,
      wrap: true,
    });
  });

  return slide;
}

export default SlideBusinessFlow;
