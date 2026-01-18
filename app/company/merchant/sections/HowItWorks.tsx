const steps = [
  {
    title: "Sign Up",
    desc: "Create your account and provide basic business information.",
    icon: "/singupprofile.png",
  },
  {
    title: "Verify",
    desc: "Confirm your details to activate your account.",
    icon: "/verify.png",
  },
  {
    title: "Set Store",
    desc: "Set up your store and configure your preferences.",
    icon: "/setstore.png",
  },
  {
    title: "Start Earning",
    desc: "Go live and begin earning from your business.",
    icon: "/startearn.png",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-13 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-2">How it works</h2>
        <p className="text-gray-500 mb-14 text-lg">
          Expand your business with delivery, visibility and smart tools.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.title}
              className="border-1 border-[#4D4B4B] rounded-xl p-6 flex flex-col items-center text-center "
            >
              <div className="mb-4 flex justify-center">
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-7 h-7 object-contain"
                />
              </div>

              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
