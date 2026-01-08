export default function Hero() {
  return (
    <section className="text-white bg-cover bg-center bg-no-repeat h-[550px] flex items-center "
      style={{
        backgroundImage: "url('/hero-bg.jpg')",
      }}>
      <div className="max-w-7xl mx-auto px-6 py-28 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Reimagining the Future of Printing
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-white/80 mb-10">
          We're on a mission to connect people, design, and local print shops —
          powered by AI, driven by purpose.
        </p>

        <div className="flex justify-center gap-4">
          <button className="
            bg-[#61E987] text-[#06044B]
            px-6 py-3 rounded-full font-medium w-[210px]
            transition-all duration-300
            hover:shadow-[0_0_25px_rgba(97,233,135,0.7)]
            hover:-translate-y-0.5
          ">
            Join Our Journey
          </button>

          <button className="
          bg-white text-[#61E987]
          border border-[#61E987]
          px-6 py-3 rounded-full w-[210px]
          transition-all duration-300
          hover:shadow-[0_0_20px_rgba(97,233,135,0.5)]
          hover:-translate-y-0.5
        ">
          Meet the Team
        </button>

        </div>
      </div>
    </section>
  );
}
