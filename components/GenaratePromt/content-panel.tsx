// "use client";

// import {
//   ChevronDown,
//   ArrowLeft,
//   LayoutGrid,
//   FileText,
//   Plus,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import PromptCard from "./prompt-card";
// import LoadingCardSkeleton from "../Generate/loadingCard";
// import { useRouter } from "next/navigation";
// export default function ContentPanel({
//   loading,
//   cards,
//   addCard,
//   deleteCard,
//   toggleEditMode,
//   updateCard,
// }) {
//   const router = useRouter();
//   return (
//     <div className="space-y-6 border-1  rounded-[20px] p-6 mt-16">
//       <h2 className="text-lg text-gray-600 mb-2">Content</h2>

//       {/* View Mode Buttons */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex gap-2">
//           <Button variant="outline" className="rounded-full bg-white">
//             <FileText className="h-4 w-4 mr-2" /> Freeform
//           </Button>
//           <Button
//             variant="outline"
//             className="rounded-full bg-blue-600 text-white"
//           >
//             <LayoutGrid className="h-4 w-4 mr-2" /> Card-by-Card
//           </Button>
//         </div>
//         <Button variant="ghost" size="icon" className="rounded-full">
//           <ChevronDown className="h-5 w-5" />
//         </Button>
//       </div>

//       {/* Cards */}
//       <div className="space-y-4">
//         {cards.map((card, index) => (
//           <PromptCard
//             key={index}
//             card={card}
//             isNew={index === cards.length - 1 && card.isEditing}
//             onDelete={() => deleteCard(card.id)}
//             onEdit={() => toggleEditMode(card.id)}
//             onSave={updateCard}
//           />
//         ))}

//         {/* Add Card Button */}
//         <Button
//           className="w-full py-6 rounded-md bg-white hover:bg-gray-50 border border-dashed border-gray-300 text-green-600"
//           onClick={addCard}
//         >
//           <Plus className="h-5 w-5 mr-2" /> Add Card
//         </Button>

//         {/* Footer */}
//         <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl mt-6">
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium">
//               {cards.length} Total Cards
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-500">
//               Type --- for card breaks
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
//               <div className="w-2 h-2 rounded-full bg-gray-500"></div>
//             </div>
//             <span className="text-sm text-gray-500">500/20000</span>
//           </div>
//         </div>
//       </div>
//       <div>{loading ? <LoadingCardSkeleton /> : null}</div>
//       {/* Continue Button */}
//       <Button
//         onClick={() =>
//           router.push("/presentation-maker/outline/generate-preview")
//         }
//         className="w-full py-6 rounded-md bg-indigo-900 hover:bg-indigo-800 text-white"
//       >
//         Continue <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
//       </Button>
//     </div>
//   );
// }


export default function contentPanel() {
  return (
    <div>
      Hello
    </div>
  )
}


