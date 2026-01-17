type Testimonial = {
  name: string;
  quote: string;
  avatar: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Floyd Miles",
    quote:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    avatar: "/avtar2.png",
    rating: 4,
  },
  {
    name: "Floyd Miles",
    quote:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    avatar: "/avtar3.png",
    rating: 4,
  },
];

type StarsProps = {
  count: number;
};

function Stars({ count }: StarsProps) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < count ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.378 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.378-2.455a1 1 0 00-1.176 0l-3.378 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.966z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white py-15">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold mb-4">
            What our clients say
          </h2>
          <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white border rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h4 className="text-lg font-semibold">
                    {t.name}
                  </h4>
                  <Stars count={t.rating} />
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {t.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
