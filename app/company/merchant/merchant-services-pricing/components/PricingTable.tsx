"use client";

import { useState } from "react";
import Toggle from "./Toggle";

type Service = {
  name: string;
  a4: number | "-";
  a3: number | "-";
  bw: number | "-";
  color: number | "-";
};

interface PricingTableProps {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

export default function PricingTable({
  services,
  setServices,
}: PricingTableProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [backupService, setBackupService] = useState<Service | null>(null);

  const handleChange = (
    index: number,
    field: keyof Service,
    value: string
  ) => {
    const updated = [...services];
    updated[index] = {
      ...updated[index],
      [field]: value === "" ? "-" : Number(value),
    };
    setServices(updated);
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setBackupService({ ...services[index] }); // snapshot for cancel
  };

  const saveEdit = () => {
    setEditingIndex(null);
    setBackupService(null);
  };

  const cancelEdit = () => {
    if (editingIndex === null || !backupService) return;

    const updated = [...services];
    updated[editingIndex] = backupService;
    setServices(updated);

    setEditingIndex(null);
    setBackupService(null);
  };

  const handleDelete = (index: number) => {
    const updated = services.filter((_, i) => i !== index);
    setServices(updated);
  };

  const renderCell = (
    service: Service,
    index: number,
    field: keyof Service
  ) => {
    const value = service[field];

    if (editingIndex === index && value !== "-") {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => handleChange(index, field, e.target.value)}
          className="w-20 rounded border border-[#C9C9C9] px-2 py-1 text-sm focus:outline-none"
        />
      );
    }

    return value === "-" ? "-" : `₹${value}`;
  };

  return (
    <div className="overflow-hidden rounded-lg border border-[#C9C9C9] bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            {[
              "Service Type",
              "A4 Price (₹)",
              "A3 Price (₹)",
              "B&W Price (₹)",
              "Color Price (₹)",
              "Status",
              "Actions",
            ].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {services.map((service, index) => {
            const isEditing = editingIndex === index;

            return (
              <tr key={service.name} className="border-t border-[#C9C9C9]">
                <td className="px-4 py-3 font-medium">{service.name}</td>

                <td className="px-4 py-3">
                  {renderCell(service, index, "a4")}
                </td>
                <td className="px-4 py-3">
                  {renderCell(service, index, "a3")}
                </td>
                <td className="px-4 py-3">
                  {renderCell(service, index, "bw")}
                </td>
                <td className="px-4 py-3">
                  {renderCell(service, index, "color")}
                </td>

                <td className="px-4 py-3">
                  <Toggle />
                </td>

                <td className="px-4 py-3 flex items-center gap-3">
                  {/* LEFT ICON */}
                  {isEditing ? (
                    <img
                      src="/cross.png"
                      alt="cancel"
                      className="w-7 h-7 cursor-pointer hover:bg-red-200 rounded-full p-1"
                      onClick={cancelEdit}
                    />
                  ) : (
                    <img
                      src="/editm.png"
                      alt="edit"
                      className="w-8 h-8 cursor-pointer hover:bg-gray-200 rounded-full "
                      onClick={() => startEdit(index)}
                    />
                  )}

                  {/* RIGHT ICON */}
                  {isEditing ? (
                    <img
                      src="/tick.png"
                      alt="save"
                      className="w-7 h-7 cursor-pointer hover:bg-green-300 rounded-full p-1"
                      onClick={saveEdit}
                    />
                  ) : (
                    <img
                      src="/delete.png"
                      alt="delete"
                      className="w-7 h-7 cursor-pointer hover:bg-gray-200 rounded-full p-1"
                      onClick={() => handleDelete(index)}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}