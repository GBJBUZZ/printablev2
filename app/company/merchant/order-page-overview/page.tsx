import Sidebar from "@/components/sidebar/page";
import Topbar from "@/components/topbar/page";

export default function OrderDetailsPage() {
  const items = [
    {
      id: 1,
      name: "Business Proposal.pdf",
      itemNo: "CNF47654448320532",
      copies: 20,
      price: "₹2450.00",
      logo: "/icons/logoprintable.png",
    },
    {
      id: 2,
      name: "Business Proposal.pdf",
      itemNo: "CNF47654448320532",
      copies: 20,
      price: "₹2450.00",
      logo: "/icons/gbjlogo.png",
    },
  ];

  return (
    <div className="flex bg-[#EEF0F5] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <main className="px-6 py-3">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-[17px] font-semibold text-gray-800">Orders</h1>
            <p className="text-[12px] text-gray-500">
              Orders /{" "}
              <span className="text-[#06044B] font-medium">
                Order ID: #10025
              </span>
            </p>
          </div>

          {/* Main Card */}
          <div className="flex gap-4">
            <div className="bg-white rounded-[10px] p-3 flex gap-3 flex-1">
              {/* Left */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between border-b border-gray-200 pb-[3px]">
                  <div className="flex items-start gap-2">
                    <p className="text-[12px] font-medium text-gray-700 leading-[14px]">
                      Order ID: #ORD-7829
                    </p>
                    <p className="text-[10px] text-gray-500 leading-[14px]">
                      Order Date & Time : 2025/04/22 11:53:32 am
                    </p>
                  </div>

                  <div className="flex items-center gap-[10px] pt-[5px]">
                    <span className="bg-yellow-100 text-yellow-700 text-[9px] px-[7px] py-[1px] rounded-full leading-none">
                      Priority: High
                    </span>
                    <span className="bg-purple-100 text-purple-700 text-[9px] px-[7px] py-[1px] rounded-full leading-none">
                      Ready for Pickup
                    </span>
                  </div>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#F1F2F6] border border-gray-200 rounded-[10px] px-4 py-3 flex justify-between items-center"
                  >
                    <div className="flex gap-3 items-center">
                      <div className="w-[90px] h-[88px]  rounded-lg flex items-center justify-center  overflow-hidden">
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>

                      <div className="leading-tight">
                        <p className="text-[13px] font-medium text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          Item No: {item.itemNo}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          Copies: {item.copies}
                        </p>
                      </div>
                    </div>

                    <p className="text-[13px] font-semibold text-gray-800">
                      {item.price}
                    </p>
                  </div>
                ))}

                <hr className="border-gray-200 my-3" />

                <div className="border border-gray-200 rounded-[10px] overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 text-[13px] font-medium text-gray-700">
                    <img src="/icons/contacticon.png" className="w-4 h-4" />
                    Customer Information
                  </div>

                  <div className="flex gap-3 items-center px-4 py-3">
                    <img
                      src="/icons/customer.png"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="leading-tight">
                      <p className="text-[13px] font-medium text-gray-800">
                        Emma Thompson{" "}
                        <span className="text-[11px] text-gray-500 ml-1">
                          emma.t@example.com
                        </span>
                      </p>
                      <p className="text-[11px] text-gray-500">
                        +91 845 684 2456
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle */}
              <div className="w-[300px] space-y-3 mt-7">
                {/* Print Options */}
                <div className="border border-gray-200 rounded-[12px] overflow-hidden mt-0">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 text-[13px] font-medium text-gray-800">
                    <img src="/icons/printicon.png" className="w-4 h-4" />
                    Print options
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 px-4 py-3 text-[11px]">
                    {[
                      ["Copies", "15"],
                      ["Paper Size", 'Letter (8.5" x 11")'],
                      ["Paper type", "Standard"],
                      ["Print Type", "Black & White"],
                      ["Orientation", "Portrait"],
                      ["Fulfillment", "Store Pickup"],
                      ["Duplex", "One - Sided"],
                      ["Collate", "Yes"],
                      ["Quality", "High Quality"],
                      ["Staple", "Yes"],
                      ["Scaling", "100%"],
                      ["", ""], // keeps grid even
                    ].map(([label, value], i) => (
                      <div key={i} className="space-y-[2px]">
                        <p className="text-gray-500">{label}</p>
                        <p className="text-gray-800 font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Details */}
                <div className="border border-gray-200 rounded-[12px] overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 text-[13px] font-medium text-gray-800">
                    <img src="/icons/printdetail.png" className="w-4 h-4" />
                    Payment Details
                  </div>

                  <div className="px-4 py-3 space-y-2 text-[11px]">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span className="text-gray-800 font-medium">₹ 750</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Pickup fee</span>
                      <span className="text-gray-800 font-medium">₹ 0.00</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Tax (8%)</span>
                      <span className="text-gray-800 font-medium">₹ 18.0</span>
                    </div>

                    <hr className="border-gray-300 my-1" />

                    <div className="flex justify-between font-semibold text-[12px] text-gray-900">
                      <span>Total</span>
                      <span>₹ 768.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="w-[320px] bg-white border border-gray-200 rounded-[12px] overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 text-[13px] font-medium text-gray-800">
                <img src="/icons/trackinglogo.png" className="w-4 h-4" />
                Track Delivery
              </div>

              {/* Map Image */}
              <div className="bg-[#F4F5F8] mt-2 ml-2 mr-2">
                <img
                  src="/icons/mapimage.png"
                  alt="Delivery Location"
                  className="w-full h-[200px] object-cover"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
