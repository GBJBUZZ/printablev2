const brands = [
  { name: "BrandPrint Pro", desc: "Premium printing solutions" , icon : "/BrandPartner.png" },
  { name: "EcoPrint Supplies", desc: "Sustainable printing materials" ,icon : "/BrandPartner.png"},
  { name: "OfficeFlow Tech", desc: "Workflow automation for print", icon : "/BrandPartner.png" },
  { name: "DesignHub Creatives", desc: "Creative design services", icon : "/BrandPartner.png" },
];

export default function BrandPartners() {
  return (
    <section className="bg-[#F4F7FA] py-13">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-1">
          Our Brand Partners
        </h2>
        <p className="text-[#000000 ] mb-14">
          Proudly collaborating with these brands to bring you the best in printable solutions
        </p>

      <div className="grid md:grid-cols-4 gap-5">
        {brands.map((b) => (
          <div
            key={b.name}
            className="bg-white rounded-xl h-[270px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]"
          >
            <img src={b.icon} alt="" className="mb-4" />
            <h3 className="font-medium">{b.name}</h3>
            <p className="text-sm text-gray-500">{b.desc}</p>
          </div>
        ))}
      </div>

      </div>
    </section>
  );
}
