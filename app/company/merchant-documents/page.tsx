"use client";

import {
  Star,
  Pencil,
  Trash2,
  Folder,
  FileText,
  Search,
  Filter,
  LayoutGrid,
  List,
} from "lucide-react";

import Sidebar from "../../../components/Sidebar";
import TopNavbar from "../../../components/TopNavbar";
import Image from "next/image";
import { useState } from "react";

type StorageItem = {
  name: string;
  size: string;
  files: string;
  image: string;
};

type TableRow = {
  name: string;
  type: string;
  size: string;
  date: string;
  icon: React.ReactNode;
  starred?: boolean;
};

export default function DocumentVaultPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("list");

  const storageItems: StorageItem[] = [
    { name: "Documents", size: "3.1 GB", files: "155 files", image: "/m1.png" },
    { name: "Photos", size: "1.1 GB", files: "203 files", image: "/m2.png" },
    { name: "Videos", size: "500 MB", files: "04 files", image: "/m3.png" },
    { name: "Zip", size: "51 MB", files: "15 files", image: "/m4.png" },
    { name: "Other Files", size: "1.0 GB", files: "50 files", image: "/m5.png" },
  ];

  const tableRows: TableRow[] = [
    { name: "Business Cards", type: "Folder", size: "45 Items", date: "Apr 21, 2025", icon: <Folder size={16} /> },
    { name: "Flyers", type: "Folder", size: "45 Items", date: "Apr 20, 2025", icon: <Folder size={16} />, starred: true },
    { name: "Barouches", type: "Folder", size: "45 Items", date: "Apr 19, 2025", icon: <Folder size={16} /> },
    { name: "Posters", type: "Folder", size: "45 Items", date: "Apr 19, 2025", icon: <Folder size={16} /> },
    { name: "Glossy Noice", type: "Folder", size: "45 Items", date: "Apr 19, 2025", icon: <Folder size={16} /> },
    { name: "May-scanner-2024.jpg", type: "Image", size: "10 MB", date: "Apr 19, 2025", icon: <FileText size={16} /> },
    { name: "May-scanner-2024.pdf", type: "Document", size: "10 MB", date: "Apr 19, 2025", icon: <FileText size={16} /> },
    { name: "May-scanner-2024.docx", type: "Word", size: "10 MB", date: "Apr 19, 2025", icon: <FileText size={16} /> },
    { name: "May-scanner-2024.xlsx", type: "Excel", size: "10 MB", date: "Apr 19, 2025", icon: <FileText size={16} /> },
  ];

  const filteredRows = tableRows.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <TopNavbar />

        <h2 className="text-xl font-semibold mt-6">Document Vault</h2>

        {/* STORAGE CARDS */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          {storageItems.map((item) => (
            <div key={item.name} className="bg-white rounded-xl px-4 py-3 flex items-center gap-4 shadow-sm">
              <Image src={item.image} alt={item.name} width={32} height={32} />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.files}</p>
              </div>
              <p className="text-sm font-semibold">{item.size}</p>
            </div>
          ))}
        </div>

        {/* TOTAL STORAGE */}
        <div className="bg-white rounded-xl p-5 mt-4 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Total Storage Used</p>
              <p className="text-xs text-gray-500">535 files across all categories</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">4.67 GB</p>
              <p className="text-xs text-gray-500">of 50 GB used</p>
            </div>
          </div>
          <Image src="/line2.png" alt="usage" width={1200} height={20} className="mt-4 w-full" />
        </div>

        {/* OVERVIEW STORAGE HEADER */}
        <div className="bg-white mt-6 rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Overview Storage</h3>
              <p className="text-sm text-gray-500">Document that you save on our cloud</p>
            </div>

            <div className="flex gap-2">
              <button className="border px-4 py-2 rounded-md text-sm flex items-center gap-1">
                + Create Folder
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1">
                Upload Files
              </button>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <button className="border px-3 py-2 rounded-md text-sm flex items-center gap-1">
                <Filter size={14} /> Filters
              </button>
              <button
                onClick={() => setView("grid")}
                className={`border px-3 py-2 rounded-md ${view === "grid" ? "bg-indigo-600 text-white" : ""}`}
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`border px-3 py-2 rounded-md ${view === "list" ? "bg-indigo-600 text-white" : ""}`}
              >
                <List size={14} />
              </button>
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-3 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders, customers"
                className="border rounded-md pl-9 pr-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* TABLE */}
          <table className="w-full mt-4 text-sm">
            <thead className="bg-gray-100 text-gray-500">
              <tr>
                <th className="text-left p-3">NAME</th>
                <th>TYPE</th>
                <th>SIZE</th>
                <th>LAST MODIFIED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.name} className="border-b">
                  <td className="flex items-center gap-2 p-3">
                    {row.icon}
                    {row.name}
                    {row.starred && <Star size={14} className="text-yellow-400" />}
                  </td>
                  <td className="text-center">{row.type}</td>
                  <td className="text-center">{row.size}</td>
                  <td className="text-center">{row.date}</td>
                  <td className="flex justify-center gap-3 p-3">
                    <Star size={14} />
                    <Pencil size={14} />
                    <Trash2 size={14} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
