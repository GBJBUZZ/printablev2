const benefits = [
  "Local Delivery Support",
  "Increased Visibility",
  "Smart Order Management",
  "Business Growth Tools",
];

const iconAccess = "/delivery.png";

export default function Benefits() {
  return (
    <section className="bg-white py-10 ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-[25px] font-semibold mb-2">
          Join Our Network of Print Experts
        </h2>
        <p className="mb-12 text-gray-600">
          Expand your business with delivery, visibility, and smart tools.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {benefits.map((item) => (
            <div
              key={item}
              className="
                bg-white
                rounded-xl
                p-6
                flex flex-col items-center text-center
                shadow-[0_2px_6px_rgba(0,0,0,0.18)]
              "
            >
              <div className="mb-4 flex justify-center">
                <img
                  src={iconAccess}
                  alt=""
                  className="w-8 h-8 object-contain"
                />
              </div>

              <h3 className="font-medium">{item}</h3>
              <p className="text-sm text-gray-500 mt-2">
                Access tools that help you serve customers better.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
