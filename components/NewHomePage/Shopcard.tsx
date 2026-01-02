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

  ];

  return (
    <div className="mt-8 lg:pl-[200px] md:pl[100px] sm:pl[100px] pl-4 bg-gray-100 pt-10 ">
      <h2 className="lg:text-[32px] md:text-[24px] font-semibold text-gray-800 mb-4 text-center lg:text-start md:text-start sm:text-start">Print Shops</h2>
      <PageCardComponent value={shops} />
    </div>
  );
}
