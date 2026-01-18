"use client";

import { useState } from "react";

export default function AdditionalServicesPage() {
  const [services, setServices] = useState({
    documentScanning: false,
    urgentJobs: false,
    documentEditing: false,
    inHouseDesigning: false,
    freePickup: false,
  });

  const toggle = (key: keyof typeof services) => {
    setServices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ServiceCard
            title="Document Scanning"
            description="Scan documents and convert to digital format"
            enabled={services.documentScanning}
            onToggle={() => toggle("documentScanning")}
            icon="/document-scanning.png"
            
          />

          <ServiceCard
            title="Urgent Jobs"
            description="Priority processing for urgent print orders"
            enabled={services.urgentJobs}
            onToggle={() => toggle("urgentJobs")}
            icon="/urgent.png"
          />

          <ServiceCard
            title="Document Editing"
            description="Basic document editing and formatting services"
            enabled={services.documentEditing}
            onToggle={() => toggle("documentEditing")}
            icon="/editing.png"
          />

          <ServiceCard
            title="In-House Designing"
            description="Custom design services for flyers, business cards, etc."
            enabled={services.inHouseDesigning}
            onToggle={() => toggle("inHouseDesigning")}
            icon="/design.png"
          />

          <ServiceCard
            title="Free Pickup"
            description="Free pickup service for orders above ₹500"
            enabled={services.freePickup}
            onToggle={() => toggle("freePickup")}
            icon="/pickup.png"
          />
        </div>

        {/* IMPORTANT NOTICE */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-center gap-2">
            <img src="/imp.png" className="h-4 w-4" />
            <h3 className="font-semibold text-blue-900">
              Important Notice
            </h3>
          </div>

          <p className="mt-3 pl-6 text-sm text-blue-800">
            Need to set up more complex pricing rules or discounts? Contact our
            support team for assistance with custom pricing configurations.
          </p>

          {/* BUTTON MOVED BELOW PARAGRAPH */}
          <div className="mt-4 pl-6">
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function ServiceCard({
  title,
  description,
  enabled,
  onToggle,
  icon,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  icon: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
          <img src={icon} alt={title} className="h-7 w-7" />
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      <ToggleSwitch enabled={enabled} onToggle={onToggle} />
    </div>
  );
}

function ToggleSwitch({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-[#06044B]" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}