export default function CTA() {
  return (
    <section className="bg-white py-13 px-6">
      <div className="mx-auto max-w-[1300px]">
        {/* CTA container */}
        <div className="bg-[#06044B] rounded-3xl h-[371px] px-16 flex items-center justify-between gap-12">

          {/* Left content */}
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-5 leading-tight text -[30px]">
              Ready to Start Earning?
            </h2>

            <p className="text-white/80 text-[25px] leading-relaxed mb-8">
              Join Thousands of successful merchants who trust
              <br />
              PrintifyPaper to grow their business.
            </p>

            <button className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#06044B] transition">
              Get Started
            </button>
          </div>

          {/* Right image */}
          <div className="flex items-center">
            <img
              src="/dashboar2.png" // replace later
              alt="Dashboard preview"
              className="h-[260px] w-auto object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
