import Image from "next/image";
import Footer from "@/components/Footer/page"
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
<section className="relative w-full h-[560px]">
  <Image
    src="/hero.png"
    alt="Printable Blog"
    fill
    priority
    className="object-cover"
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/60" />

  {/* CONTENT */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
    <h1 className="text-[52px] md:text-[60px] font-bold tracking-tight ">
      Printable Blog
    </h1>

    <p className="text-[40px] md:text-[50px] font-medium mb-6">
      Work Fast. Work Clean.
    </p>

    <p className="max-w-2xl text-[15px] md:text-[16px] text-white/80 mb-8">
      Explore guides, updates, and insights to master your digital documents.
    </p>

    <button className="bg-[#06044B] hover:bg-[#06044B] transition text-white px-8 py-3 rounded-md text-sm font-medium">
      Explore
    </button>
  </div>
</section>

{/* LOGOS */}
<section className="py-6">
  {/* The main container remains the same: max-w, left-aligned, with gap */}
  <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center gap-10 justify-between">
    
    {/* Google - Wrapped in a flex container */}
    <div className="flex items-center gap-2 text-sm font-medium text-[#9CA3AF]">
      <Image 
        src="/logos/google.svg" 
        alt="Google Logo" 
        width={100} 
        height={24} 
        className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity" 
      />
      <span>Google</span>

    </div>
    
    {/* Logoipsum 1 */}
    <div className="flex items-center gap-2 text-sm font-medium text-[#9CA3AF]">
      <Image 
        src="/logos/logoipsm-1.svg" 
        alt="Logoipsum Logo" 
        width={100} 
        height={24} 
        className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity" 
      />
      <span>Logoipsum</span>
    </div>
    
    {/* Logoipsum 2 */}
    <div className="flex items-center gap-2 text-sm font-medium text-[#9CA3AF]">
      <Image 
        src="/logos/logoipsm-2.svg" 
        alt="Logoipsum Logo" 
        width={100} 
        height={24} 
        className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity" 
      />
      <span>Logoipsum</span>
    </div>
    
    {/* Twitter 1 */}
    <div className="flex items-center gap-2 text-sm font-medium text-[#9CA3AF]">
      <Image 
        src="/logos/twitterX.svg" 
        alt="Twitter Logo" 
        width={100} 
        height={24} 
        className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity" 
      />
     <span>Twitter</span>

    </div>

    {/* Logoipsum 3 */}
    <div className="flex items-center gap-2 text-sm font-medium text-[#9CA3AF]">
      <Image 
        src="/logos/logoipsm-1.svg" 
        alt="Logoipsum Logo" 
        width={100} 
        height={24} 
        className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity" 
      />
      <span>Logoipsum</span>
    </div>

    {/* Logoipsum 4 */}
    <div className="flex items-center gap-2 text-sm font-medium text-[#9CA3AF]">
      <Image 
        src="/logos/logoipsm-2.svg" 
        alt="Logoipsum Logo" 
        width={100} 
        height={24} 
        className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity" 
      />
      <span>Logoipsum</span>
    </div>
    
    {/* Twitter 2 */}
    <div className="flex items-center gap-2 text-sm font-medium text-[#9CA3AF]">
      <Image 
        src="/logos/twitterX.svg" 
        alt="Twitter Logo" 
        width={100} 
        height={24} 
        className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity" 
      />
      <span>Twitter</span>
    </div>
  </div>
</section>

{/* FEATURED POST */}
<section className="max-w-6xl mx-auto px-4 py-20">
  <div className="relative rounded-2xl shadow-lg">
    {/* IMAGE - Height is slightly taller in the image relative to the container */}
    <Image
      src="/blog-printer.png"
      alt="Featured Post"
      width={1200}
      height={520}
      // Adjusted height slightly to better match the image crop
      className="w-full h-[520px] object-cover" 
    />

    {/* CONTENT CARD - Changes made to position, width, and border radius */}
    <div 
        // Change 1: Positioned to the bottom-left. Added 'left-10' and centered it vertically in the bottom half.
        // Change 2: Increased max-width and reduced padding/shadow slightly.
        className="absolute -bottom-14 right-0 bg-white rounded-lg shadow-xl p-8 max-w-[820px]"
    >
      {/* META - Changes made to layout and style to match the image */}
      {/* Note: In the image, the category and date are on the same line, with the category being bold/dark and the date being light. */}
      <div className="text-xs text-gray-500 mb-3">
        {/* 'DEVELOPMENT' - Darker, bold, and uppercase */}
        <span className="font-bold text-[#4B5563] uppercase tracking-wider mr-1">
            DEVELOPMENT
        </span>
        {/* Separator and date - Lighter and normal case */}
        <span className="mx-1 font-light">  </span> 
        <span className="font-light">16 March 2023</span>
      </div>

      {/* TITLE - Looks mostly correct */}
      <h2 className="text-[26px] font-semibold text-[#1F2937] leading-snug mb-4">
        Managing PDFs in the Cloud: What You Need to Know
      </h2>

      {/* DESCRIPTION - Looks mostly correct */}
      <p className="text-[15px] text-[#6B7280] leading-relaxed mb-6">
        Storing and managing PDFs in the cloud has become essential for both
        individuals and teams handling digital documents. With platforms like
        Google Drive, Dropbox, and OneDrive, you can access, share, and
        collaborate on files from anywhere, anytime.
      </p>

      {/* BUTTON - Changes made to background color and added uppercase */}
      <button className="bg-[#06044B] text-white px-6 py-2.5 rounded text-[13px] font-medium uppercase">
        Read More
      </button>
    </div>
  </div>
</section>
      {/* RECENT POST */}
<section className="max-w-6xl mx-auto px-4 pb-16">
  {/* The heading looks good as is */}
  <h2 className="text-[22px] font-semibold text-[#1F2937] mb-6">
    Our Recent Post
  </h2>

  <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
    {/* IMAGE - Increased the width for medium screens and above to better match the layout */}
    <Image
      src="/blog-printer.png"
      alt="Recent"
      width={520}
      height={340}
      // Change: Using w-full and then md:w-1/2 for a clear side-by-side split
      className="object-cover w-full md:w-1/2" 
    />

    {/* CONTENT */}
    <div className="p-6">
      {/* Change: Grouped the metadata and adjusted styling to match the smaller, lighter look */}
      <div className="text-xs text-gray-500 mb-2">
        {/* 'Development' category. Text is typically darker. */}
        <span className="font-semibold text-black uppercase mr-1">
            Development
        </span>
        {/* Separator dot */}
        <span className="mx-1">•</span> 
        {/* Date is lighter and slightly smaller */}
        <span className="font-normal">16 March 2023</span>
      </div>

      {/* Title looks mostly correct, maybe slightly larger font in the image. Keep it as is. */}
      <h3 className="text-[20px] font-semibold text-[#1F2937] leading-snug mb-3">
        Managing PDFs in the Cloud: What You Need to Know
      </h3>

      {/* Paragraph looks correct */}
      <p className="text-[14px] text-[#6B7280] leading-relaxed mb-4">
        Storing and managing PDFs in the cloud has become essential for both
        individuals and teams handling digital documents. With platforms like
        Google Drive, Dropbox, and OneDrive, you can access, share, and
        collaborate on files from anywhere, anytime
      </p>

      {/* Change: Adjusted color and added uppercase for the button to match the image */}
      <Link href="/printable-blog/extended-blogpage" >
      <button className="cursor-pointer bg-[#06044B] text-white px-4 py-2 rounded text-[13px] font-medium uppercase">
        Read More
      </button>
      </Link>
    </div>
  </div>
</section>

      {/* POPULAR POSTS */}
<section className="max-w-6xl mx-auto px-4 pb-20">
  <div className="flex justify-between items-center mb-5">
    <h2 className="text-[#495057] text-[30px] font-inter font-bold">Popular Posts</h2>
    <span className="text-sm text-[#495057] cursor-pointer">
      View All
    </span>
  </div>

  {/* CATEGORY TABS */}
  <div className="flex gap-5 text-sm text-[#495057] font-bold mb-8">
    <span className="text-orange-500 font-semibold">All</span>
    <span>Guides</span>
    <span>Tools</span>
    <span>Workflow</span>
    <span>Security</span>
    <span>Updates</span>
  </div>

  {/* POSTS GRID */}
<div className="grid sm:grid-cols-2 font:bold md:grid-cols-4 gap-x-8 gap-y-14">
  {[
    {
      title: "How to Convert a PDF to Word Without Losing Format",
      desc: "A step-by-step guide for accurate file conversion.",
      category: "Guides",
      img: "/popular-post1.png",
    },
    {
      title: "Tool Spotlight: How Our PDF Compressor Works",
      desc: "Lesser-known features to boost efficiency. A behind-the-scenes look at the compression algorithm.",
      category: "Tools",
      img: "/popular-post2.png",
    },
    {
      title: "How to Create a Paperless Workflow Using PDF Tools",
      desc: "Go digital and stay efficient.",
      category: "Workflow",
      img: "/popular-post3.png",
    },
    {
      title: "Are Online PDF Tools Secure? What to Check",
      desc: "Know the risks and how we protect your data.",
      category: "Security",
      img: "/popular-post4.png",
    },
    {
      title: "New Feature Release: Drag & Drop Redesign",
      desc: "Improving ease of use and performance.",
      category: "Updates",
      img: "/popular-post5.png",
    },
    {
      title: "The Complete Guide to Compressing PDFs Online",
      desc: "Shrink file size without sacrificing quality.",
      category: "Guides",
      img: "/popular-post6.png",
    },
    {
      title: "Why Our Merge Tool Is Smarter Than Drag-and-Drop",
      desc: "Features that make merging faster and cleaner.",
      category: "Tools",
      img: "/popular-post7.png",
    },
    {
      title: "How to Create a Paperless Workflow Using PDF Tools",
      desc: "Go digital and stay efficient.",
      category: "Workflow",
      img: "/popular-post8.png",
    },
  ].map((post, index) => (
    <div key={index} className="flex flex-col">
      {/* IMAGE */}
      <div className="relative rounded-md overflow-hidden">
        <Image
          src={post.img}
          alt={post.title}
          width={480}
          height={300}
          className="w-full h-[210px] object-cover"
        />

        {/* CATEGORY BADGE */}
        <span className="absolute top-3 right-3 bg-black/60 text-white text-[11px] px-2 py-[3px] rounded">
          {post.category}
        </span>
      </div>

      {/* DATE */}
      <p className="mt-4 text-[12px] text-[#9CA3AF] tracking-wide">
        08.08.2021
      </p>

      {/* TITLE */}
      <h3 className="mt-1 text-[15px] font-semibold text-[#1F2937] leading-[1.35]">
        {post.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="mt-2 text-[13px] text-[#6B7280] leading-[1.6]">
        {post.desc}
      </p>
    </div>
  ))}
</div>
</section>
<Footer/>
    </>
  );
}
