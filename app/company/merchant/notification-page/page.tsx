import Sidebar from "@/components/sidebar/page";
import Topbar from "@/components/topbar/page";

type NotificationType =
  | "order"
  | "pickup"
  | "stock"
  | "payment"
  | "announcement";

const notifications: {
  id: number;
  title: string;
  desc: string;
  date: string;
  type: NotificationType;
  action: string | null;
  unread: boolean;
}[] = [
  {
    id: 1,
    title: "New Order Received",
    desc: "Order #10045 for Anil Singh is awaiting your confirmation",
    date: "07 May",
    type: "order",
    action: "View Order",
    unread: true,
  },
  {
    id: 2,
    title: "Order Ready for Pickup",
    desc: "Order #10042 for Anil Singh is ready for pickup",
    date: "07 May",
    type: "pickup",
    action: "Mark as read",
    unread: false,
  },
  {
    id: 3,
    title: "Low Inventory Alert",
    desc: "A4 paper stock is running low. Consider restocking soon.",
    date: "06 May",
    type: "stock",
    action: "Restock now",
    unread: false,
  },
  {
    id: 4,
    title: "Payment Received",
    desc: "Payment of ₹450 has been credited to your wallet",
    date: "07 May",
    type: "payment",
    action: null,
    unread: false,
  },
  {
    id: 5,
    title: "Platform Update",
    desc: "New features have been added to your merchant dashboard",
    date: "06 May",
    type: "announcement",
    action: "Learn more",
    unread: false,
  },
];

const notificationIcons: Record<NotificationType, string> = {
  order: "/icons/order-bag.png",
  pickup: "/icons/redy-order.png",
  stock: "/icons/low-inventor.png",
  payment: "/icons/payment-received.png",
  announcement: "/icons/platform-update.png",
};

export default function NotificationsPage() {
  return (
    <div className="flex bg-[#EEF0F5] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <main className="p-6">
          <div className="bg-[#F4F8FF] rounded-[12px] shadow-sm max-w-[760px] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 ">
              <div className="flex items-center gap-2">
                <img src="/icons/bellimage.png" className="w-4 h-4" />
                <h2 className="text-[25px] font-semibold">Notifications</h2>
                <span className="bg-red-500 text-white text-[10px] px-2 py-[2px] rounded-full">
                  2 new
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button className="bg-[#0B1C48] text-white text-[11px] px-4 py-[6px] rounded">
                  Mark all read
                </button>
                <button className="bg-[#0B1C48] text-white text-[11px] px-4 py-[6px] rounded">
                  Clear all
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-[#F2F4F8] px-4 py-1 rounded ml-3 mr-3">
              <div className="flex text-[12px] gap-3">
                <button className="bg-white px-25 py-[6px] rounded text-[#0B1C48] font-medium shadow-sm">
                  All
                </button>
                <button className="px-10 py-[6px] text-[#0B1C48]">
                  Orders
                </button>
                <button className="px-10 py-[6px] text-[#0B1C48]">
                  Stock Alerts
                </button>
                <button className="px-10 py-[6px] text-[#0B1C48]">
                  Announcements
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="p-4 space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`rounded-[8px] border border-gray-200 p-4 flex gap-3 ${
                    n.unread ? "bg-[#F4F8FF]" : "bg-[#F4F8FF]"
                  }`}
                >
                  {/* ICON */}
                  <img src={notificationIcons[n.type]} className="w-8 h-8" />

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-[13px] font-medium text-gray-800">
                        {n.title}
                      </p>
                      <span className="text-[11px] text-gray-800">
                        {n.date}
                      </span>
                    </div>

                    <p className="text-[12px] text-gray-500 mt-[2px]">
                      {n.desc}
                    </p>

                    <div className="flex justify-between items-center mt-2">
                      {n.action ? (
                        <button
                          className={`text-[11px] px-3 py-[4px] rounded font-medium
                         ${
                           n.action === "View Order"
                             ? "bg-[#0B1C48] text-white"
                             : "bg-[#E6EBF2] text-[#0B1C48]"
                         }
                        `}
                        >
                          {n.action}
                        </button>
                      ) : (
                        <span />
                      )}

                      {n.unread && (
                        <button className="text-[11px] text-gray-800">
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
