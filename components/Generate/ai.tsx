"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { ChevronDown, Sparkles, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Slide = {
  title: string;
  content: string[];
  background: string;

};

type Presentation = {
  title: string;
  slides: Slide[];
  style: string;
};

export default function AIPresentationGenerator() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [generatedPresentation, setGeneratedPresentation] =
    useState<Presentation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState("Card 1");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const cardOptions = Array.from({ length: 10 }, (_, i) => `Card ${i + 1}`);
  const languageOptions = ["English", "Hindi", "Marathi", "Telgu", "Bengali"];

  const templates = [
    {
      id: 1,
      title: "Gradient background Design",
      backgroundColor:
        "bg-gradient-to-br from-purple-300 via-blue-300 to-teal-200",
      headingColor: "#2C3E50", // Deep midnight blue for strong contrast
      subHeadingColor: "#4A5568", // Soothing slate gray for secondary text
      bulletColor: "#3182CE", // Bright blue accent from gradient
      image: "/Generate/images4.png",
    },
    {
      id: 2,
      title: "Creative art background Design",
      backgroundColor: "bg-gradient-to-r from-pink-300 to-orange-200",
      headingColor: "#2C3E50", // Consistent dark navy for readability
      subHeadingColor: "#D53F8C", // Vibrant magenta for playful subheadings
      bulletColor: "#ED8936", // Warm orange for bullet points
      image: "/Generate/images5.png",
    },
    {
      id: 3,
      title: "3D background Design",
      backgroundColor: "bg-gradient-to-r from-rose-300 to-rose-200",
      headingColor: "#2D3748", // Charcoal gray for a modern look
      subHeadingColor: "#805AD5", // Soft purple for depth
      bulletColor: "#F687B3", // Rose pink to echo the gradient
      image: "/Generate/image6.png",
    },
    {
      id: 4,
      title: "Nature background Design",
      backgroundColor: "bg-green-100",
      headingColor: "#22543D", // Dark forest green for clarity
      subHeadingColor: "#38A169", // Fresh medium green for accents
      bulletColor: "#2F855A", // Rich emerald for bullets
      image: "/Generate/images-1.png",
    },
    {
      id: 5,
      title: "Flower background Design",
      backgroundColor: "bg-yellow-100",
      headingColor: "#2D3748", // Versatile charcoal for headings
      subHeadingColor: "#D69E2E", // Goldenrod for floral vibes
      bulletColor: "#ECC94B", // Sunny yellow for bullet points
      image: "/Generate/images3.png",
    },
    {
      id: 6,
      title: "Professional background Design",
      backgroundColor: "bg-gray-800",
      headingColor: "#E2E8F0", // Almost-white for strong contrast
      subHeadingColor: "#A0AEC0", // Light steel gray for subheads
      bulletColor: "#CBD5E0", // Soft pale gray for bullets
      image: "/Generate/images2.png",
    },
  ];

  const handelClick = () => {
    router.push(
      `presentation-maker/outline?topic=${prompt}&lang=${selectedLanguage}&cards=${selectedCard}`,
    );
  };

  const generatePresentation = async () => {
    if (!prompt.trim()) {
      setError("Please enter a description for your presentation");
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get the selected template or default to the first one
      const template = selectedTemplate
        ? templates.find((t) => t.id === selectedTemplate)
        : templates[0];

      // Generate a mock presentation based on the prompt
      const words = prompt.split(" ");
      const title =
        words.length > 3 ? words.slice(0, 3).join(" ") + "..." : prompt;

      // Create slides based on the prompt
      const slideCount = 3 + Math.floor(Math.random() * 3); // 3-5 slides
      const slides: Slide[] = [];

      for (let i = 0; i < slideCount; i++) {
        const slideTitle = i === 0 ? title : `${title} - Part ${i}`;

        const contentCount = 2 + Math.floor(Math.random() * 3); // 2-4 bullet points
        const content = Array(contentCount)
          .fill(0)
          .map(
            (_, idx) =>
              `Point ${idx + 1}: ${prompt.slice(0, 20)}${idx > 0 ? ` (variation ${idx})` : ""}`,
          );

        slides.push({
          title: slideTitle,
          content,
          background:
            template?.backgroundColor ||
            "bg-gradient-to-br from-purple-300 via-blue-300 to-teal-200",
        });
      }

      const presentation: Presentation = {
        title,
        slides,
        style: template?.title || "Gradient background Design",
      };

      setGeneratedPresentation(presentation);
    } catch (err) {
      setError("Failed to generate presentation. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const closePresentation = () => {
    setGeneratedPresentation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-blue-300 to-teal-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {!generatedPresentation ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-[48px] text-[#575174] tracking-tight font-bold ">
                Generate
              </h1>
              <p className="text-[18px] font-normal text-[#716C8C] mb-4">
                Start creating something amazing.
              </p>
              <h2 className="text-[32px]  tracking-tight  font-semibold text-black mb-6">
                AI Presentation
              </h2>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white rounded-full px-4 flex items-center gap-1"
                    >
                      {selectedCard} <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white">
                    <DropdownMenuLabel>Select Card </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {cardOptions.map((card) => (
                      <DropdownMenuItem
                        key={card}
                        onClick={() => setSelectedCard(card)}
                        className="flex items-center justify-between"
                      >
                        {card}
                        {selectedCard === card && (
                          <Check className="h-4 w-4 ml-2" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="outline"
                  className="bg-white rounded-full px-4 flex items-center gap-1"
                >
                  Default <ChevronDown className="h-4 w-4" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white rounded-full px-4 flex items-center gap-1"
                    >
                      {selectedLanguage} <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white">
                    <DropdownMenuLabel>Select Language </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {languageOptions.map((lang) => (
                      <DropdownMenuItem
                        key={lang}
                        onClick={() => setSelectedLanguage(lang)}
                        className="flex items-center justify-between"
                      >
                        {lang}
                        {selectedLanguage === lang && (
                          <Check className="h-4 w-4 ml-2" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Describe what you want to create"
                  className="w-full p-4 rounded-full border border-gray-200 font-[#8987A9] font-[18px]   bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}

              <Button
                className="rounded-full w-[358px] h-[80px] text-[24px]  bg-white text-gray-800 hover:bg-gray-100 flex items-center gap-2 mx-auto"
                onClick={handelClick}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="h-[80px] w-[358px] border-2 border-gray-800  border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Generate
                  </>
                )}
              </Button>
            </div>

            <div className="mt-12">
              <h3 className="text-center text-black text-[16px] font-normal mb-6">
                Example Templates
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`rounded-lg overflow-hidden p-4 cursor-pointer transition-all duration-200 ${
                      selectedTemplate === template.id
                        ? "ring-2 ring-purple-500 ring-offset-2"
                        : ""
                    }`}
                    onClick={() => {
                      localStorage.setItem("themeID", template.id.toString());
                      setSelectedTemplate(template.id);
                    }}
                  >
                    <div
                      className={`${template.backgroundColor} rounded-lg p-4 h-40 flex items-center justify-center relative`}
                      style={
                        template.image
                          ? {
                              backgroundImage: `url(${template.image})`,
                              backgroundSize: "cover",
                            }
                          : {}
                      }
                    >
                      <Card className="bg-white p-3 w-[200px] h-[90px] rounded-lg shadow-md">
                        <div className="font-medium text-[18px]">Title</div>
                        <div className="text-xs text-gray-500">
                          Main body and{" "}
                          <span className="text-blue-500 text-[14px]">
                            Link
                          </span>
                        </div>
                      </Card>
                    </div>
                    <p className="text-center text-sm mt-2 text-gray-700">
                      {template.title}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  className="rounded-full w-[250px] h-[50px] bg-white flex items-center gap-2 text-[18px]"
                >
                  See More <span className="font-bold">&raquo;</span>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Your Presentation</h2>
                <p className="text-gray-500">
                  Style: {generatedPresentation.style} | {selectedCard}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closePresentation}
                className="rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-6">
              {generatedPresentation.slides.map((slide, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className={`${slide.background} p-6`}>
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                      <h3 className="text-xl font-semibold mb-3">
                        {slide.title}
                      </h3>
                      <ul className="space-y-2">
                        {slide.content.map((point, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-2 text-sm text-gray-500">
                    Slide {index + 1} of {generatedPresentation.slides.length}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={closePresentation}>
                Create New
              </Button>
              <Button>Download Presentation</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
