//Primary Code

// "use client";
// import { useEffect, useState } from "react";
// import { useSlidesContext } from "@/context/globalSlideContext";
// import { SlideDeck } from "@/components/GenaratePromt/slideDeck.client";
// import SlidesLoader from "@/components/GenaratePromt/slideLoader";

// export default function SlidePreview() {
//   const { globalSlides } = useSlidesContext();
//   const [cards, setCards] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const generatePreview = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch("/api/ppt-get/generate-preview", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ slides: globalSlides }),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch preview");
//         }

//         const data = await response.json();
//         console.log("API Response:", data);
//         setCards(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     if (globalSlides && globalSlides.length > 0) {
//       generatePreview();
//     }
//   }, []);

//   return (
//     <div>
//       {cards == null || loading ? (
//         <SlidesLoader />
//       ) : (
//         <SlideDeck slides={cards.slides} />
//       )}
//     </div>
//   );
// }


//Secondary Code

// "use client";
// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import { useSlidesContext } from "@/context/globalSlideContext";
// import SlidesLoader from "@/components/GenaratePromt/slideLoader";

// // ✅ Import SlideDeck with SSR disabled
// const SlideDeck = dynamic(
//   () => import("@/components/GenaratePromt/slideDeck.client"),
//   { ssr: false }
// );

// export default function SlidePreview() {
//   const { globalSlides } = useSlidesContext();
//   const [cards, setCards] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const generatePreview = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch("/api/ppt-get/generate-preview", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ slides: globalSlides }),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch preview");
//         }

//         const data = await response.json();
//         setCards(data);
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (globalSlides && globalSlides.length > 0) {
//       generatePreview();
//     }
//   }, [globalSlides]);

//   return (
//     <div>
//       {cards == null || loading ? (
//         <SlidesLoader />
//       ) : (
//         <SlideDeck slides={cards.slides} />
//       )}
//     </div>
//   );
// }

//Secondary Code

// "use client";
// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import { useSlidesContext } from "@/context/globalSlideContext";
// import SlidesLoader from "@/components/GenaratePromt/slideLoader";

// // Define the prop type expected by SlideDeck
// type SlideDeckProps = {
//   slides: any[]; // Replace with accurate slide structure if possible
// };

// // Dynamically import SlideDeck with correct type
// const SlideDeck = dynamic<SlideDeckProps>(
//   () => import("@/components/GenaratePromt/slideDeck.client").then(mod => mod.default),
//   { ssr: false }
// );

// export default function SlidePreview() {
//   const { globalSlides } = useSlidesContext();
//   const [cards, setCards] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const generatePreview = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch("/api/ppt-get/generate-preview", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ slides: globalSlides }),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch preview");
//         }

//         const data = await response.json();
//         setCards(data);
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (globalSlides && globalSlides.length > 0) {
//       generatePreview();
//     }
//   }, [globalSlides]);

//   return (
//     <div>
//       {cards == null || loading ? (
//         <SlidesLoader />
//       ) : (
//         <SlideDeck slides={cards.slides} />
//       )}
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