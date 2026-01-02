"use client"

import { useState, useRef, useEffect } from "react"
import NewUploadBox from "@/components/NewUploadBox/page"
import Categories from "@/components/NewHomePage/Categories"
import Activity from "@/components/NewHomePage/Activity"
import HelpSection from "@/components/NewHomePage/HelpSection"
import Footer from "@/components/Footer/page"
import PageCard from "@/components/NewHomePage/Shopcard"
import FileUploadPopUp from "@/components/FileUpload-PopUp/page"
import { useRouter } from "next/navigation"
import UseStorage from "@/hooks/useStorage"
import { useOrder } from "@/context/orderContext"

export default function Page() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showUploadPopup, setShowUploadPopup] = useState(false)
  const [uploadingFile, setUploadingFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null)

  const { uploadFile } = UseStorage()
  const { dispatch } = useOrder()
  const router = useRouter()

  const handleFromDeviceClick = () => {
    fileInputRef.current?.click()
    setDropdownOpen(false)
  }

  const handleFromDriveClick = () => {
    alert("Google Drive integration goes here")
    setDropdownOpen(false)
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    setUploadingFile(selectedFile)
    setShowUploadPopup(true)

    const uploadedDoc = await uploadFile(selectedFile)

    if (uploadedDoc) {
      dispatch({ type: "ADD_DOCUMENT", payload: uploadedDoc })
    }

    // Optional delay to allow animation
    setTimeout(() => {
      router.push("/print-and-deliver/print")
    }, 2500)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col items-center bg-gray-100 min-h-screen lg:px-[200px] md:px-[100px] sm:px-[100px] px-4">
        <div className="flex lg:flex-nowrap flex-wrap w-full min-h-[400px] items-center gap-4 lg:py-16 md:py-16 sm:py-16 py-4">
          <div className="h-auto lg:w-1/2 md:w-1/2 w-full">
            <NewUploadBox
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
              dropdownMenuRef={dropdownMenuRef}
              fileInputRef={fileInputRef}
              handleFromDeviceClick={handleFromDeviceClick}
              handleFromDriveClick={handleFromDriveClick}
              handleFileChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      <Categories />
      <PageCard />
      <Activity />
      <HelpSection />
      <Footer />

      {showUploadPopup && uploadingFile && (
        <FileUploadPopUp onClose={() => setShowUploadPopup(false)} />
      )}
    </div>
  )
}
