const values = [
  {
    title: "Accessibility",
    description: "Making professional printing services available to everyone.",
    icon: "/accessibility.png",
  },
  {
    title: "Innovation",
    description: "Continuously improving our technology and print workflows.",
    icon: "/innovation.png",
  },
  {
    title: "Empowering Local",
    description: "Supporting local print shops and creating new opportunities.",
    icon: "/Elocal.png",
  },
];

export default function CoreValues() {
  return (
    <section className="py-24 bg-white ">
      <div className=" mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-1">Our Core Values</h2>
        <p className="text-gray-500 mb-14">
          we're driven by values that shape everything we do , from <br/>
          <span>product development to customer services</span>.
        </p>

       <div className="flex justify-center items-center gap-30 px-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="border rounded-xl p-6 hover:shadow-md transition w-[337px] h-[145px]"
            >
              <img src={value.icon} alt="" className="mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-0">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
