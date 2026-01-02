"use client";

import { useState } from "react";
import { FaPlus, FaMapMarkerAlt } from "react-icons/fa";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

type Address = {
  id: number;
  label: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  cityStatePincode: string;
  country: string;
  phone: string;
  isDefault: boolean;
};

const initialAddresses: Address[] = [
  {
    id: 1,
    label: "Home",
    name: "Jay Vasani",
    addressLine1: "144, Krishnapark Society, Nr. Radhika society",
    addressLine2: "Nansad Road, Nansad, Kamrej",
    cityStatePincode: "SURAT, GUJARAT 394185",
    country: "India.",
    phone: "9173664845",
    isDefault: true,
  },
  {
    id: 2,
    label: "Office",
    name: "Jay Vasani",
    addressLine1: "144, Krishnapark Society, Nr. Radhika society",
    addressLine2: "Nansad Road, Nansad, Kamrej",
    cityStatePincode: "SURAT, GUJARAT 394185",
    country: "India.",
    phone: "9173664845",
    isDefault: false,
  },
];

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [showMapModal, setShowMapModal] = useState(false);
const [showDetailsModal, setShowDetailsModal] = useState(false);
const [phone, setPhone] = useState("9173664845");

  const setAsDefault = (id: number) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const removeAddress = (id: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 21.1702,  // Surat latitude
  lng: 72.8311,  // Surat longitude
};

const { isLoaded } = useLoadScript({
  googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your API key
});
  return (
<>
  {/* Page Layout */}
  <div className="min-h-screen w-full bg-white px-6 py-8 md:px-12 md:py-12 text-[#000000]">
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-2xl font-semibold">Saved Addresses</h2>
        <p className="text-sm text-gray-500">Manage your shipping addresses.</p>
      </div>
      <button
        onClick={() => setShowMapModal(true)}
        className="group flex items-center gap-2 bg-[#F4F7FA] border border-[#06044B] px-4 py-2 rounded-md text-sm hover:bg-[#06044B] hover:text-white transition-colors duration-200"
      >
        <div className="w-5 h-5 rounded-full bg-[#F4F7FA] flex items-center justify-center border border-[#06044B] group-hover:bg-white group-hover:scale-110 transition-all duration-200">
          <FaPlus className="text-[#06044B] text-xs transition-colors duration-200" />
        </div>
        Add New Address
      </button>
    </div>

    <div className="flex gap-6 overflow-x-auto">
      {addresses.map((addr) => (
        <div
          key={addr.id}
          className="bg-[#F4F7FA] rounded-lg p-6 w-[360px] shrink-0"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{addr.label}</h3>
            {addr.isDefault && (
              <span className="text-xs bg-white border border-gray-300 px-2 py-0.5 rounded-full">
                Default
              </span>
            )}
          </div>
          <p className="font-semibold">{addr.name}</p>
          <p>{addr.addressLine1}</p>
          <p>{addr.addressLine2}</p>
          <p>{addr.cityStatePincode}</p>
          <p>{addr.country}</p>
          <p className="mt-1">Phone number: {addr.phone}</p>

          <div className="mt-4 flex gap-4 text-sm flex-wrap">
            <button className="hover:underline">Edit</button>
            <span>|</span>
            <button
              onClick={() => removeAddress(addr.id)}
              className="hover:underline"
            >
              Remove
            </button>
            {!addr.isDefault && (
              <>
                <span>|</span>
                <button
                  onClick={() => setAsDefault(addr.id)}
                  className="hover:underline"
                >
                  Set as Default
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Step 1: Map Modal */}
  {showMapModal && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-75"
      onClick={() => setShowMapModal(false)}
    >
      <div
        className="bg-white w-full max-w-lg h-[90vh] rounded-xl overflow-hidden shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <input
            type="text"
            placeholder="Search by area, street name..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-[#000000]"
          />
        </div>

        <div className="flex-1 relative">
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-10 pointer-events-none">
    <FaMapMarkerAlt className="text-red-500 text-3xl drop-shadow" />
  </div>
  {isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={15}
    />
  ) : (
    <p className="text-center mt-20">Loading map...</p>
  )}
</div>

        <div className="bg-white p-4 rounded-t-2xl shadow-xl">
          <button className="w-full border border-green-500 text-green-600 py-2 rounded-full flex justify-center items-center gap-2 mb-4">
            <span className="text-sm">📍</span> Go to current location
          </button>

          <p className="text-xs text-gray-500 mb-1">DELIVERING YOUR ORDER TO</p>
          <div className="border rounded-md p-3 mb-2">
            <p className="font-semibold text-black">
              <FaMapMarkerAlt className="inline-block mr-1 text-green-500" />
              Signet mall, Mota varacha, surat, india
            </p>
            <p className="text-sm text-gray-500">Mota Varacha</p>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                setShowMapModal(false);
                setShowDetailsModal(true);
              }}
              className="flex-1 py-2 border border-[#06044B] text-[#06044B] rounded-lg"
            >
              Add more address details
            </button>
            <button className="flex-1 py-2 bg-[#06044B] text-white rounded-lg">
              Save address
            </button>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* Step 2: Form Modal */}
  {showDetailsModal && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-75"
      onClick={() => setShowDetailsModal(false)}
    >
      <div
        className="bg-white w-full max-w-lg max-h-[90vh] rounded-xl overflow-auto p-6 text-[#000000]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Address</h2>
          <button
            onClick={() => setShowDetailsModal(false)}
            className="text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="border rounded-lg px-4 py-3 flex justify-between items-center mb-4">
         <p className="text-sm font-medium text-black">
  <FaMapMarkerAlt className="inline mr-2 text-green-600" />
  Signet mall, Mota varacha, Surat, India
</p>

          <span className="text-sm text-green-600 font-semibold">CHANGE</span>
        </div>

        <input
          type="text"
          placeholder="Flat / House no. / Building name*"
          className="w-full p-3 border border-gray-300 rounded-lg mb-3"
        />
        <input
          type="text"
          placeholder="Floor (Optional)"
          className="w-full p-3 border border-gray-300 rounded-lg mb-3"
        />
        <input
          type="text"
          placeholder="Nearby landmark (Optional)"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        <label className="text-sm mb-2 block">
          Enter your details for seamless delivery experience
        </label>
        <input
          type="text"
          placeholder="Your name*"
          className="w-full p-3 border border-gray-300 rounded-lg mb-3"
        />
        <div className="relative mb-4">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg pr-10"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-semibold">
            ✕
          </button>
        </div>

        <p className="text-sm font-medium mb-2">Save address as</p>
        <div className="flex gap-3 flex-wrap mb-6">
          {["Home", "Work", "Collage", "Other"].map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 border border-gray-300 rounded-full text-sm"
            >
              {tag}
            </button>
          ))}
        </div>

        <button className="w-full bg-[#06044B] text-white py-3 rounded-lg font-semibold">
          Confirm address
        </button>
      </div>
    </div>
  )}
</>

  );
}
