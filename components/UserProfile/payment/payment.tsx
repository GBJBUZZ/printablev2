"use client";

import { useState } from "react";
import { FaPlus, FaCreditCard, FaUniversity } from "react-icons/fa";
import { IoMdClose, IoIosArrowDown, IoMdEye, IoMdEyeOff } from "react-icons/io";

type Card = {
  name: string;
  number: string;
  expiry: string;
  isDefault?: boolean;
};

export default function PaymentMethods() {
  const [cards, setCards] = useState<Card[]>([
    {
      name: "JAY MAHESHBHAI VASANI",
      number: "2154 8484 2056 5678",
      expiry: "10/50",
      isDefault: true,
    },
    {
      name: "JAY VASANI",
      number: "2310 5641 3254 7800",
      expiry: "09/30",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState<"card" | "bank" | null>(null);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardNick, setCardNick] = useState("");

  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [showCVV, setShowCVV] = useState(false);
  const [cvv, setCvv] = useState("");

  const setAsDefault = (index: number) => {
    setCards((prev) =>
      prev.map((card, i) => ({ ...card, isDefault: i === index }))
    );
  };

  return (
    <div className="text-black">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-semibold">Payment Methods</h2>
          <p className="text-sm text-gray-500">Manage your saved payment cards.</p>
        </div>
        <button
  onClick={() => setShowModal(true)}
  className="group flex items-center gap-2 bg-[#F4F7FA] border border-[#06044B] px-4 py-2 rounded-md text-sm text-black hover:bg-[#06044B] hover:text-white transition-colors duration-200"
>
  <div
    className="w-5 h-5 rounded-full bg-[#F4F7FA] flex items-center justify-center border border-[#06044B] transition-all duration-200 group-hover:bg-white group-hover:scale-110"
  >
    <FaPlus className="text-[#06044B] text-xs transition-colors duration-200" />
  </div>
  Add New Card
</button>

      </div>

      <div className="flex flex-wrap gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-[#F4F7FA] rounded-3xl w-[320px] overflow-hidden flex flex-col justify-between"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{card.name}</h3>
                {card.isDefault && (
                  <span className="text-xs bg-white text-black px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Card Number</p>
                <p className="text-base font-medium tracking-wide">{card.number}</p>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Expiry Date</p>
                <p className="text-base font-medium">{card.expiry}</p>
              </div>
            </div>

            <div className="bg-[#E6E6ED] px-6 py-3 text-sm text-gray-700 flex gap-4">
              <button className="hover:underline">Edit</button>
              <span>|</span>
              <button className="hover:underline">Remove</button>
              {!card.isDefault && (
                <>
                  <span>|</span>
                  <button
                    className="hover:underline"
                    onClick={() => setAsDefault(index)}
                  >
                    Set as Default
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-75">

          <div className="bg-white rounded-xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-black"
            >
              <IoMdClose size={20} />
            </button>

            <h3 className="text-lg font-semibold mb-1">Payment Methods</h3>
            <p className="text-sm text-gray-500 mb-4">
              Manage your saved payment cards.
            </p>

            {/* CREDIT/DEBIT CARD */}
            <div
              onClick={() => setExpanded(expanded === "card" ? null : "card")}
              className="flex items-center justify-between py-3 border-t border-b cursor-pointer"
            >
              <div className="flex items-center gap-3 text-gray-700 font-medium">
                <FaCreditCard />
                CREDIT/DEBIT CARD
              </div>
              <IoIosArrowDown
                className={`transition-transform ${
                  expanded === "card" ? "rotate-180" : ""
                }`}
              />
            </div>

            {expanded === "card" && (
              <div className="space-y-4 mt-4">
                <input
                  type="text"
                  placeholder="enter card number"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Expiry date (mm/yy)"
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                  />
                  <div className="flex items-center border rounded-md px-3 py-2">
      <input
        type={showCVV ? "text" : "password"}
        placeholder="CVV"
        className="flex-1 outline-none text-sm"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />
      <button
        type="button"
        onClick={() => setShowCVV((prev) => !prev)}
        className="ml-2 text-gray-600 focus:outline-none"
      >
        {showCVV ? <IoMdEyeOff /> : <IoMdEye />}
      </button>
    </div>

                </div>
                <input
                  type="text"
                  placeholder="Nick name for card (Optional)"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={cardNick}
                  onChange={(e) => setCardNick(e.target.value)}
                />
              </div>
            )}

            {/* NET BANKING */}
            <div
              onClick={() => setExpanded(expanded === "bank" ? null : "bank")}
              className="flex items-center justify-between py-3 mt-6 border-t cursor-pointer"
            >
              <div className="flex items-center gap-3 text-gray-700 font-medium">
                <FaUniversity />
                NET BANKING
              </div>
              <IoIosArrowDown
                className={`transition-transform ${
                  expanded === "bank" ? "rotate-180" : ""
                }`}
              />
            </div>

            {expanded === "bank" && (
              <div className="space-y-4 mt-4">
                <input
                  type="text"
                  placeholder="enter account number"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="re – enter account number"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={confirmAccountNumber}
                  onChange={(e) => setConfirmAccountNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="enter IFSC code"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="enter account holder name"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                />
              </div>
            )}

            {/* Save Method */}
            <div className="flex justify-end pt-6">
              <button
                className="bg-[#09004B] text-white px-6 py-2 rounded-md text-sm"
                onClick={() => {
                  // handle form submission
                  setShowModal(false);
                }}
              >
                Save Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
