export default function CTA() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="bg-[#E6E6ED] h-[270px] rounded-2xl flex flex-col items-center justify-center text-center">
          <h2 className="text-[25px] font-semibold mb-1">
            Want to Join Our Journey?
          </h2>

          <p className="text-black mb-6 max-w-2xl">
            We're always looking for talented individuals to help us
            <br />
            revolutionize printing.
          </p>

          <div className="flex gap-8">
            <button className="bg-[#06044B] text-white px-9 py-1 rounded-full  hover:bg-[#EFFDF3] hover:text-[#06044B]">
              View Careers
            </button>
            <button className="border border-gray-300 px-6 py-2 rounded-full bg-white text-black hover:bg-[#EFFDF3] hover:text-[#06044B]">
              Partner with Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
