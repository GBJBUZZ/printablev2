import React from "react";
import PageCardComponent from "./ShopCardComponent";
export default function PageCard() {
  const shops = [
    {
      name: "Print Master Shop",
      address: "123 Main St, New York, NY 10001",
      rating: 4.3,
      distance: "15 mins • 1.2 km",
      services: [
        "Poster Printing",
        "Photo Books",
        "Document Printing",
        "Business Cards",
      ],
      image: "/imagesprintMastry.svg",
    },
    {
      name: "QuickPrint Services",
      address: "456 Broadway, New York, NY 10002",
      rating: 4.6,
      distance: "15 mins • 1.2 km",
      services: ["Brochures", "Flyers", "Document Printing"],
      image: "/quickprint.svg",
    },
    {
      name: "Downtown Print",
      address: "789 Wall St, New York, NY 10003",
      rating: 4.9,
      distance: "15 mins • 1.2 km",
      services: ["Brochures", "Flyers", "Business Cards"],
      image: "/downtown.svg",
    },
    {
      name: "City Print Hub",
      address: "101 Liberty St, New York, NY 10004",
      rating: 4.7,
      distance: "15 mins • 1.2 km",
      services: ["Flyers", "Document Printing", "Photo Books"],
      image: "/downtown.svg",
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Print Shops</h2>
      <PageCardComponent value={shops} />
    </div>
  );
}
