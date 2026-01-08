const benefits = [
  {
    title: "Why Partner with Us?",
    description:
      "We offer compelling advantages designed to help your business thrive and achieve new heights of success",
    icon: "/partnerwhy.png",
  },
  {
    title: "Boost Your Revenue",
    description:
      "Generate new income streams through our partnership programs, designed for mutual growth and profitability.",
    icon: "/buildRevenue.png",
  },
  {
    title: "Build Trust & Align Brands",
    description:
      "Associate with a reputable name in the industry. We foster string, collaborative relationships for long-term success..",
    icon: "/buildTrust.png",
  },
];

export default function WhyPartner() {
  return (
    <section className="bg-[#F4F7FA] py-15">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-[35px] font-bold leading-[1] tracking-normal text-center mb-3">
          Why Partner with Us?
        </h2>

       <p className="text-[20px] font-normal leading-[1] tracking-normal text-black mb-14">
          We offer compelling advantages designed to help your business thrive and achieve new heights of success
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((item) => (
           <div
              key={item.title}
              className="bg-white w-[350px] rounded-[15px] pt-[33px] pr-[22px] pb-[33px] pl-[22px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]"
            >
              <img src={item.icon} alt="" className="mb-4 mx-auto" />
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
