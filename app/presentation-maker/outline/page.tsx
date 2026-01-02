// "use client";

// import { useEffect, useState } from "react";
// import { ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import SettingsPanel from "@/components/GenaratePromt/settings-panel";
// import ContentPanel from "@/components/GenaratePromt/content-panel";
// import { useSearchParams } from "next/navigation";
// type Slide = {
//   id: number;
//   title: string;
//   bulletPoints: string[];
//   isEditing: boolean;
// };
// import { useSlidesContext } from "@/context/globalSlideContext";
// import { setGlobal } from "next/dist/trace";
// export default function PromptEditor() {
//   const { setGlobalSlides, globalSlides } = useSlidesContext();
//   // const [globalSlides, setGlobalSlides] = useState<Slide[]>([]);
//   const searchParams = useSearchParams();
//   const [loading, setLoading] = useState(false);
//   const language = searchParams.get("lang");
//   const topic = searchParams.get("topic");
//   const cards = searchParams.get("cards");

//   const toggleEditMode = (id: number) => {
//     setGlobalSlides(
//       globalSlides.map((card) => {
//         if (card.id === id) {
//           return { ...card, isEditing: !card.isEditing };
//         }
//         return card;
//       }),
//     );
//   };
//   const fetchSlides = async () => {
//     setLoading(true);
//     setGlobalSlides([]);

//     const response = await fetch(
//       `/api/ppt-get/outline?topic=${topic}&cards=${cards},&language=${language}`,
//     );
//     const reader = response.body?.getReader();
//     const decoder = new TextDecoder("utf-8");
//     let buffer = "";

//     if (reader) {
//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) break;
//         buffer += decoder.decode(value, { stream: true });

//         let lines = buffer.split("\n");
//         buffer = lines.pop() || "";

//         for (const line of lines) {
//           if (line.trim()) {
//             try {
//               const slide: Slide = JSON.parse(line);
//               setGlobalSlides((prev) => [...prev, slide]);
//             } catch (e) {
//               console.error("Error parsing slide:", e);
//             }
//           }
//         }
//       }
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchSlides();
//   }, []);
//   // Add function to add a new card
//   const addCard = () => {
//     const newId =
//       globalSlides.length > 0
//         ? Math.max(...globalSlides.map((card) => card.id)) + 1
//         : 1;
//     const newCard = {
//       id: newId,
//       title: `New Card ${newId}`,
//       bulletPoints: ["Add your content here..."],
//       isEditing: true,
//     };
//     setGlobalSlides([...globalSlides, newCard]);
//   };

//   // Add function to delete a card
//   const deleteCard = (id: number) => {
//     globalSlides.filter((card) => card.id !== id);
//   };

//   // Add function to update card content
//   const updateCard = (id: number, title: any, content: any) => {
//     setGlobalSlides(
//       globalSlides.map((card) => {
//         if (card.id === id) {
//           return { ...card, title, content, isEditing: false };
//         }
//         return card;
//       }),
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-100 ">
//       <div className="container mx-auto p-4 ">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6 m-6 mt-18">
//           <Button
//             variant="outline"
//             className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" /> Back
//           </Button>
//           <h1 className="text-2xl font-bold text-gray-700">Generate</h1>
//           <div className="w-24"></div> {/* Spacer for alignment */}
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-6">
//           <SettingsPanel />
//           <ContentPanel
//             loading={loading}
//             cards={globalSlides}
//             addCard={addCard}
//             deleteCard={deleteCard}
//             toggleEditMode={toggleEditMode}
//             updateCard={updateCard}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }




export default function page() {
  return (
    <div>
      Hello World
    </div>
  )
}