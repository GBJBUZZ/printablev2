import Image from "next/image";
import Footer from "@/components/Footer/page";

export default function BlogDetailsPage() {
  return (
    <main className="bg-[#F8FAFC]">
      {/* LARGE WHITE SPACE (Hero gap like image) */}
      <div className="h-[420px] bg-[#F8FAFC]" />

      {/* CONTENT AREA */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT CONTENT */}
        <article className="lg:col-span-8">
          <p className="text-base text-gray-800 mb-8 leading-relaxed max-w-3xl">
            Storing and managing PDFs in the cloud has become essential for both
            individuals and teams handling digital documents. With platforms
            like Google Drive, Dropbox, and OneDrive, you can access, share, and
            collaborate on files from anywhere, anytime.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Key Benefits:
          </h2>

          <ul className="list-disc pl-6 text-gray-800 space-y-3 mb-14 max-w-3xl">
            <li>
              Accessibility – Open PDFs from any device, without emailing
              attachments
            </li>
            <li>
              Version Control – Avoid confusion with automatic saving and file
              history
            </li>
            <li>
              Collaboration – Commenting editing, and sharing links streamline
              tramwork
            </li>
            <li>
              Security – Most cloud platforms offer encryption and access
              control
            </li>
          </ul>

          {/* QUOTE */}
          <div className="flex items-start gap-6 mt-12">
            <span className="text-gray-300 text-6xl leading-none font-serif">
              &ldquo;
            </span>

            <p className="text-lg font-medium text-gray-900 leading-relaxed max-w-2xl uppercase tracking-wide">
              The cloud isn’t just storage — it’s the new workspace. <br />
              Managing PDFs online means your documents move as fast as your
              ideas.
            </p>
          </div>

          <Section
            title="Pro Tools & Integrations"
            intro="Smart integrations between cloud services and online PDF tools streamline your workflow even further. For example:"
            items={[
              "Open a PDF from Google Drive in a PDF editor directly.",
              "Compress large documents before emailing, straight from the cloud.",
              "Add e-signatures to contracts and save back to Dropbox in one click.",
              "Look for tools that support OAuth login, direct cloud importing/exporting, and batch processing features.",
            ]}
          />

          <Section
            title="Use Cases by Profession"
            items={[
              "Freelancers: Submit invoices and portfolios with cloud-based eSign and compression.",
              "HR Teams: Manage contracts, resumes, and onboarding docs with shared folders.",
              "Students & Educators: Store course materials, projects, and assignments for easy access.",
              "Legal/Finance Professionals: Archive confidential agreements with password protection and controlled access.",
            ]}
          />

          <Section
            title="Things to Watch Out For"
            items={[
              "Storage Limits: Free accounts often come with caps; monitor usage or consider upgrading.",
              "File Sync Delays: Make sure sync is complete before closing or sharing edited PDFs.",
              "Offline Access: Enable offline mode for critical documents when traveling or in low-connectivity areas.",
            ]}
          />

          {/* FINAL THOUGHTS */}
          <div className="mt-12">
            <h3 className="text-base font-semibold mb-2">Final Thoughts</h3>
            <p className="text-sm text-gray-800 leading-relaxed max-w-3xl">
              Whether you're managing invoices, contracts, school documents, or
              design proofs, cloud-based PDF workflows offer a modern,
              efficient, and scalable solution. The key is choosing the right
              tools and learning how to integrate them seamlessly with your
              existing cloud storage setup.
            </p>
          </div>

          {/* SHARE + AUTHOR + COMMENTS */}
          <div className="mt-14 pt-8">
            {/* SHARE COUNTERS */}
            <div className="flex items-center gap-10 mb-10">
              {/* 10K Shares */}
              <div className="text-sm text-gray-500 leading-none">
                <span className="block text-base font-semibold text-gray-700">
                  10K
                </span>
                <span className="block text-xs">Shares</span>
              </div>

              {/* Share Buttons */}
              <div className="flex rounded overflow-hidden shadow-sm">
                {/* Facebook */}
                <div className="flex items-center justify-center gap-2 w-[240px] px-4 py-1 bg-[#3B5998] text-white text-sm mr-2 border-r border-white/20">
                  <Image
                    src="/facebooklogo12.png"
                    alt="Facebook"
                    width={14}
                    height={14}
                  />
                  <span className="font-medium">Shares</span>
                  <span className="ml-1">636</span>
                </div>

                {/* Pinterest */}
                <div className="flex items-center justify-center w-[240px] gap-2 px-4 py-1 bg-[#FF0000] text-white text-sm mr-2 border-r border-white/20">
                  <Image
                    src="/Pinterestlogo12.png"
                    alt="Pinterest"
                    width={14}
                    height={14}
                  />
                  <span className="font-medium">Shares</span>
                  <span className="ml-1">636</span>
                </div>

                {/* LinkedIn */}
                <div className="flex items-center justify-center w-[100px] gap-2 px-4 py-1 bg-[#007BB6] text-white text-sm mr-2">
                  <Image
                    src="/linkdenlogo.png"
                    alt="LinkedIn"
                    width={14}
                    height={14}
                  />
                  <span className="ml-1">636</span>
                </div>
              </div>
            </div>

            {/* AUTHOR */}
            <div className="flex items-start gap-5 mb-8">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <Image
                  src="/author.png"
                  alt="Joanna Wellick"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>

              <div>
                <h4 className="font-semibold mb-1">Joanna Wellick</h4>
                <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
                  Sed cras nec a nulla sapien adipiscing in enim viverra mollis
                  metus quam adipiscing velit suspendisse condimentum felis quis
                  risus. Sed consequat laoreet enim sit aliquet mollis semper.
                </p>
                {/* SOCIAL ICONS */}
                <div className="flex gap-3 mt-3">
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-300">
                    <img
                      src="/MySpace.png"
                      alt="MySpace"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-300">
                    <img
                      src="/Behance.png"
                      alt="Behance"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-300">
                    <img
                      src="/GitHub.png"
                      alt="GitHub"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-300">
                    <img
                      src="/Medium.png"
                      alt="Medium"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* COMMENTS BUTTON */}
            <div className="text-center">
              <button className="bg-gray-800 text-white px-6 py-2 rounded text-sm">
                View Comments (0)
              </button>
            </div>
          </div>
        </article>
        {/* RIGHT SIDEBAR */}
        <aside className="lg:col-span-4 space-y-6">
          {/* FOLLOW US */}
          <div className="bg-[#F8FAFC] p-6 rounded-md mb-0">
            <h4 className="font-semibold mb-6">Follow Us</h4>

            <div className="flex justify-between text-center">
              {/* Facebook */}
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/facebook.png"
                  alt="Facebook"
                  width={22}
                  height={22}
                />
                <p className="text-xs text-gray-700">10</p>
              </div>

              {/* Twitter */}
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/twitter.png"
                  alt="Twitter"
                  width={22}
                  height={22}
                />
                <p className="text-xs text-gray-700">69k</p>
              </div>

              {/* Instagram */}
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/instagram.png"
                  alt="Instagram"
                  width={22}
                  height={22}
                />
                <p className="text-xs text-gray-700">45</p>
              </div>

              {/* Pinterest */}
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/pinterest.png"
                  alt="Pinterest"
                  width={22}
                  height={22}
                />
                <p className="text-xs text-gray-700">69k</p>
              </div>

              {/* YouTube */}
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/youtube.png"
                  alt="YouTube"
                  width={22}
                  height={22}
                />
                <p className="text-xs text-gray-700">69k</p>
              </div>
            </div>
          </div>

          {/* SUBSCRIPTION */}
          <div className="bg-[#F8FAFC] p-6 rounded-md mt-0">
            <h4 className="font-semibold mb-2">
              Subscription:
              <span className="font-normal text-#121416">
                {" "}
                Subscribe to our newsletter and receive a selection of cool
                articles every weeks
              </span>
            </h4>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-4"
            />

            <button className="w-full mt-4 bg-[#06044B] text-white py-2 rounded font-medium">
              Subscribe
            </button>

            {/* CHECKBOX */}
            <div className="flex items-start gap-2 mt-4 text-xs text-gray-500">
              <input type="checkbox" className="mt-1" />
              <p>
                By checking this box, you confirm that you have read and are
                agreeing to our terms of use regarding the storage of the data
                submitted through this form.
              </p>
            </div>
          </div>

          {/* LATEST POSTS */}
          <div className="bg-[#F8FAFC]  overflow-hidden ">
            <h4 className="font-semibold px-5 py-4  text-gray-900">
              The Latest
            </h4>

            <div className="p-4 space-y-4">
              <SidebarPost 
                featured
                title="10 Habits That Will Change Your Live for the Better If envy and jealousy are impacting your friendships"
                date="June 21, 2022"
                time="2 minute read"
                
              />

              <SidebarPost
                title="Automate Repetitive PDF Tasks with These Shortcuts"
                date="June 21, 2022"
                time="2 minute read"
              />

              <SidebarPost
                title="Weekly Workflow: How We Use Our Own Tools Internally"
                date="June 21, 2022"
                time="2 minute read"
              />

              <SidebarPost
                title="From Idea to Launch: The Story Behind Our PDF Compressor"
                date="June 21, 2022"
                time="2 minute read"
              />
            </div>
          </div>

          {/* AUTHOR CARD */}
          <div className=" rounded-lg p-6 text-center bg-white">
            <p className="text-xs tracking-widest text-black mb-3">AUTHOR</p>

            <h4 className="font-semibold mb-4">Joanna Wellick</h4>

            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4">
              <Image
                src="/author2.png"
                alt="Joanna Wellick"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Luci vitae dapibus rhoncus. Eget etiam aenean nisi montes felis
              pretium donec veni.
            </p>

            <div className="flex justify-center gap-3">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200">
                <img
                  src="/MySpace.png"
                  alt="Myspace"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200">
                <img
                  src="/Behance.png"
                  alt="Behance"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200">
                <img
                  src="/GitHub.png"
                  alt="GitHub"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200">
                <img
                  src="/Medium.png"
                  alt="LinkedIn"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* RELATED POSTS */}
      <section className="max-w-6xl mx-auto px-4 mt-24 pb-24">
        <h2 className="text-sm font-semibold text-[20px] uppercase tracking-wide mb-2">
          Related Posts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <RelatedCard
            image="/related1.png"
            title="How to Merge PDFs in Seconds"
            description="The simplest way to combine multiple files without losing quality."
          />
          <RelatedCard
            image="/related2.png"
            title="Add E-Signatures to PDFs—Legally and Fast"
            description="A guide to signing documents online with compliance in mind."
          />
          <RelatedCard
            image="/related3.png"
            title="Managing PDFs in the Cloud: What You Need to Know"
            description="Benefits and best practices for online storage and access."
          />
        </div>

        <div className="text-center mt-14">
          <button className="bg-[#06044B] text-white text-sm px-6 py-2 rounded shadow">
            Load More
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Section({
  title,
  items,
  intro,
}: {
  title: string;
  items: string[];
  intro?: string;
}) {
  return (
    <div className="mt-10">
      <h3 className="text-base font-semibold mb-2">{title}</h3>

      {intro && (
        <p className="text-sm  text-gray-800 mb-3 leading-relaxed max-w-3xl">
          {intro}
        </p>
      )}

      <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function SidebarPost({
  title,
  date,
  time,
  featured,
}: {
  title: string;
  date: string;
  time: string;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <div className="rounded overflow-hidden">
        <div className="relative h-40 w-full">
          <Image
            src="/latest.png"
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <p className="text-sm font-semibold leading-snug mb-4">{title}</p>
            <p className="text-xs opacity-80 flex items-center gap-2">
              {date} — ⏱ {time}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-2 bg-white">
      <p className="text-sm font-medium text-gray-900 leading-snug mb-6">{title}</p>

      <p className="text-xs text-gray-500 mt-1 flex items-center gap-2 ">
        {date} — ⏱ {time}
      </p>
    </div>
  );
}

function RelatedCard({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="relative h-60  overflow-hidden mb-4">
        <Image src={image} alt={title} fill className="object-cover" />

        <div className="absolute top-3 left-3 flex gap-2 text-[10px] uppercase text-white">
          <span className="bg-black/50 px-2 py-0.5 rounded">
            Document Management
          </span>
          <span className="bg-black/50 px-2 py-0.5 rounded">Workflow</span>
        </div>
      </div>

      <h4 className="text-[25px] font-semibold leading-snug mb-2">{title}</h4>

      <p className="text-sm text-gray-500 mb-4 leading-relaxed">
        {description}
      </p>

      <p className="text-xs text-gray-400 flex items-center gap-2">
        June 21, 2022 — ⏱ 2 minute read
      </p>
    </div>
  );
}
