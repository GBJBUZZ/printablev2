export default function Dashboard() {
  return (
    <section className="py-16 bg-white">
      {/* Centered heading block */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-1">
        <h2 className="text-3xl font-bold mb-2">How it works</h2>
        <p className="text-gray-500 text-[20px]">
          Expand your business with delivery, visibility and smart tools.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
        <img
          src="/dashboardr.png"
          alt="Dashboard"
          className="w-full"
        />

        <div>
          <h2 className="text-3xl font-semibold mb-4">
            Powerful Merchant Dashboard
          </h2>

          <p className="text-[#4D4B4B] mb-8">
            Get access to comprehensive dashboard that puts you in control of yours printing business.Get access to a comprehensive dashboard that puts you in control.
          </p>

          <ul className="space-y-2 text-[#4D4B4B] mb-5">
            <li>Order Management System</li>
            <li>Real-Time Analytics</li>
            <li>Customer Communication</li>
            <li>Inventory Tracking</li>
            <li>Payment Processing</li>
            <li>Performance Insights</li>
          </ul>

          <button className="mt-8 bg-[#06044B] text-white px-4 py-3 rounded-[10px] text-[15px]">
            GET STARTED TODAY
          </button>
        </div>
      </div>
    </section>
  );
}
