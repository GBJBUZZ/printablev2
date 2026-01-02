"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  MoreVertical,
  FileText,
  Download,
  Trash2,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  FileImage,
  FileSpreadsheet,
  FileCode,
  FileIcon as FilePdf,
  FileAudio,
  FileVideo,
  FileArchive,
  File,
  FileType,
  FileJson,
  FileIcon as FilePpt,
} from "lucide-react";
import DocumentUploader from "./components/documentUploader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { deleteFile, GetDocumentSignRecord } from "./components/utils/apiCalls";
import { toast } from "react-toastify";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

export default function DocumentManagement() {
  const router = useRouter();
  const { user } = useUser();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [downloadLoading, setDownloadLoading] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("DocumentManagement mounted in browser:", typeof window);
    if (user?.id) {
      fetchDocuments();
    }
  }, [user?.id]);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await GetDocumentSignRecord(user?.id as string);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch documents: ${response.status} ${response.statusText}`
        );
      }
      const result = await response.json();
      setDocuments(result);
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // Return original if invalid

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; // Return original on error
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase() || "";

    // Define styles for different file types
    const getIconStyles = (bgColor: string, iconColor: string) => {
      return {
        container: `flex items-center justify-center h-10 w-10 rounded-md ${bgColor}`,
        icon: `h-5 w-5 ${iconColor}`,
      };
    };

    let styles;
    let Icon;

    switch (extension) {
      case "pdf":
        styles = getIconStyles("bg-red-100", "text-red-600");
        Icon = FilePdf;
        break;
      case "doc":
      case "docx":
        styles = getIconStyles("bg-blue-100", "text-blue-600");
        Icon = FileText;
        break;
      case "xls":
      case "xlsx":
      case "csv":
        styles = getIconStyles("bg-green-100", "text-green-600");
        Icon = FileSpreadsheet;
        break;
      case "ppt":
      case "pptx":
        styles = getIconStyles("bg-orange-100", "text-orange-600");
        Icon = FilePpt;
        break;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "svg":
      case "webp":
        styles = getIconStyles("bg-purple-100", "text-purple-600");
        Icon = FileImage;
        break;
      case "mp3":
      case "wav":
      case "ogg":
        styles = getIconStyles("bg-amber-100", "text-amber-600");
        Icon = FileAudio;
        break;
      case "mp4":
      case "mov":
      case "avi":
      case "webm":
        styles = getIconStyles("bg-pink-100", "text-pink-600");
        Icon = FileVideo;
        break;
      case "zip":
      case "rar":
      case "7z":
      case "tar":
      case "gz":
        styles = getIconStyles("bg-orange-100", "text-orange-600");
        Icon = FileArchive;
        break;
      case "html":
      case "css":
        styles = getIconStyles("bg-cyan-100", "text-cyan-600");
        Icon = FileCode;
        break;
      case "js":
      case "jsx":
      case "ts":
      case "tsx":
        styles = getIconStyles("bg-yellow-100", "text-yellow-600");
        Icon = FileCode;
        break;
      case "json":
        styles = getIconStyles("bg-gray-100", "text-gray-600");
        Icon = FileJson;
        break;
      case "txt":
        styles = getIconStyles("bg-gray-100", "text-gray-600");
        Icon = FileType;
        break;
      default:
        styles = getIconStyles("bg-gray-100", "text-gray-600");
        Icon = File;
    }

    return (
      <div className={styles.container}>
        <Icon className={styles.icon} />
        <span className="absolute bottom-0 right-0 text-[8px] font-bold bg-white rounded-sm px-1 shadow-sm uppercase">
          {extension}
        </span>
      </div>
    );
  };

  const handleDocumentAction = async (action: string, document: any) => {
    console.log(
      "handleDocumentAction called, isBrowser:",
      typeof window !== "undefined"
    );
    switch (action) {
      case "open":
        if (typeof window !== "undefined") {
          window.open(`/esign/document?id=${document.fileId}`, "_blank");
        }
        break;
      case "download":
        try {
          setDownloadLoading(document.fileId);
          const downloadUrl =
            document.fileUrl ||
            `https://blog-storage-printable.s3.amazonaws.com/documents/${document.fileId}_${document.fileName}`;

          if (typeof window !== "undefined") {
            const response = await fetch(downloadUrl, {
              method: "GET",
              headers: {
                Accept: "application/octet-stream",
              },
            });

            if (!response.ok) {
              throw new Error(`Failed to fetch file: ${response.statusText}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = window.document.createElement("a");
            link.href = url;
            link.setAttribute("download", document.fileName);
            window.document.body.appendChild(link);
            link.click();
            window.document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success(`${document.fileName} download started`);
          } else {
            console.warn("Download attempted on server; skipping.");
            toast.error("Download is only available in the browser");
          }
        } catch (error) {
          toast.error("Download failed");
          console.error("Download error:", error);
        } finally {
          setDownloadLoading(null);
        }
        break;
      case "delete":
        try {
          setDeleteLoading(document.fileId);
          const response = await deleteFile({
            fileId: document.fileId,
            ownerId: user?.id,
            fileName: document.fileName,
          });
          const data = await response.json();
          toast.success(data.msg);
          await fetchDocuments();
        } catch (error) {
          toast.error("File delete failed");
          console.error("Delete error:", error);
        } finally {
          setDeleteLoading(null);
        }
        break;
      default:
        break;
    }
  };

  const getStatusBadge = (status: string) => {
    let bgColor = "";
    let textColor = "";
    let icon = null;

    switch (status.toLowerCase()) {
      case "completed":
        bgColor = "bg-green-100";
        textColor = "text-green-800";
        icon = <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-green-600" />;
        break;
      case "canceled":
        bgColor = "bg-red-100";
        textColor = "text-red-800";
        icon = <XCircle className="mr-1.5 h-3.5 w-3.5 text-red-600" />;
        break;
      case "out for signature":
        bgColor = "bg-amber-100";
        textColor = "text-amber-800";
        icon = <Clock className="mr-1.5 h-3.5 w-3.5 text-amber-600" />;
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-800";
        icon = <Clock className="mr-1.5 h-3.5 w-3.5 text-gray-600" />;
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
      >
        {icon}
        {status}
      </span>
    );
  };

  const renderSigneeAvatars = (signees: any[]) => {
    const maxVisible = 3;
    const visibleSignees = signees.slice(0, maxVisible);
    const remainingCount = signees.length - maxVisible;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {visibleSignees.map((signee, i) => {
                  const initials = signee.Email
                    ? signee.Email.substring(0, 2).toUpperCase()
                    : "??";

                  // Generate a consistent color based on the email
                  const colorIndex = signee.Email
                    ? signee.Email.charCodeAt(0) % 5
                    : i % 5;

                  const bgColors = [
                    "bg-[#00CCAA] text-white",
                    "bg-[#33CCFF] text-white",
                    "bg-purple-500 text-white",
                    "bg-amber-500 text-white",
                    "bg-pink-500 text-white",
                  ];

                  return (
                    <Avatar
                      key={i}
                      className="h-8 w-8 border-2 border-white transition-transform hover:scale-110"
                    >
                      <AvatarFallback className={bgColors[colorIndex]}>
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  );
                })}

                {remainingCount > 0 && (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-600 text-xs font-medium border-2 border-white">
                    +{remainingCount}
                  </div>
                )}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-white p-2 shadow-lg rounded-lg border">
            <div className="w-64">
              <h4 className="font-medium text-sm mb-2 text-gray-700 flex items-center">
                <Users className="h-4 w-4 mr-1.5" />
                All Signees
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {signees.map((signee, i) => {
                  const initials = signee.Email
                    ? signee.Email.substring(0, 2).toUpperCase()
                    : "??";

                  const colorIndex = signee.Email
                    ? signee.Email.charCodeAt(0) % 5
                    : i % 5;

                  const bgColors = [
                    "bg-[#00CCAA] text-white",
                    "bg-[#33CCFF] text-white",
                    "bg-purple-500 text-white",
                    "bg-amber-500 text-white",
                    "bg-pink-500 text-white",
                  ];

                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-50"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className={bgColors[colorIndex]}>
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm truncate">{signee.Email}</div>
                      {signee.hasSigned && (
                        <CheckCircle2 className="h-4 w-4 text-green-500 ml-auto" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 md:p-10 max-w-6xl bg-[#f8fafc]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-[#000033]">
          Let's Sign Documents
        </h1>
        <p className="text-slate-500">Upload, manage and sign your documents</p>
      </div>

      <div className="mb-10">
        <DocumentUploader />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold text-[#000033] flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Your Documents
          </h2>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search documents..."
              className="pl-9 bg-slate-50 border-slate-200 text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="h-10 w-10 border-4 border-[#00CCAA] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-sm text-slate-500 border-b">
                  <th className="pb-3 font-medium px-4">Name</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Created by</th>
                  <th className="pb-3 font-medium">Signees</th>
                  <th className="pb-3 font-medium">Last updated</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="text-black">
                {filteredDocuments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-500">
                      {searchQuery
                        ? "No documents match your search"
                        : "No documents available"}
                    </td>
                  </tr>
                ) : (
                  filteredDocuments.map((doc, idx) => (
                    <tr
                      key={idx}
                      className="border-b hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            {getFileIcon(doc.fileName)}
                          </div>
                          <Link
                            href={`/esign/document?id=${doc.fileId}`}
                            className="text-sm text-[#000033] hover:text-[#00CCAA] hover:underline font-medium"
                          >
                            {doc.fileName}
                          </Link>
                        </div>
                      </td>
                      <td className="py-4">{getStatusBadge(doc.status)}</td>
                      <td className="py-4 px-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-[#000033] text-white text-xs">
                              {user?.firstName?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span>You</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        {renderSigneeAvatars(doc.signees)}
                      </td>
                      <td className="py-4 text-sm">
                        <div className="flex items-center text-slate-600">
                          <Calendar className="h-3.5 w-3.5 mr-1.5" />
                          {formatDate(doc.signedAt)}
                        </div>
                      </td>
                      <td className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full cursor-pointer hover:bg-slate-100"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem
                              onSelect={() => handleDocumentAction("open", doc)}
                              className="cursor-pointer hover:bg-slate-100"
                            >
                              <FileText className="mr-2 h-4 w-4 text-[#000033]" />
                              <p className="text-black">View</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault(); // Prevent menu from closing
                                handleDocumentAction("download", doc);
                              }}
                              className="cursor-pointer hover:bg-slate-100"
                              disabled={downloadLoading === doc.fileId}
                            >
                              <Download className="mr-2 h-4 w-4 text-[#000033]" />
                              <p className="text-black">
                                {downloadLoading === doc.fileId
                                  ? "Downloading..."
                                  : "Download"}
                              </p>
                              {downloadLoading === doc.fileId && (
                                <div className="ml-2 h-4 w-4 border-2 border-[#00CCAA] border-t-transparent rounded-full animate-spin" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault(); // Prevent menu from closing
                                handleDocumentAction("delete", doc);
                              }}
                              className="cursor-pointer hover:bg-slate-100"
                              disabled={deleteLoading === doc.fileId}
                            >
                              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                              <p className="text-black">
                                {deleteLoading === doc.fileId
                                  ? "Deleting..."
                                  : "Delete"}
                              </p>
                              {deleteLoading === doc.fileId && (
                                <div className="ml-2 h-4 w-4 border-2 border-[#00CCAA] border-t-transparent rounded-full animate-spin" />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
