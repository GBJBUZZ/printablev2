const press = [
  {
    source: "TechCrunch",
    title: "Printable Raises $10M to Revolutionize Local Printing",
  },
  {
    source: "Forbes",
    title: "The Future of Print: How Digital Platforms Are Changing the Game",
  },
  {
    source: "Business Insider",
    title: "Local Print Shops Go Digital with New Platform",
  },
];

const pressicon = "/pressicon.png";
const MoreArticle = '/moreArticle.png'

export default function Press() {
  return (
    <section className="bg-white py-5">
      <div className="max-w-[1330px] mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold">
          Press & Recognition
        </h2>

        <p className="text-gray-500 mb-14">
          See what industry leaders are saying about PrintifyPaper
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {press.map((item, index) => (
            <div
              key={index}
              className="bg-white border-[#D9D9D9] border-1 rounded-xl p-[40px] text-left hover:shadow-md transition w-[400px]"
            >
              {/* Icon + heading */}
              <h3 className="flex items-center gap-2 text-[#06044B] font-medium text-2xl leading-none text-center mb-3">
                <img src={pressicon} alt="" className="w-6 h-6" />
                {item.source}
              </h3>

             <p className="text-black font-bold text-base leading-none mb-4">
                {item.title}
              </p>

            <p className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-black font-medium text-sm transition hover:bg-[#DFFBE7] ">
              Read Article
              <img src={MoreArticle} alt="" className="w-4 h-4" />
            </p>


            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
