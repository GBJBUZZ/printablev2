"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";


type OrderStatus = "Shipped" | "Delivered" | "Processing" | "Cancelled";
type Priority = "High" | "Normal";

interface Order {
  orderDate: string;
  orderNo: string;
  productName: string;
  shop: string;
  address: string;
  estDelivery?: string;
  priority: Priority;
  status: OrderStatus;
  price: string;
  copies: number;
  progress: number;
  image: string;
  latitude?: string;
  longitude?: string;
  showTrack?: boolean;
  merchantId?: string;
}

interface Merchant {
  id: string;
  name: string;
  shopName: string;
  address: string;
  latitude: string;
  longitude: string;
  city: string;
  state: string;
}

const timelineSteps = [
  { status: "Processing", label: "Order Placed", progress: 20 },
  { status: "Shipped", label: "Shipped", progress: 60 },
  { status: "Delivered", label: "Delivered", progress: 100 },
];

export default function MyOrders() {
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [merchants, setMerchants] = useState<Record<string, Merchant>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const [filterStatus, setFilterStatus] = useState<"All" | OrderStatus>("All");
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);

  // Fetch merchant details
  const fetchMerchant = async (
    merchantId: string,
  ): Promise<Merchant | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/merchant/${merchantId}`,
      );
      if (!response.ok) throw new Error("Merchant not found");
      const data = await response.json();

      if (!data.success) throw new Error("Failed to fetch merchant");

      return {
        id: data.data.id,
        name: data.data.name,
        shopName: data.data.shopName,
        address: data.data.address,
        latitude: data.data.latitude,
        longitude: data.data.longitude,
        city: data.data.city,
        state: data.data.state,
      };
    } catch (error) {
      console.error(`Error fetching merchant ${merchantId}:`, error);
      return null;
    }
  };

  // Transform API order data
  const transformApiOrder = (apiOrder: any): Order => {
    const document = apiOrder.documents?.[0];

    const mapStatus = (status: string): OrderStatus => {
      switch (status.toLowerCase()) {
        case "completed":
          return "Delivered";
        case "in_progress":
          return "Shipped";
        case "pending":
          return "Processing";
        case "cancelled":
          return "Cancelled";
        default:
          return "Processing";
      }
    };

    return {
      orderDate: new Date(apiOrder.createdAt).toLocaleString(),
      orderNo: apiOrder.id,
      productName: document?.fileName || "Document",
      shop: `Merchant ID: ${apiOrder.merchantId}`,
      address:
        apiOrder.address ||
        `${apiOrder.city || ""} ${apiOrder.state || ""}`.trim() ||
        "Address not specified",
      estDelivery: apiOrder.scheduledPrintTime
        ? `Scheduled for ${new Date(apiOrder.scheduledPrintTime).toLocaleString()}`
        : undefined,
      priority: apiOrder.fulfillmentType === "takeaway" ? "High" : "Normal",
      status: mapStatus(apiOrder.status),
      price: apiOrder.totalAmount.toFixed(2),
      copies: document?.copies || 1,
      progress: calculateProgress(apiOrder.status),
      image: "/pdf_file.png",
      merchantId: apiOrder.merchantId,
      latitude: apiOrder.latitude,
      longitude: apiOrder.longitude,
    };
  };

  const calculateProgress = (status: string): number => {
    const step = timelineSteps.find(
      (step) => step.status.toLowerCase() === status.toLowerCase(),
    );
    return step ? step.progress : 0;
  };

  // Fetch all data
  useEffect(() => {
    const fetchAllData = async () => {
      if (!isLoaded) return;
      try {
        setLoading(true);

        // 1. Fetch orders
        const ordersRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}/api/order/user/${user?.id}`,
        );
        if (!ordersRes.ok) throw new Error("Failed to fetch orders");
        const ordersData = await ordersRes.json();

        const transformedOrders = ordersData.map(transformApiOrder);
        setOrdersData(transformedOrders);

        // 2. Fetch unique merchants
        const uniqueMerchantIds = [
          ...new Set(transformedOrders.map((o: any) => o.merchantId)),
        ];
        const merchantsData = await Promise.all(
          uniqueMerchantIds.map((id) =>
            id ? fetchMerchant(id as string) : Promise.resolve(null),
          ),
        );

        // Create merchants map
        const merchantsMap = merchantsData.reduce(
          (acc, merchant) => {
            if (merchant) acc[merchant.id] = merchant;
            return acc;
          },
          {} as Record<string, Merchant>,
        );

        setMerchants(merchantsMap);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [isLoaded]);

  // Combine order with merchant data
  const getEnhancedOrders = () => {
    return ordersData.map((order) => {
      const merchant = order.merchantId ? merchants[order.merchantId] : null;
      return {
        ...order,
        shop: merchant?.shopName || `Merchant ${order.merchantId}`,
        address: merchant
          ? `${merchant.address}, ${merchant.city}, ${merchant.state}`
          : order.address,
        latitude: merchant?.latitude || order.latitude,
        longitude: merchant?.longitude || order.longitude,
      };
    });
  };

  const getMapUrl = (order: Order) => {
    if (order.latitude && order.longitude) {
      return `https://www.google.com/maps?q=${order.latitude},${order.longitude}&z=15&output=embed&markers=color:red%7C${order.latitude},${order.longitude}`;
    }
    return `https://www.google.com/maps?q=${encodeURIComponent(order.address)}&z=15&output=embed`;
  };

  const toggleTracking = (orderNo: string) => {
    setTrackingOrderId(trackingOrderId === orderNo ? null : orderNo);
  };

  const filteredOrders =
    filterStatus === "All"
      ? getEnhancedOrders()
      : getEnhancedOrders().filter((order) => order.status === filterStatus);

  if (loading)
    return (
      <div className="min-h-screen bg-[#e9eaf0] py-10 px-10 flex items-center justify-center">
        Loading orders...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-[#e9eaf0] py-10 px-10 flex items-center justify-center">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen  flex flex-col">
      <div className="flex  mx-auto gap-6">
   

        {/* Main Content */}
        <main
          className="flex-1 bg-white rounded-2xl shadow-md p-8 overflow-y-auto"
          style={{ height: "calc(100vh - 5rem)" }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="border-b border-[#e9eaf0] pb-4 mb-6">
              <h1 className="text-2xl font-bold">My Orders</h1>
            </div>
            <div className="flex gap-2 mb-6">
              <OrderTab
                label="All"
                active={filterStatus === "All"}
                onClick={() => setFilterStatus("All")}
              />
              <OrderTab
                label="Shipped"
                active={filterStatus === "Shipped"}
                onClick={() => setFilterStatus("Shipped")}
              />
              <OrderTab
                label="Delivered"
                active={filterStatus === "Delivered"}
                onClick={() => setFilterStatus("Delivered")}
              />
              <OrderTab
                label="Processing"
                active={filterStatus === "Processing"}
                onClick={() => setFilterStatus("Processing")}
              />
            </div>
            <div className="flex flex-col gap-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div
                    key={order.orderNo}
                    className="bg-[#f6f7fb] rounded-xl p-5 shadow-sm border border-[#e9eaf0]"
                  >
                    {/* Order Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-xs text-gray-500">
                        Order Date & Time: {order.orderDate} | Order No:{" "}
                        <span className="font-semibold">{order.orderNo}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="border border-[#dadce0] text-[#23235b] px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1 bg-white hover:bg-[#f4f5f7]">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <rect
                              x="4"
                              y="4"
                              width="16"
                              height="16"
                              rx="2"
                              strokeWidth={2}
                            />
                            <path d="M8 2v4M16 2v4M4 10h16" strokeWidth={2} />
                          </svg>
                          Invoice
                        </button>
                        <button
                          className={`${
                            trackingOrderId === order.orderNo
                              ? "bg-[#19194a]"
                              : "bg-[#23235b]"
                          } text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1 hover:bg-[#19194a]`}
                          onClick={() => toggleTracking(order.orderNo)}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {trackingOrderId === order.orderNo
                            ? "Hide Tracking"
                            : "Track Order"}
                        </button>
                      </div>
                    </div>

                    {/* Order Content */}
                    <div className="flex gap-4 items-start">
                      <img
                        src={order.image}
                        alt={order.productName}
                        className="w-20 h-24 rounded-lg border object-cover"
                      />
                      <div className="flex-1">
                        <h2 className="font-semibold text-lg text-gray-800 mb-1">
                          {order.productName}
                        </h2>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M4 4h16v16H4z"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="font-medium">{order.shop}</span>
                          <span className="mx-1">•</span>
                          <span>{order.address}</span>
                        </div>
                        <div className="flex gap-2 mb-2">
                          {order.status === "Shipped" && order.estDelivery && (
                            <span className="bg-[#ededf1] text-gray-700 px-2 py-0.5 rounded text-xs">
                              Est. Delivery Time: {order.estDelivery}
                            </span>
                          )}
                          <span
                            className={`${
                              order.priority === "High"
                                ? "bg-[#ffe69c] text-[#856404]"
                                : "bg-[#d1e7ff] text-[#0a58ca]"
                            } px-2 py-0.5 rounded text-xs font-medium`}
                          >
                            Priority: {order.priority}
                          </span>
                          {order.status === "Delivered" && (
                            <span className="bg-[#d1f7e5] text-[#1aab6e] px-2 py-0.5 rounded text-xs font-medium">
                              Delivered
                            </span>
                          )}
                        </div>
                        {order.status !== "Delivered" && (
                          <div className="mb-1">
                            <div className="text-xs text-gray-500 mb-0.5">
                              Delivery Progress:
                            </div>
                            <ProgressBar progress={order.progress} />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2 min-w-[150px]">
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-800 mb-1">
                            ₹{order.price}
                          </div>
                          <div className="text-xs text-gray-500">
                            Copies: {order.copies}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tracking Section */}
                    {trackingOrderId === order.orderNo && (
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Timeline */}
                        <div className="bg-white p-4 rounded-lg border border-[#e9eaf0]">
                          <h3 className="text-lg font-semibold mb-4">
                            Delivery Timeline
                          </h3>
                          <div className="relative pl-8">
                            {/* Vertical line */}
                            <div className="absolute left-4 top-0 h-full  bg-gray-200">
                              <div
                                className="absolute top-0 left-4 w-0.5 bg-green-500"
                                style={{ height: `${order.progress}%` }}
                              ></div>
                            </div>

                            {timelineSteps.map((step, index) => (
                              <div key={index} className="relative pb-6">
                                <div
                                  className={`absolute left-0 w-4 h-4 rounded-full -ml-2 mt-1 ${
                                    order.progress >= step.progress
                                      ? "bg-green-500"
                                      : "bg-gray-300"
                                  }`}
                                ></div>
                                <div className="ml-6">
                                  <p
                                    className={`font-medium ${
                                      order.progress >= step.progress
                                        ? "text-gray-900"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    {step.label}
                                  </p>
                                  {order.status === step.status && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      Current status
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-[#e9eaf0]">
                          <h3 className="text-lg font-semibold mb-4">
                            Delivery Location
                          </h3>
                          <div className="h-64 rounded-lg overflow-hidden relative">
                            <iframe
                              src={getMapUrl(order)}
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              aria-label={`Map showing delivery location for ${order.address}`}
                            ></iframe>
                            <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-md">
                              <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${order.latitude},${order.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                                Get Directions
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No orders found matching your criteria
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({
  icon: Icon,
  label,
  active = false,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-6 py-3 rounded-lg transition text-base cursor-pointer ${
        active
          ? "bg-[#e9eaf0] text-[#23235b] font-semibold"
          : "text-gray-600 hover:bg-[#f4f5f7]"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </div>
  );
}

function OrderTab({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-1.5 rounded-lg text-sm font-medium border transition ${
        active
          ? "bg-white border-[#dadce0] text-[#23235b]"
          : "bg-transparent border-transparent text-gray-600 hover:bg-white"
      }`}
    >
      {label}
    </button>
  );
}
function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full h-2 bg-[#e9eaf0] rounded-full overflow-hidden">
      <div
        className="h-full bg-[#1aab6e] transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}