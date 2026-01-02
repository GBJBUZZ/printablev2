"use client";

import { useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdEye,
  IoMdEyeOff,
} from "react-icons/io";
import { FaCreditCard, FaUniversity } from "react-icons/fa";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("wallet");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(15.5);
  const [showUPIOptions, setShowUPIOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardNick, setCardNick] = useState("");
  const [showCVV, setShowCVV] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  const handlePromoApply = () => {
    // Logic to apply promo
  };

  const addressData = {
    name: "Jay",
    address: "184 Surthana Jakat Naka, Nana Varachha Surat, Gujarat, India",
  };

  const orderSummary = {
    subtotal: 750,
    deliveryCharges: 20,
    taxRate: 8,
    tax: 18.0,
    grandTotal: 768.0,
  };

  const shopData = {
    name: "Print Master Shop",
    description: "Total 3 Items (25 Pages)",
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        {/* Left Section */}
        <div className="col-span-2 space-y-6">
          <h2 className="text-xl font-semibold">Select Payment Method</h2>

          {/* Payment Method Box */}
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <label
              htmlFor="wallet"
              className={`border rounded-xl p-4 cursor-pointer flex items-center justify-between transition-colors duration-200 ${
                selectedMethod === "wallet"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div>
                <p className="font-medium">Use Printable Wallet</p>
                <p className="text-sm text-gray-600">Balance (₹1000.00)</p>
              </div>
              <input
                type="radio"
                id="wallet"
                name="paymentMethod"
                value="wallet"
                checked={selectedMethod === "wallet"}
                onChange={() => setSelectedMethod("wallet")}
                className="accent-green-600 w-4 h-4"
              />
            </label>

            {/* UPI */}
            <div className="border border-gray-200 rounded-xl p-4 cursor-pointer">
              <div
                onClick={() => setExpanded(expanded === "upi" ? null : "upi")}
                className="flex items-center justify-between py-3 cursor-pointer border-b"
              >
                <div className="flex items-center gap-3 font-medium text-black">
                  <Image src="/upi.png" alt="UPI" width={24} height={24} />
                  UPI
                </div>
                <IoIosArrowDown
                  className={`transition-transform duration-300 ${
                    expanded === "upi" ? "rotate-180" : ""
                  }`}
                />
              </div>

              {expanded === "upi" && (
                <div className="pl-8 pt-4 space-y-3 text-black">
                  {["Google Pay", "Phone Pay", "Pay via UPI"].map(
                    (option, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-3 text-sm"
                      >
                        <input type="radio" name="upi" />
                        {option}
                      </label>
                    )
                  )}
                </div>
              )}

              {showUPIOptions && (
                <div className="pl-8 pt-4 space-y-3 text-black">
                  {[
                    { label: "Google Pay", icon: "/Google Pay.png" },
                    { label: "Phone Pay", icon: "/phonepe.png" },
                    { label: "Pay via UPI", icon: "/upi.png" },
                  ].map((option, i) => (
                    <label key={i} className="flex items-center gap-3 text-sm">
                      <input type="radio" name="upi" />
                      <Image
                        src={option.icon}
                        alt={option.label}
                        width={24}
                        height={24}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* CARD */}
            <div className="border border-gray-200 rounded-xl p-4 cursor-pointer">
              <div
                onClick={() => setExpanded(expanded === "card" ? null : "card")}
                className="flex items-center justify-between py-3 border-t border-b cursor-pointer"
              >
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <FaCreditCard />
                  CREDIT/DEBIT CARD
                </div>
                <IoIosArrowDown
                  className={`transition-transform duration-300 ${
                    expanded === "card" ? "rotate-180" : ""
                  }`}
                />
              </div>

              {expanded === "card" && (
                <div className="space-y-4 mt-4">
                  <input
                    type="text"
                    placeholder="enter card number"
                    className="w-full border rounded-md px-3 py-2 text-sm text-black"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Expiry date (mm/yy)"
                      className="w-full border rounded-md px-3 py-2 text-sm text-black"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                    />
                    <div className="flex items-center border rounded-md px-3 py-2 w-full">
                      <input
                        type={showCVV ? "text" : "password"}
                        placeholder="CVV"
                        className="flex-1 outline-none text-sm text-black bg-transparent"
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
                    className="w-full border rounded-md px-3 py-2 text-sm text-black"
                    value={cardNick}
                    onChange={(e) => setCardNick(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* NET BANKING */}
            <div className="border border-gray-200 rounded-xl p-4 cursor-pointer">
              <div
                onClick={() => setExpanded(expanded === "bank" ? null : "bank")}
                className="flex items-center justify-between py-3 border-t cursor-pointer"
              >
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <FaUniversity />
                  NET BANKING
                </div>
                <IoIosArrowDown
                  className={`transition-transform duration-300 ${
                    expanded === "bank" ? "rotate-180" : ""
                  }`}
                />
              </div>

              {expanded === "bank" && (
                <div className="space-y-4 mt-4">
                  <input
                    type="text"
                    placeholder="enter account number"
                    className="w-full border rounded-md px-3 py-2 text-sm text-black"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="re – enter account number"
                    className="w-full border rounded-md px-3 py-2 text-sm text-black"
                    value={confirmAccountNumber}
                    onChange={(e) => setConfirmAccountNumber(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="enter IFSC code"
                    className="w-full border rounded-md px-3 py-2 text-sm text-black"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="enter account holder name"
                    className="w-full border rounded-md px-3 py-2 text-sm text-black"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                  />
                </div>
              )}
            </div>

            <p className="text-center text-green-600 text-sm mt-4">
              🔒 Secure Payment
            </p>
          </div>

          {/* Promo Code Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-semibold">Promo Code</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="ENTER PROMO CODE"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <button
                onClick={handlePromoApply}
                className="px-6 py-2 bg-black text-white rounded-lg text-sm"
              >
                Apply
              </button>
            </div>

            {/* Promo Options */}
            <div className="space-y-2">
              {[
                {
                  code: "FIRST10",
                  desc: "10% off on first order",
                  discount: "10% OFF",
                },
                {
                  code: "SAVE5",
                  desc: "₹5 off on orders above ₹25",
                  discount: "₹5 OFF",
                },
                {
                  code: "STUDENT20",
                  desc: "20% off for students",
                  discount: "20% OFF",
                },
              ].map((promo, i) => (
                <div
                  key={i}
                  className="border border-green-500 rounded-lg p-3 text-sm flex justify-between"
                >
                  <div>
                    <p className="font-medium">{promo.code}</p>
                    <p className="text-gray-600">{promo.desc}</p>
                  </div>
                  <span className="text-green-600 font-semibold">
                    {promo.discount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary + Bill Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Order Summary</h3>
            <div className="text-sm text-green-600 space-x-2">
              <button>Edit</button>
              <span>•</span>
              <button>Remove</button>
            </div>
          </div>

          {/* Files */}
          <div className="space-y-4 text-sm">
            {[122.5, 320, 256].map((price, i) => (
              <div key={i} className="flex justify-between">
                <div>
                  <p className="font-medium">
                    File {i + 1} - Jay Vasani UX nhj& Pro
                  </p>
                  <p className="text-gray-600">
                    1 page, Black & White, Portrait
                    <br />
                    15 Copies
                  </p>
                </div>
                <p className="text-green-600 font-semibold">₹{price}</p>
              </div>
            ))}
          </div>

          {/* Bill Summary */}
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>₹{orderSummary.subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery charges</p>
              <p>₹{orderSummary.deliveryCharges}</p>
            </div>
            <div className="flex justify-between">
              <p>Tax ({orderSummary.taxRate}%)</p>
              <p>₹{orderSummary.tax}</p>
            </div>
            <div className="flex justify-between text-green-600">
              <p>Discount Applied</p>
              <p>-₹{discount.toFixed(2)}</p>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <p>Grand total</p>
              <p>₹{orderSummary.grandTotal}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div className="flex-1">
                <p className="font-medium text-green-800">Delivering to Home</p>
                <p className="text-sm text-green-700">
                  {addressData.name}, {addressData.address}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Print Master Shop"
                    className="w-10 h-10 mx-auto mb-1"
                  />
                  <p className="font-medium text-sm">{shopData.name}</p>
                  <p className="text-xs text-gray-600">
                    {shopData.description}
                  </p>
                </div>
                <Button
                  className="bg-blue-900 hover:bg-blue-800 text-white px-8"
                  disabled={!selectedPayment}
                >
                  Pay ₹ {orderSummary.grandTotal}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Message */}
      <div className="text-center mt-8 py-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Your money is always safe
        </h3>
        <p className="text-gray-600">100% secure payments</p>
      </div>
    </div>
  );
}
