"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, FileText, User } from "lucide-react";

interface SignatureStatus {
  status: string;
  email: string;
  signedAt: string;
  signId: string;
}

interface TimelineItem {
  fileName: string;
  createdAt: string;
  signeeSignStatus: string;
  signeeEmail: string;
  signedAt: string;
  signId: string;
}

interface DocumentTimelineProps {
  timelineItems: TimelineItem[];
}

export default function DocumentTimeline({
  timelineItems,
}: DocumentTimelineProps) {
  const [activeTab, setActiveTab] = useState("timeline");

  // Get the most recent item for the document header
  const latestItem = timelineItems[0] || {
    fileName: "document.pdf",
    signeeSignStatus: "pending",
    signedAt: "",
    signeeEmail: "",
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not signed yet";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getInitials = (email: string) => {
    if (!email) return "US";
    const parts = email.split("@")[0].split(".");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "signed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="w-[60vh] max-w-md bg-white rounded-lg shadow-sm ">
      {/* Document Status Header */}
      <div
        className={`p-6 ${
          latestItem.signeeSignStatus.toLowerCase() === "signed" ||
          latestItem.signeeSignStatus.toLowerCase() === "completed"
            ? "bg-green-50"
            : latestItem.signeeSignStatus.toLowerCase() === "pending"
            ? "bg-yellow-50"
            : "bg-gray-50"
        } rounded-t-lg `}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {latestItem.signeeSignStatus.toLowerCase() === "signed" ||
            latestItem.signeeSignStatus.toLowerCase() === "completed" ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold text-green-800">
                  Document signed
                </h2>
              </>
            ) : latestItem.signeeSignStatus.toLowerCase() === "pending" ? (
              <>
                <Clock className="h-5 w-5 text-yellow-600" />
                <h2 className="text-lg font-semibold text-yellow-800">
                  Awaiting signatures
                </h2>
              </>
            ) : (
              <>
                <FileText className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Document status
                </h2>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <FileText className="h-4 w-4 text-gray-700" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-700"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div
            className={`${
              latestItem.signeeSignStatus.toLowerCase() === "signed" ||
              latestItem.signeeSignStatus.toLowerCase() === "completed"
                ? "bg-green-100"
                : latestItem.signeeSignStatus.toLowerCase() === "pending"
                ? "bg-yellow-100"
                : "bg-gray-100"
            } rounded-full p-2`}
          >
            <FileText
              className={`h-5 w-5 ${
                latestItem.signeeSignStatus.toLowerCase() === "signed" ||
                latestItem.signeeSignStatus.toLowerCase() === "completed"
                  ? "text-green-700"
                  : latestItem.signeeSignStatus.toLowerCase() === "pending"
                  ? "text-yellow-700"
                  : "text-gray-700"
              }`}
            />
          </div>
          <div>
            <p className="font-medium">{latestItem.fileName}</p>
            <p className="text-sm text-gray-600">
              {latestItem.signeeEmail.split("@")[0]} •{" "}
              {formatDate(latestItem.signedAt || latestItem.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`${
              latestItem.signeeSignStatus.toLowerCase() === "signed" ||
              latestItem.signeeSignStatus.toLowerCase() === "completed"
                ? "bg-green-100"
                : latestItem.signeeSignStatus.toLowerCase() === "pending"
                ? "bg-yellow-100"
                : "bg-gray-100"
            } rounded-full p-2`}
          >
            {latestItem.signeeSignStatus.toLowerCase() === "signed" ||
            latestItem.signeeSignStatus.toLowerCase() === "completed" ? (
              <CheckCircle className="h-5 w-5 text-green-700" />
            ) : (
              <Clock className="h-5 w-5 text-yellow-700" />
            )}
          </div>
          <p className="text-sm">
            {latestItem.signeeSignStatus.toLowerCase() === "signed" ||
            latestItem.signeeSignStatus.toLowerCase() === "completed"
              ? "Signed with a secure digital signature"
              : "Waiting for signature"}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="timeline" className="w-full">
        <div className="px-4 border-b">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="timeline"
              className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm text-gray-500 hover:text-black"
            >
              <Clock className="h-4 w-4 mr-2" />
              Activity timeline
            </TabsTrigger>
            <TabsTrigger
              value="signees"
              className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm text-gray-500 hover:text-black"
            >
              <User className="h-4 w-4 mr-2" />
              Signees
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="p-4">
          <div className="space-y-4">
            {timelineItems.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  {index < timelineItems.length - 1 && (
                    <div className="absolute top-8 bottom-0 left-1/2 w-0.5 -ml-px h-full bg-gray-200" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.fileName}</p>
                  <p className="text-sm text-gray-600">
                    {item.signeeEmail} •{" "}
                    {formatDate(item.signedAt || item.createdAt)}
                  </p>
                  <Badge
                    className={`mt-1 font-normal ${getStatusColor(
                      item.signeeSignStatus
                    )}`}
                    variant="outline"
                  >
                    {item.signeeSignStatus}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Signees Tab */}
        <TabsContent value="signees" className="p-4">
          <div className="space-y-3">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 border border-gray-200">
                    <AvatarFallback>
                      {getInitials(item.signeeEmail)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {item.signeeEmail.split("@")[0]}
                    </p>
                    <p className="text-xs text-gray-500">{item.signeeEmail}</p>
                  </div>
                </div>
                <Badge
                  className={getStatusColor(item.signeeSignStatus)}
                  variant="outline"
                >
                  {item.signeeSignStatus === "signed"
                    ? "Completed"
                    : item.signeeSignStatus}
                </Badge>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
