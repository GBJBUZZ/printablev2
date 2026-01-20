import FooterSection from "@/components/Footer/page";
import { NavBar } from "@/components/nav-bar";

export default function HomePage() {
    return (
        <>
        <main className="relative overflow-hidden bg-[url('/landingBackground.png')]">
            {/* Background dots */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:18px_18px]" />

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <div>
                    <span className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-1 text-sm rounded-full bg-white text-black">
                            <img src="/poweredbyAi.png" alt="" />{" "}
                            Powered by AI · Trusted by 10,000+ users
                        </span>
                    </span>

                    <h1 className="text-6xl font-bold leading-tight mb-6 text-black">
                        <span className="bg-gradient-to-r from-[#06044B] to-[#61E987] bg-clip-text text-transparent">
                            Print
                        </span>{" "}
                        Smarter
                        <br />

                        <span className="bg-gradient-to-r from-[#06044B] to-[#61E987] bg-clip-text text-transparent">
                            Customize
                        </span>{" "}
                        Faster
                        <br />

                        <span className="bg-gradient-to-r from-[#06044B] to-[#61E987] bg-clip-text text-transparent">
                            Deliver
                        </span>{" "}
                        Anywhere
                    </h1>

                    <p className="text-gray-600 max-w-lg">
                        One platform for designing, printing, managing &
                        delivering documents with AI-powered tools.
                    </p>
                </div>

                {/* Right Visual */}
                <div className="relative flex justify-center">
                    {/* Main Card */}
                    <div className=" rounded-2xl p-5 shadow-[0_35px_60px_rgba(0,0,0,0.4)] bg-white">
                        <div className="w-[320px] h-[420px] rounded-xl border border-black  bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500" />
                    </div>
                    {/* AI Tool Badge */}
                    <div className="absolute -bottom-20 left-6">
                        {/* Outer white card */}
                       <div className="bg-white/30 backdrop-blur-md rounded-xl p-5 shadow-xl border border-gray-200">
                            {/* Inner dark card */}
                            <div className="bg-[#06044B] rounded-xl w-28 h-28 flex flex-col items-center justify-center gap-3">
                                {/* Icon */}
                                <img
                                    src="/poweredbyAi.png"
                                    alt="AI Powered"
                                    className="w-8 h-8"
                                />

                                {/* Text */}
                                <div className="text-center text-white leading-tight">
                                    <p className="font-semibold text-sm">
                                        AI Powered
                                    </p>
                                    <p className="text-xs opacity-80">
                                        Smart Tools
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Instant Delivery Badge */}
                    <div className="absolute -top-20 right-5">
                        {/* Outer white card */}
                        <div className="bg-white/30 backdrop-blur-md rounded-xl p-5 shadow-xl border border-gray-200">
                            {/* Inner green card */}
                            <div className="bg-[#61E987] rounded-xl w-28 h-28 flex flex-col items-center justify-center gap-2">
                                <img
                                    src="/rightArrow.png"
                                    alt="Arrow"
                                    className="w-6 h-6"
                                />

                                <div className="text-center text-black leading-tight">
                                    <p className="font-semibold text-sm">
                                        Instant
                                    </p>
                                    <p className="text-xs">Delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <div className="mt-40">
        <FooterSection/>
        </div>
        </>
    );
}


// "use client"

// import { useState, useRef, useEffect } from "react"
// import NewUploadBox from "@/components/NewUploadBox/page"
// import Categories from "@/components/NewHomePage/Categories"
// import Activity from "@/components/NewHomePage/Activity"
// import HelpSection from "@/components/NewHomePage/HelpSection"
// import Footer from "@/components/Footer/page"
// import PageCard from "@/components/NewHomePage/Shopcard"
// import FileUploadPopUp from "@/components/FileUpload-PopUp/page"
// import { useRouter } from "next/navigation"
// import UseStorage from "@/hooks/useStorage"
// import { useOrder } from "@/context/orderContext"

// export default function Page() {
//   const [dropdownOpen, setDropdownOpen] = useState(false)
//   const [showUploadPopup, setShowUploadPopup] = useState(false)
//   const [uploadingFile, setUploadingFile] = useState<File | null>(null)
//   const fileInputRef = useRef<HTMLInputElement | null>(null)
//   const dropdownMenuRef = useRef<HTMLDivElement | null>(null)

//   const { uploadFile } = UseStorage()
//   const { dispatch } = useOrder()
//   const router = useRouter()

//   const handleFromDeviceClick = () => {
//     fileInputRef.current?.click()
//     setDropdownOpen(false)
//   }

//   const handleFromDriveClick = () => {
//     alert("Google Drive integration goes here")
//     setDropdownOpen(false)
//   }

//   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0]
//     if (!selectedFile) return

//     setUploadingFile(selectedFile)
//     setShowUploadPopup(true)

//     const uploadedDoc = await uploadFile(selectedFile)

//     if (uploadedDoc) {
//       dispatch({ type: "ADD_DOCUMENT", payload: uploadedDoc })
//     }

//     // Optional delay to allow animation
//     setTimeout(() => {
//       router.push("/print-and-deliver/print")
//     }, 2500)
//   }

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         dropdownMenuRef.current &&
//         !dropdownMenuRef.current.contains(event.target as Node)
//       ) {
//         setDropdownOpen(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   return (
//     <div className="overflow-x-hidden">
//       <div className="flex flex-col items-center bg-gray-100 min-h-screen lg:px-[200px] md:px-[100px] sm:px-[100px] px-4">
//         <div className="flex lg:flex-nowrap flex-wrap w-full min-h-[400px] items-center gap-4 lg:py-16 md:py-16 sm:py-16 py-4">
//           <div className="h-auto lg:w-1/2 md:w-1/2 w-full">
//             <NewUploadBox
//               dropdownOpen={dropdownOpen}
//               setDropdownOpen={setDropdownOpen}
//               dropdownMenuRef={dropdownMenuRef}
//               fileInputRef={fileInputRef}
//               handleFromDeviceClick={handleFromDeviceClick}
//               handleFromDriveClick={handleFromDriveClick}
//               handleFileChange={handleFileChange}
//             />
//           </div>
//         </div>
//       </div>

//       <Categories />
//       <PageCard />
//       <Activity />
//       <HelpSection />
//       <Footer />

//       {showUploadPopup && uploadingFile && (
//         <FileUploadPopUp onClose={() => setShowUploadPopup(false)} />
//       )}
//     </div>
//   )
// }
