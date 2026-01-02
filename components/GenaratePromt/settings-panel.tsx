"use client"

import { useState } from "react"
import { ChevronDown, FileText, Copy, LayoutGrid } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPanel() {
    const [selectedTags, setSelectedTags] = useState(["Business"])
    const [selectedTone, setSelectedTone] = useState(["Professional"])

    return (
        <div className="space-y-6">
            <h2 className="text-lg text-gray-600 mb-2">Settings</h2>

            {/* Text Content */}
            <Card className="p-4 h-[1214px] w-[700px] bg-white/20 backdrop-blur-sm rounded-[20px] mt-10 p-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Text content</h3>
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
                <p className="text-sm text-gray-500 mb-3">Amount of text per card</p>
                <div className="flex gap-2 mb-4">
                    <Button variant="outline" className="rounded-[20px] h-[50px] w-[150px] flex items-center gap-2 bg-white">
                        <FileText className="h-4 w-4" /> Brief
                    </Button>
                    <Button
                        variant="outline"
                        className="rounded-[20px] h-[50px] w-[150px] flex items-center gap-2 bg-green-100 text-green-700 border-green-200"
                    >
                        <FileText className="h-4 w-4" /> Medium
                    </Button>
                    <Button variant="outline" className="rounded-[20px] h-[50px] w-[150px] flex items-center gap-2 bg-white">
                        <FileText className="h-4 w-4" /> Detailed
                    </Button>
                </div>

                <p className="text-sm text-gray-500 mb-2">Write For...</p>
                <div className="p-3 border h-[150px] rounded-[20px] mb-3 bg-white/60">
                    <div className="flex gap-2 flex-wrap">
                        {selectedTags.map((tag) => (
                            <Badge
                                key={tag}
                                className="bg-green-100 text-green-700 hover:bg-green-200 flex items-center gap-1 px-3 py-1 rounded-full"
                            >
                                {tag}
                                <button className="ml-1" onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}>
                                    ×
                                </button>
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 ">
                    <Button
                        variant="outline"
                        className="rounded-[20px] h-[50px] w-[160px] bg-green-50 text-green-700 border-green-100 hover:bg-green-100"
                    >
                        Business
                    </Button>
                    <Button variant="outline" className="rounded-[20px] bg-white h-[50px] w-[160px]  hover:bg-white/80">
                        Creatives
                    </Button>
                    <Button variant="outline" className="rounded-[20px] bg-white h-[50px] w-[160px] hover:bg-white/80">
                        Analysts
                    </Button>
                    <Button variant="outline" className="rounded-[20px] bg-white h-[50px] w-[160px] hover:bg-white/80 ">
                        Tech & Digital
                    </Button>
                    <Button variant="outline" className="rounded-[20px] bg-white h-[50px] w-[160px]  hover:bg-white/80">
                        Educational
                    </Button>
                </div>

                <p className="text-sm text-gray-500 mb-2">Tone</p>
                <div className="p-3 border h-[150px] rounded-[20px] mb-3 bg-white/60">
                    <div className="flex gap-2 flex-wrap">
                        {selectedTone.map((tone) => (
                            <Badge
                                key={tone}
                                className="bg-green-100 text-green-700 hover:bg-green-200 flex items-center gap-1 px-3 py-1 rounded-full"
                            >
                                {tone}
                                <button className="ml-1" onClick={() => setSelectedTone(selectedTone.filter((t) => t !== tone))}>
                                    ×
                                </button>
                            </Badge>
                        ))}
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4 ">
                    <Button
                        variant="outline"
                        className="rounded-[20px] h-[50px] w-[160px] bg-green-50 text-green-700 border-green-100 hover:bg-green-100"
                    >
                        Technical
                    </Button>
                    <Button variant="outline" className="rounded-[20px] bg-white h-[50px] w-[160px]  hover:bg-white/80" >
                        Academic
                    </Button>
                    <Button variant="outline" className="rounded-[20px] bg-white h-[50px] w-[160px]  hover:bg-white/80">
                        Humorous
                    </Button>
                    <Button variant="outline" className="rounded-[20px] bg-white h-[50px] w-[160px]  hover:bg-white/80">
                        Professional
                    </Button>
                    <Button variant="outline" className="rounded-[20px] bg-white h-[50px] w-[160px]  hover:bg-white/80">
                        Inspirational
                    </Button>
                </div>

                <p className="text-sm text-gray-500 mb-2 rounded-[20px]">Output language</p>
                <Select defaultValue="en-US">
                    <SelectTrigger className="w-full bg-white">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-[20px] overflow-hidden flex items-center justify-center">
                                <span className="text-xs">🌐</span>
                            </div>
                            <SelectValue placeholder="Select language" />
                        </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="en-GB">English (UK)</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                </Select>

                 {/* Format */}
            <Card className="p-4 bg-white/60 backdrop-blur-sm mt-12 h-[180px] rounded-[20px]">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Format</h3>
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
                <p className="text-sm text-gray-500 mb-2">Page Style</p>
                <Select defaultValue="default">
                    <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                        </div>
                        <span className="text-sm text-gray-500">500/20000</span>
                    </div>
                </div>
            </Card>


            </Card>

           

            {/* Additional Instructions */}
            <Card className="p-4 bg-white/40 backdrop-blur-sm rounded-[20px]">
                <h3 className="font-semibold mb-4">Additional Instructions</h3>
                <textarea
                    className="w-full p-3 border rounded-md bg-white"
                    rows={3}
                    placeholder="Add any additional instructions here..."
                    defaultValue="XXX - Beauty Introductions"
                ></textarea>
            </Card>

            {/* Tips */}
            <Card className="p-4 bg-white/40 backdrop-blur-sm rounded-[20px]">
                <h3 className="font-semibold mb-4">Tips</h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-white rounded-md">
                        <LayoutGrid className="h-5 w-5 text-gray-500 mt-1" />
                        <div>
                            <p className="font-medium">Card-by-Card</p>
                            <p className="text-sm text-gray-500">
                                Card-by-card lets you specify exactly where card breaks should go, so you can outline your content card
                                by card.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white rounded-md">
                        <Copy className="h-5 w-5 text-gray-500 mt-1" />
                        <div>
                            <p className="font-medium">Editing cards</p>
                            <p className="text-sm text-gray-500">Drag to rearrange, or type --- to add new cards.</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
