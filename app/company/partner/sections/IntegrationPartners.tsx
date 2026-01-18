const partners = [
  { name: "Innovatech", desc: "Leading technology solutions provider" , icon : "/integratePartner.png"},
  { name: "MarketBoost", desc: "Expert marketing and branding agency" , icon : "/integratePartner.png"},
  { name: "Alpha Solutions", desc: "Cutting-edge software development" ,icon : "/integratePartner.png"},
  { name: "Connecta", desc: "Global communication network" ,icon : "/integratePartner.png"},
];

export default function IntegrationPartners() {
  return (
    <section className="py-10 bg-[#F4F7FA]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-1">
          Integration Partners
        </h2>
        <p className="text-[black] mb-10">
          We work with leading technology and service providers to deliver the best experience.
        </p>

        <div className="grid md:grid-cols-4 gap-5">
          {partners.map((p) => (
          <div
          key={p.name}
          className="rounded-xl overflow-hidden bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] h-[280px]"
        >
          <img src={p.icon} alt="" className="w-full" />

          <div className="p-4">
            <h3 className="font-medium">{p.name}</h3>
            <p className="text-sm text-black">{p.desc}</p>
          </div>
        </div>

          ))}
        </div>
      </div>
    </section>
  );
}
