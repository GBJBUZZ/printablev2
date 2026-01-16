import Sidebar from "@/components/sidebar/page";
import Topbar from "@/components/topbar/page";
import Link from "next/link";

type OrderStatus = "Printing" | "New" | "Ready" | "Completed";

const orders: {
  id: string;
  type: string;
  qty: string;
  date: string;
  status: OrderStatus;
  amount: string;
}[] = [
  {
    id: "#ORD-7829",
    type: "Business Cards",
    qty: "500 pcs",
    date: "Apr 21, 2025",
    status: "Printing",
    amount: "₹120.00",
  },
  {
    id: "#ORD-7828",
    type: "Flyers",
    qty: "1000 pcs",
    date: "Apr 20, 2025",
    status: "New",
    amount: "₹245.00",
  },
  {
    id: "#ORD-7827",
    type: "Brochures",
    qty: "250 pcs",
    date: "Apr 19, 2025",
    status: "Ready",
    amount: "₹350.00",
  },
  {
    id: "#ORD-7826",
    type: "Posters",
    qty: "50 pcs",
    date: "Apr 19, 2025",
    status: "Completed",
    amount: "₹175.00",
  },
  {
    id: "#ORD-7825",
    type: "Glossy Notice",
    qty: "5 pcs",
    date: "Apr 19, 2025",
    status: "Completed",
    amount: "₹220.00",
  },
];

const statusColor = {
  Printing: "bg-yellow-100 text-yellow-600",
  New: "bg-blue-100 text-blue-600",
  Ready: "bg-green-100 text-green-600",
  Completed: "bg-purple-100 text-purple-600",
};

export default function OrdersPage() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <main className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Orders</h2>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white h-[120px] rounded-[14px] px-6 py-4 shadow-sm relative overflow-hidden">
              <img
                src="/icons/order11.png"
                className="absolute top-4 right-6 w-8 h-8"
              />
              <p className="text-[15px] font-medium text-gray-600">
                Today's Orders
              </p>

              <div className="flex items-end gap-2 mt-1">
                <p className="text-[32px] font-bold leading-tight">24</p>
                <p className="text-xs text-green-600 mb-1">↑ 12%</p>
              </div>

              <p className="text-xs text-gray-400 leading-tight">
                vs. 21 yesterday
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white h-[120px] rounded-[14px] px-6 py-4 shadow-sm relative overflow-hidden">
              <img
                src="/icons/clock.png"
                className="absolute top-4 right-6 w-8 h-8"
              />
              <p className="text-[15px] font-medium text-gray-600">
                Pending Orders
              </p>

              <div className="flex items-end gap-2 mt-1">
                <p className="text-[32px] font-bold leading-tight">18</p>
                <p className="text-xs text-red-500 mb-1">↑ 5%</p>
              </div>

              <p className="text-xs text-gray-400 leading-tight">
                vs. 17 yesterday
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white h-[120px] rounded-[14px] px-6 py-4 shadow-sm relative overflow-hidden">
              <img
                src="/icons/rupees.png"
                className="absolute top-4 right-6 w-8 h-8"
              />
              <p className="text-[15px] font-medium text-gray-600">
                Today's Revenue
              </p>

              <div className="flex items-end gap-2 mt-1">
                <p className="text-[32px] font-bold leading-tight">₹1,842</p>
                <p className="text-xs text-green-600 mb-1">↑ 8%</p>
              </div>

              <p className="text-xs text-gray-400 leading-tight">
                vs. ₹1,705 yesterday
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white h-[120px] rounded-[14px] px-6 py-4 shadow-sm relative overflow-hidden">
              <img
                src="/icons/allright.png"
                className="absolute top-4 right-6 w-8 h-8"
              />
              <p className="text-[15px] font-medium text-gray-600">
                Accepted Orders
              </p>

              <div className="flex items-end gap-2 mt-1">
                <p className="text-[32px] font-bold leading-tight">12</p>
                <p className="text-xs text-green-600 mb-1">↑ 20%</p>
              </div>

              <p className="text-xs text-gray-400 leading-tight">
                vs. 10 yesterday
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.04)] mt-6">
            {/* Filters */}
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 border border-gray-200 rounded-[8px] px-3 py-2 text-[13px] text-gray-500 w-[260px]">
                  <img
                    src="/icons/searchicon.png"
                    className="w-4 h-4 opacity-60"
                  />
                  <input
                    placeholder="Search orders, customers"
                    className="outline-none w-full bg-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="border border-gray-200 rounded-[8px] p-2 flex items-center justify-center">
                  <img src="/icons/sorticon.png" className="w-4 h-4" />
                </button>

                <button className="border border-gray-200 rounded-[8px] px-4 py-2 text-[13px] text-gray-500 flex items-center gap-2">
                  All Status
                  
                  <img src="/icons/downicon.png" className="w-4 h-4 " />
                  
                </button>

                <button className="border border-gray-200 rounded-[8px] px-4 py-2 text-[13px] text-gray-500 flex items-center gap-2">
                  All Types
                  <img src="/icons/downicon.png" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-[16px]">
              <thead className="bg-[#F0F1F5] text-gray-600 ">
                <tr>
                  {[
                    "ORDER ID",
                    "CUSTOMER",
                    "PRINT JOB TYPE",
                    "QUANTITY",
                    "DUE DATE",
                    "STATUS",
                    "AMOUNT",
                    "ACTIONS",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-[15px] font-medium tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t border-gray-100">
                    <td className="px-6 py-4 text-[#06044B] font-medium">
                      {o.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src="/icons/customer.png"
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-gray-700">
                            Emma Thompson
                          </p>
                          <p className="text-[11px] text-gray-400">
                            emma.t@example.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{o.type}</td>
                    <td className="px-6 py-4 text-gray-600">{o.qty}</td>
                    <td className="px-6 py-4 text-gray-600">{o.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-[5px] rounded-full text-[11px] font-medium inline-flex items-center gap-1 ${
                          statusColor[o.status]
                        }`}
                      >
                        {o.status}
                        <img
                          src="/icons/dropdownicon.png"
                          className="w-2 h-2"
                        />
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{o.amount}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-4 text-gray-400">
                        <Link href="/company/merchant/order-page-overview" >
                        <img
                          src="/icons/viewicon.png"
                          className="w-[35px] h-[35px] cursor-pointer"
                        /></Link>
                        <img
                          src="/icons/deleteicon.png"
                          className="w-[35px] h-[35px]"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
