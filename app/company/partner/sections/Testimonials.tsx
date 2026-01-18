const testimonials = [
  {
    quote:
      "Partnering with Printable has significantly boosted our market presence and customer engagement. Their team is exceptional!",
    name: "Sarah Chen",
    role: "CEO, Innovatech",
  },
  {
    quote:
      "The collaboration has been seamless and highly profitable. We’ve seen remarkable growth since joining their partner program.",
    name: "John Miller",
    role: "Marketing Director, MarketBoost",
  },
  {
    quote:
      "Printable Partners truly understands the meaning of partnership. Their support and resources are top-notch.",
    name: "Linda Kim",
    role: "Founder, Alpha Solutions",
  },
];

const avatar = "/avatar.png";

export default function Testimonials() {
  return (
    <section className="bg-[#F4F7FA] py-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-[25px] font-semibold mb-1">
          What Our Partners Say
        </h2>
        <p className="text-black mb-12">
          Hear directly from businesses that have grown with Printable partners.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl bg-white p-6 text-left shadow-[0px_0px_10px_rgba(0,0,0,0.15)]"
            >
              {/* Avatar */}
              <img
                src={avatar}
                alt={t.name}
                className="h-[48px] w-[48px] rounded-full mb-4"
              />

              {/* Quote */}
              <p className="text-black leading-relaxed mb-6">
                “{t.quote}”
              </p>

              {/* Author */}
              <div className="flex gap-3 items-start">
                <span className="w-[3px] h-full bg-[#1E2A78] mt-1" />
                <div>
                  <h4 className="font-medium">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
