import React from "react";
import { tool } from "ai";
import { z } from "zod";
import PptxGenJS from "pptxgenjs";

export const SlideValidateIdeaTool = tool({
  description:
    "Create a slide titled 'Validate Your Idea' with three numbered steps and an optional side image. Each step includes a heading and description.",
  parameters: z.object({
    steps: z.array(
      z.object({
        number: z.number(),
        heading: z.string(),
        description: z.string(),
      })
    ),
  }),
});

type SlideProps = z.infer<typeof SlideValidateIdeaTool.parameters>;
type sudoSlideProps = SlideProps & {
  imageUrl: string;
  backgroundColor: string;
  headingColor: string;
  subHeadingColor: string;
  bulletColor: string;
};

export const SlideValidateIdea: React.FC<sudoSlideProps> = ({
  steps,
  imageUrl = "",
  backgroundColor = "#f5f0e6",
  headingColor = "#1f433e",
  subHeadingColor = "#1f433e",
  bulletColor = "#1f433e",
}) => {
  return (
    <div
      className="flex flex-col md:flex-row items-start p-8 rounded-xl gap-12 shadow-lg" // changed items-center to items-start
      style={{
        height: "450px",
        width: "1000px",
        maxWidth: "1050px",
        margin: "0 auto",
        backgroundColor,
        color: headingColor,
      }}
    >
      {/* Left side content */}
      <div className="flex-1">
        {/* Removed extra div and padding */}
        <h1
          className="text-2xl font-bold mb-8" // increased margin bottom for spacing
          style={{ color: headingColor }}
        >
          Validate Your Idea
        </h1>

        <div className="flex flex-col space-y-8">
          {steps.map((step) => (
            <div key={step.number} className="flex items-start gap-4">
              <div
                className="w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold flex-shrink-0 transition-transform hover:scale-110 duration-300"
                style={{
                  backgroundColor: bulletColor,
                  color: "#ffffff",
                  boxShadow: `0 4px 12px ${bulletColor}40`,
                }}
              >
                {step.number}
              </div>
              <div className="flex-1">
                <h2
                  className="text-base font-semibold mb-0.5"
                  style={{ color: headingColor }}
                >
                  {step.heading}
                </h2>
                <p
                  className="text-sm leading-snug"
                  style={{ color: subHeadingColor }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side image - unchanged */}
      {imageUrl && (
        <div className="flex-1 hidden md:block">
          <img
            src={imageUrl}
            alt="Slide Visual"
            className="rounded-lg w-full h-auto object-cover"
            style={{ maxHeight: "380px" }}
          />
        </div>
      )}
    </div>
  );
};
export function generateValidateIdeaSlide(
  pptx: PptxGenJS,
  data: sudoSlideProps
) {
  const {
    steps,
    imageUrl,
    backgroundColor = "#f5f0e6",
    headingColor = "#1f433e",
    subHeadingColor = "#1f433e",
    bulletColor = "#1f433e",
  } = data;

  const slide = pptx.addSlide();
  slide.background = { color: backgroundColor };

  const circleSize = 0.28;

  // Title
  slide.addText("Validate Your Idea", {
    x: 0.5,
    y: 0.3,
    w: 9,
    h: 0.6,
    fontSize: 26,
    bold: true,
    color: headingColor,
    align: "left",
  });

  // Text positioning
  let contentX = 0.5;
  let contentW = 7;

  // Optional right-side image
  if (imageUrl) {
    slide.addImage({
      path: imageUrl,
      x: 7.2,
      y: 1,
      w: 2.5,
      h: 3.5,
    });
  }

  // Steps rendering
  steps.forEach((step, i) => {
    const yBase = 1 + i * 1.2;

    // Number circle
    slide.addShape(pptx.ShapeType.ellipse, {
      x: contentX,
      y: yBase,
      w: circleSize,
      h: circleSize,
      fill: { color: bulletColor },
      line: { color: bulletColor },
    });

    // Number text
    slide.addText(step.number.toString(), {
      x: contentX,
      y: yBase,
      w: circleSize,
      h: circleSize,
      align: "center",
      valign: "middle",
      fontSize: 10,
      color: "FFFFFF",
      bold: true,
    });

    // Heading text
    slide.addText(step.heading, {
      x: contentX + 0.4,
      y: yBase,
      w: contentW,
      fontSize: 12,
      bold: true,
      color: headingColor,
    });

    // Description text
    slide.addText(step.description, {
      x: contentX + 0.4,
      y: yBase + 0.35,
      w: contentW,
      fontSize: 10.5,
      color: subHeadingColor,
      breakLine: true,
      lineSpacing: 14,
    });
  });

  return slide;
}
export default SlideValidateIdea;
