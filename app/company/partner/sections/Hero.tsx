export default function Hero() {
  return (
       <section className="text-white bg-cover bg-center bg-no-repeat h-[550px] flex items-center "
      style={{
        backgroundImage: "url('/hero-bg.jpg')",
      }}>
      <div className="max-w-7xl mx-auto px-6 py-28 text-center">
        <h1 className="font-black text-[65px] leading-[1] tracking-normal text-center text-white max-w-[981px] mx-auto mb-5">
          Grow With Us
        </h1>


        <p className="max-w-[981px] mx-auto text-[30px] font-normal leading-[1] tracking-normal text-center text-white mb-13">
          Partner with Printable to expand your services and reach more users.
        </p>


        <div className="flex justify-center gap-4">
          <button className="bg-[#06044B] text-white px-6 py-3 rounded-[10px] text-[20px] font-semibold leading-[1]">
            Become a Partner
          </button>

          <button className="bg-white text-[#06044B] px-6 py-3 rounded-[10px] text-[20px] font-semibold leading-[1]">
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
}
