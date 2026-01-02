// "use client";

// import { useState, useEffect } from "react";
// import { Trash2, Edit, Save, Plus, X } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// export default function PromptCard({ card, isNew, onDelete, onEdit, onSave }) {
//   const [title, setTitle] = useState(card.title);
//   const [content, setContent] = useState([...card.bulletPoints]);
//   const [newBulletPoint, setNewBulletPoint] = useState("");

//   // Reset local state when card changes
//   useEffect(() => {
//     setTitle(card.title);
//     setContent([...card.bulletPoints]);
//   }, [card]);

//   const handleSave = () => {
//     onSave(card.id, title, content);
//   };

//   const handleAddBulletPoint = () => {
//     if (newBulletPoint.trim()) {
//       setContent([...content, newBulletPoint]);
//       setNewBulletPoint("");
//     }
//   };

//   const handleRemoveBulletPoint = (index: number) => {
//     setContent(content.filter((_, i) => i !== index));
//   };

//   const handleUpdateBulletPoint = (index: number, value: string) => {
//     const newContent = [...content];
//     newContent[index] = value;
//     setContent(newContent);
//   };

//   return (
//     <Card
//       className={`p-4 ${card.id % 2 === 0 ? "bg-blue-50" : "bg-green-50"} relative ${isNew ? "mt-8" : ""}`}
//     >
//       <div className="flex items-center justify-between mb-2">
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-semibold text-gray-700">
//             {card.id}
//           </div>
//           {card.isEditing ? (
//             <Input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="bg-white"
//             />
//           ) : (
//             <h3 className="font-semibold text-2xl">{card.title}</h3>
//           )}
//         </div>
//         <div className="flex gap-2">
//           {card.isEditing ? (
//             <Button
//               variant="outline"
//               size="icon"
//               className="rounded-full bg-green-100"
//               onClick={handleSave}
//             >
//               <Save className="h-4 w-4 text-green-700" />
//             </Button>
//           ) : (
//             <Button
//               variant="ghost"
//               size="icon"
//               className="rounded-full"
//               onClick={onEdit}
//             >
//               <Edit className="h-4 w-4" />
//             </Button>
//           )}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="rounded-full"
//             onClick={onDelete}
//           >
//             <Trash2 className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//       <div className="pl-10 space-y-2">
//         {card.isEditing ? (
//           <>
//             {content.map((item, i) => (
//               <div key={i} className="flex items-start gap-2">
//                 <span className="text-gray-500 mt-2">◦</span>
//                 <Textarea
//                   value={item}
//                   onChange={(e) => handleUpdateBulletPoint(i, e.target.value)}
//                   className="flex-1 bg-white min-h-[60px]  text-4xl"
//                 />
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="rounded-full mt-1"
//                   onClick={() => handleRemoveBulletPoint(i)}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             ))}
//             <div className="flex items-start gap-2 mt-4">
//               <span className="text-gray-500 mt-2">◦</span>
//               <Textarea
//                 value={newBulletPoint}
//                 onChange={(e) => setNewBulletPoint(e.target.value)}
//                 placeholder="Add new bullet point..."
//                 className="flex-1 bg-white min-h-[60px] text-sm"
//               />
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="rounded-full mt-1 bg-green-100"
//                 onClick={handleAddBulletPoint}
//               >
//                 <Plus className="h-4 w-4 text-green-700" />
//               </Button>
//             </div>
//           </>
//         ) : (
//           content.map((item, i) => (
//             <div key={i} className="flex items-start gap-2">
//               <span className="text-gray-500 mt-1">◦</span>
//               <p className="text-base">{item}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </Card>
//   );
// }


export default function prompt() {
  return (
    <div>
      Hello
    </div>
  )
}
