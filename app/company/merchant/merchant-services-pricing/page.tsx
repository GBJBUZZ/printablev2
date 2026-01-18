"use client";

import { useState } from "react";

import Sidebar from "./components/Sidebar";

import Topbar from "./components/Topbar";

import PricingTable from "./components/PricingTable";

import AdditionalServicesPage from "./components/additional-services";

type Service = {
  name: string;
  a4: number | "-";
  a3: number | "-";
  bw: number | "-";
  color: number | "-";
};

const initialServices: Service[] = [
  { name: "Black & White Print", a4: 5, a3: 10, bw: 5, color: "-" },
  { name: "Color Print", a4: 10, a3: 20, bw: "-", color: 10 },
  { name: "Spiral Binding", a4: 30, a3: 50, bw: "-", color: "-" },
  { name: "Lamination", a4: 15, a3: 30, bw: "-", color: "-" },
  { name: "Resume Printing", a4: 25, a3: "-", bw: 25, color: 40 },
];

export default function ServicesPricingPage() {
  const [activeTab, setActiveTab] = useState<"service" | "additional">("service");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState<Service>({
    name: "",
    a4: "-",
    a3: "-",
    bw: "-",
    color: "-",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddService = () => {
    if (!newService.name.trim()) return;

    setServices([...services, newService]);
    setNewService({ name: "", a4: "-", a3: "-", bw: "-", color: "-" });
    setIsModalOpen(false);
  };

  const handleInputChange = (field: keyof Service, value: string) => {
    setNewService({
      ...newService,
      [field]: value === "" ? "-" : Number(value) || "-",
    });
  };

  // Filter services based on search query (prefix match, case-insensitive)
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <div className="pl-6">
          <Topbar />
        </div>

        <div className="p-6 space-y-6">
          <h3 className="text-2xl font-bold">Pricing & Services</h3>

          <div className="rounded-lg border border-[#FDE68A] bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
            <strong>Important Notice:</strong> Price changes take effect immediately
            for new orders. Existing orders remain unchanged.
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            {/* TABS */}
            <div className="flex w-full rounded-full border-2 border-[#C9C9C9] bg-white p-1">
              <button
                onClick={() => setActiveTab("service")}
                className={`flex-1 rounded-full py-2 text-sm font-medium transition ${
                  activeTab === "service"
                    ? "bg-gray-200 shadow text-black"
                    : "text-black"
                }`}
              >
                Service Pricing
              </button>

              <button
                onClick={() => setActiveTab("additional")}
                className={`flex-1 rounded-full py-2 text-sm font-medium transition ${
                  activeTab === "additional"
                    ? "bg-gray-200 shadow text-gray-900"
                    : "text-gray-600"
                }`}
              >
                Additional Services
              </button>
            </div>

            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  {activeTab === "service"
                    ? "Service Pricing Table"
                    : "Additional Services"}
                </h2>
                <p className="text-sm text-gray-500">
                  {activeTab === "service"
                    ? "Define pricing for your printing services"
                    : "Enable and disable additional services you offer"}
                </p>
              </div>

              {activeTab === "service" ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="rounded-full bg-[#06044B] px-4 py-2 text-sm text-white"
                >
                  + Add New Service
                </button>
              ) : (
                <div className="flex rounded-[10px] bg-white border-2 border-[#C9C9C9] p-1">
                  {["All", "Document", "Delivery", "Creative"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-[10px] px-4 py-2 text-sm font-medium ${
                        selectedCategory === cat
                          ? "bg-[#06044B] text-white"
                          : "text-gray-600"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 🔍 SEARCH + FILTERS (RESTORED) */}
            {activeTab === "service" && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 rounded-lg border border-[#C9C9C9] pl-2 w-100">
                  <img src='/searchi.png' className="w-5 h-5"/>
                  <input
                    placeholder="Search Order,customers"
                    className="w-90 px-3 py-2 text-sm focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex gap-2 items-center">
                  <div className="rounded-lg border border-[#C9C9C9] px-3 py-2"><img src='/twist.png' className="w-5 h-5 "/></div>
                  <select className="rounded-lg border border-[#C9C9C9] px-3 py-2 text-sm focus:outline-none">
                    <option>All Status</option>
                  </select>
                  <select className="rounded-lg border border-[#C9C9C9] px-3 py-2 text-sm focus:outline-none">
                    <option>All Types</option>
                  </select>
                </div>
              </div>
            )}

            {/* CONTENT */}
            {activeTab === "service" && (
              <PricingTable services={filteredServices} setServices={setServices} />
            )}

            {activeTab === "additional" && <AdditionalServicesPage />}
          </div>
        </div>
      </main>

      {/* ADD SERVICE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-[700px] rounded-xl bg-[#C9C9C9] p-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-xl hover:bg-red-200 rounded"
            >
              ✕
            </button>

            <h3 className="mb-6 text-xl font-semibold">Add New Service</h3>

            <div className="space-y-4 ">
              <div>
                <label className="text-sm font-medium">Service Name</label>
                <input
                  className="mt-1 w-full rounded-lg px-4 py-2 bg-white border border-[#C9C9C9] focus:outline-none"
                  placeholder="Service Name"
                  value={newService.name}
                  onChange={(e) =>
                    setNewService({ ...newService, name: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="A4 Price (₹)"
                  type="number"
                  className="rounded-lg px-4 py-2 bg-white border border-[#C9C9C9] focus:outline-none"
                  onChange={(e) => handleInputChange("a4", e.target.value)}
                />
                <input
                  placeholder="A3 Price (₹)"
                  type="number"
                  className="rounded-lg px-4 py-2 bg-white border border-[#C9C9C9] focus:outline-none"
                  onChange={(e) => handleInputChange("a3", e.target.value)}
                />
                <input
                  placeholder="B&W Price (₹)"
                  type="number"
                  className="rounded-lg px-4 py-2 bg-white border border-[#C9C9C9] focus:outline-none"
                  onChange={(e) => handleInputChange("bw", e.target.value)}
                />
                <input
                  placeholder="Color Price (₹)"
                  type="number"
                  className="rounded-lg px-4 py-2 bg-white border border-[#C9C9C9] focus:outline-none"
                  onChange={(e) => handleInputChange("color", e.target.value)}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleAddService}
                className="rounded-full bg-[#06044B]  px-6 py-2 text-white"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}