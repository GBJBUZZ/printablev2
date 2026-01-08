const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-founder",
    image: "/teammateprofile.png",
  },
  {
    name: "Michael Chen",
    role: "CTO & Co-founder",
    image: "/teammateprofile.png",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    image: "/teammateprofile.png",
  },
  {
    name: "David Park",
    role: "Head of Engineering",
    image: "/teammateprofile.png",
  },
];

const linkdenicon = "/linkicon.png";

export default function Team() {
  return (
    <section className="py-25 bg-white">
      <div className="max-w-[1420px] mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold">Meet Our Team</h2>
        <p className="text-gray-500 mb-14">
          The people behind Printable PrintifyPaper's success
        </p>

        <div className="flex flex-wrap justify-center gap-20">
          {team.map((member) => (
            <div
              key={member.name}
              className="w-[255px] h-[265px] border border-[#D9D9D9] rounded-[10px] p-6 flex flex-col items-center bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mb-4 object-cover mt-2"
              />
              <h3 className="font-bold text-xl text-center">
                {member.name}
              </h3>
              <p className="text-gray-500 text-center text-sm mb-4">
                {member.role}
              </p>
              <img
                src={linkdenicon}
                alt="LinkedIn"
                className="w-[20px] h-[20px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
