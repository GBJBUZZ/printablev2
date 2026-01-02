"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function UploadDocument() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <h2 className="text-2xl font-bold">
          Welcome to <span className="text-green-500">Printable</span>
        </h2>
      </CardHeader>
      <CardContent>
        <div
          className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg transition-colors ${
            isDragging ? "border-green-500 bg-green-50" : "border-gray-300 bg-[#050A30]"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center gap-2 text-white">
              <Upload className="h-8 w-8" />
              <span className="font-medium">Upload Document</span>
              {!file && <p className="text-sm text-gray-300 text-center">Drag and drop or click to upload</p>}
              {file && <p className="text-sm text-green-300 text-center">{file.name} selected</p>}
            </div>
          </label>
        </div>
      </CardContent>
    </Card>
  )
}

