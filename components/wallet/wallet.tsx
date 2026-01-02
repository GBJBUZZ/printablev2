'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown, IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { FaCreditCard, FaUniversity } from 'react-icons/fa';

export default function wallet() {

    const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
    const [showRedeemModal, setShowRedeemModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [expanded, setExpanded] = useState<'upi' | 'card' | 'bank' | null>(null);
const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const addBalanceRef = useRef<HTMLDivElement>(null);
const paymentRef = useRef<HTMLDivElement>(null);
const [cardNumber, setCardNumber] = useState('');
const [expiry, setExpiry] = useState('');
const [cvv, setCvv] = useState('');
const [cardNick, setCardNick] = useState('');
const [showCVV, setShowCVV] = useState(false);
const [accountNumber, setAccountNumber] = useState('');
const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
const [ifsc, setIfsc] = useState('');
const [accountHolder, setAccountHolder] = useState('');

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      showAddBalanceModal &&
      addBalanceRef.current &&
      !addBalanceRef.current.contains(event.target as Node)
    ) {
      setShowAddBalanceModal(false);
    }
    if (
      showPaymentModal &&
      paymentRef.current &&
      !paymentRef.current.contains(event.target as Node)
    ) {
      setShowPaymentModal(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [showAddBalanceModal, showPaymentModal]);

  return (
    <>
    <div className="min-h-screen w-full bg-white px-6 py-8 md:px-12 md:py-12 text-[#000000]">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">Printable Wallet</h1>
          </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* PrintPay Balance */}
            <div className="bg-[#F4F7FA] rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">PrintPay Balance</h2>
              <p className="text-3xl font-bold">₹0</p>
              <button
                onClick={() => setShowAddBalanceModal(true)}
                className="w-full mt-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
              >
                Add Money
              </button>
              <p className="text-sm text-center mt-2">
                Have a gift card?{' '}
                <span
  onClick={() => {
    setShowAddBalanceModal(false);
    setShowRedeemModal(true);
  }}
  className="text-green-600 font-medium cursor-pointer hover:underline"
>
  Redeem Now
</span>
              </p>
            </div>
    </div>
    </div>
    </div>
    
    {/* Add Balance Modal */}
          {showAddBalanceModal && (
            <div className="fixed inset-0 z-50 backdrop-brightness-75 flex items-center justify-center">
        <div ref={addBalanceRef} className="bg-white rounded-xl w-[90%] max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-xl text-black">Add Balance</h2>
                  <button onClick={() => setShowAddBalanceModal(false)}
                    className="text-black text-xl hover:opacity-70">&times;</button>
                </div>
                <p className="text-sm text-black mb-4">Available balance: ₹0</p>
                <input
                  type="number"
                  placeholder="Enter Amount"
                  className="w-full border rounded-xl text-black  px-3 py-2 mb-4"
                />
                <div className="grid grid-cols-4 gap-2 mb-4 text-black ">
                  {[500, 1000, 2500, 4000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setSelectedAmount(amt)}
    className={`border rounded-lg py-2 transition ${
      selectedAmount === amt ? 'bg-[#0a075f] text-white' : 'bg-white text-black'
    }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-center text-gray-600 mb-4">
                  Have a gift card?{' '}
                  <span
      onClick={() => {
        setShowAddBalanceModal(false);
        setShowRedeemModal(true);
      }}
      className="text-green-600 font-medium cursor-pointer hover:underline"
    >
      Redeem Now
    </span>
                </p>
                <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-700 space-y-2 mb-4">
                  <p>• PrintPay balances are valid for 1 year from the date of credit.</p>
                  <p>• Cannot be transferred to your bank account as per RBI guidelines.</p>
                  <p>• Can be used for print orders, deliveries, and more.</p>
                </div>
                <button
                  className="w-full bg-[#0a075f] text-white py-2 rounded-xl"
                  onClick={() => {
                    setShowAddBalanceModal(false);
                    setShowPaymentModal(true);
                  }}
                >
                  Choose Payment Method
                </button>
              </div>
            </div>
          )}
    
          {/* Redeem Voucher Modal */}
    {showRedeemModal && (
      <div className="fixed inset-0 z-50 backdrop-brightness-75 flex items-center justify-center">
        <div className="bg-white rounded-lg w-[90%] max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-xl text-black">Add Voucher</h2>
            <button
              onClick={() => setShowRedeemModal(false)}
              className="text-black text-xl hover:opacity-70"
            >
              &times;
            </button>
          </div>
    
          <p className="text-sm text-gray-600 mb-4">Available balance: ₹0</p>
    
          <div className="space-y-3 bg-gray-100 p-4 rounded-xl mb-6 border-[#C9C9C9]">
            <input
              type="text"
              placeholder="Enter gift card code"
              className="w-full border rounded-xl px-3 py-2 text-sm text-black border-[#C9C9C9]"
            />
            <input
              type="password"
              placeholder="Enter PIN"
              className="w-full border rounded-xl px-3 py-2 text-sm text-black border-[#C9C9C9]"
            />
          </div>
    
          <div className="mb-4">
            <h3 className="font-semibold text-sm mb-2 text-black">How it works</h3>
            <div className="bg-gray-100 rounded-md p-4 text-sm text-gray-700 space-y-2">
              <p>• Enter your 16-digit PrintPay voucher code received on your registered email or phone number.</p>
              <p>• Once redeemed, you can use PrintPay for printing services and other purchases on Printable.</p>
              <p>• Your PrintPay balance cannot be transferred to a bank account or another PrintPay account, as per RBI guidelines.</p>
              <p>• You cannot use PrintPay balance to buy gift vouchers.</p>
            </div>
          </div>
    
          <button className="w-full bg-[#0a075f] text-white py-2 rounded-xl">
            Claim Gift Card
          </button>
        </div>
      </div>
    )}
    
    
          {/* Choose Payment Modal */}
          {showPaymentModal && (
            <div className="fixed inset-0 z-50 backdrop-brightness-50 flex items-center justify-center">
              <div ref={paymentRef} className="bg-white rounded-lg w-[90%] max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-xl text-black">Select Payment</h2>
                  <button onClick={() => setShowPaymentModal(false)}
                    className="text-black text-xl hover:opacity-70">&times;</button>
                </div>
                <p className="text-sm text-gray-600 mb-4">Add ₹{selectedAmount} to PrintPay</p>
    
                {/* UPI */}
                <div
                  onClick={() => setExpanded(expanded === 'upi' ? null : 'upi')}
                  className="flex items-center justify-between py-3 cursor-pointer border-b"
                >
                  <div className="flex items-center gap-3 font-medium text-black">
                    <Image src="/upi.png" alt="UPI" width={24} height={24} />
                    UPI
                  </div>
                  <IoIosArrowDown
                    className={`transition-transform ${expanded === 'upi' ? 'rotate-180' : ''}`}
                  />
                </div>
                {expanded === 'upi' && (
                  <div className="pl-8 pt-4 space-y-3 text-black">
                    {['Google Pay', 'Phone Pay', 'Pay via UPI'].map((option, i) => (
                      <label key={i} className="flex items-center gap-3 text-sm">
                        <input type="radio" name="upi" />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
    
                {/* CARD */}
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
        className={`transition-transform ${expanded === "bank" ? "rotate-180" : ""}`}
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
    
    
    
                <button className="mt-6 w-full bg-[#0a075f] text-white py-2 rounded-md">
                  Pay ₹{selectedAmount} Via (Selected Method)
                </button>
              </div>
            </div>
          )}
    </>
  );
}