import React from "react";
import { z } from "zod";
import { tool } from "ai";

// Tool definition for selecting this circular process/strategy slide layout
export const SlideCircularProcesss = tool({
  description:
    "Generate a slide with a title and a numbered circular diagram at its center, surrounded by labeled steps or strategies positioned around the circle. Ideal for illustrating multi-step processes or prevention strategies.",
  parameters: z.object({
    title: z.string().describe("Main heading of the slide"),
    steps: z
      .array(
        z.object({
          heading: z.string().describe("Step title or strategy name"),
          description: z
            .string()
            .describe("Detail or explanation of this step"),
        })
      )
      .min(1)
      .max(8)
      .describe(
        "Ordered list of steps to display around the circle, numbered by their index"
      ),
  }),
});

export const CircularSlideSchema = SlideCircularProcesss.parameters;

type CircularSlideProps = z.infer<typeof CircularSlideSchema> & {
  backgroundColor?: string;
  headingColor?: string;
  subHeadingColor?: string;
  bulletColor?: string;
};

const positionClasses = [
  "absolute top-[5%] left-1/2 -translate-x-1/2 text-center",
  "absolute top-[20%] right-[10%] text-center",
  "absolute bottom-[20%] right-[10%] text-center",
  "absolute bottom-[5%] left-1/2 -translate-x-1/2 text-center",
  "absolute bottom-[20%] left-[10%] text-center",
  "absolute top-[20%] left-[10%] text-center",
];

const CircularSlide: React.FC<CircularSlideProps> = ({
  title,
  steps,
  backgroundColor = "#f5f0e6",
  headingColor = "#1f433e",
  subHeadingColor = "#1f433e",
  bulletColor = "#2563eb",
}) => {
  return (
    <div
      className="relative w-[1000px] h-[450px] p-8 rounded-xl shadow-lg"
      style={{
        backgroundColor,
        maxWidth: "1050px",
        margin: "0 auto",
      }}
    >
      {/* Compact top-centered title */}
      <h1
        className="absolute top-8 left-1/2 transform -translate-x-1/2 text-2xl font-bold"
        style={{ color: headingColor }}
      >
        {title}
      </h1>

      {/* Centered circle container remains the dominant element */}
      <div className="absolute inset-0 flex justify-center items-center mt-15">
        <div className="relative w-[350px] h-[350px]">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px dashed ${bulletColor}`,
              opacity: 0.3,
            }}
          />
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={positionClasses[idx] || ""}
              style={{ width: "18%" }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center mx-auto mb-1"
                style={{
                  backgroundColor: bulletColor,
                  color: "#ffffff",
                  boxShadow: `0 4px 12px ${bulletColor}40`,
                }}
              >
                <span className="text-xs font-bold">{idx + 1}</span>
              </div>
              <h3
                className="text-xs font-semibold mb-0.5 leading-tight"
                style={{ color: headingColor }}
              >
                {step.heading}
              </h3>
              <p
                className="text-xs leading-tight line-clamp-2"
                style={{ color: subHeadingColor }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircularSlide;
