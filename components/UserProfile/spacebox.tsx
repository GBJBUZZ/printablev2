"use client";
import dynamic from "next/dynamic";
import React, { useState, useRef, useEffect } from "react";
import {
  FaEllipsisH,
  FaFile,
  FaFileAlt,
  FaFilter,
  FaFolder,
  FaImage,
  FaList,
  FaPlus,
  FaSearch,
  FaThLarge,
  FaUpload,
  FaVideo,
} from "react-icons/fa";
import {
  FaPrint,
  FaDownload,
  FaShareAlt,
  FaStar,
  FaPencilAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { RiStarFill } from "react-icons/ri";

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ApexChart = () => {
  const [state] = React.useState({
    series: [45, 28, 15, 11], // Docs, Images, Videos, Other Files
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "16px",
              color: "#111827",
              fontWeight: 600,
            },
            value: {
              fontSize: "14px",
              color: "#6B7280",
            },
            total: {
              show: true,
              label: "Storage Used",
              fontSize: "20px",
              fontWeight: 600,
              color: "#0B0E3F",
              formatter: function () {
                return "64%";
              },
            },
          },
        },
      },
      colors: ["#FACC15", "#A78BFA", "#F97316", "#EC4899"], // Yellow, Purple, Orange, Pink
      labels: ["Docs", "Images", "Videos", "Other Files"],
      legend: {
        show: false, // We'll use custom legend
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 300,
            },
          },
        },
      ],
    },
  });

  return (
    <div className="w-48 h-48 mx-auto lg:mx-0 flex-shrink-0">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="radialBar"
        height={180}
        width={180}
      />
    </div>
  );
};

export default function MySpaceBox() {
  const [isGridView, setIsGridView] = useState(false);

  const toggleView = (view: "grid" | "list") => {
    setIsGridView(view === "grid");
  };

  const folders = [
    {
      name: "Business Cards",
      items: "45 Items",
      date: "Apr 21, 2025",
      starred: false,
    },
    { name: "Flyers", items: "45 Items", date: "Apr 20, 2025", starred: true },
    {
      name: "Brochures",
      items: "45 Items",
      date: "Apr 19, 2025",
      starred: false,
    },
    {
      name: "Posters",
      items: "45 Items",
      date: "Apr 19, 2025",
      starred: false,
    },
    {
      name: "Glossy Noise",
      items: "45 Items",
      date: "Apr 19, 2025",
      starred: false,
    },
  ];

  const files = [
    {
      name: "May-scanner-2024.jpg",
      type: "Image",
      size: "10 MB",
      date: "Apr 19, 2025",
    },
    {
      name: "May-scanner-2024.pdf",
      type: "Document",
      size: "10 MB",
      date: "Apr 19, 2025",
    },
    {
      name: "May-scanner-2024.docx",
      type: "Word",
      size: "10 MB",
      date: "Apr 19, 2025",
    },
    {
      name: "May-scanner-2024.xlsx",
      type: "Excel",
      size: "10 MB",
      date: "Apr 19, 2025",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [menuType, setMenuType] = useState<"file" | "folder" | null>(null);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setOpenMenuIndex(null);
        setMenuType(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  ); // Optional: Track which file/folder is being renamed
  const [selectedItem, setSelectedItem] = useState<any>(null);

  interface ActionDropdownProps {
    onRename: () => void;
  }

  const ActionDropdown: React.FC<ActionDropdownProps> = ({ onRename }) => (
    <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl z-50 text-sm">
      <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
        <FaPrint /> Quick Print
      </button>
      <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
        <FaDownload /> Download
      </button>
      <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
        <FaShareAlt /> Share
      </button>
      <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
        <FaStar /> Favorite
      </button>
      <button
        onClick={onRename}
        className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        <FaPencilAlt /> Rename
      </button>
      <button className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50">
        <FaTrashAlt /> Delete
      </button>
    </div>
  );

  return (
    <div className="bg-gray-100  min-h-screen">
      <div className="mx-auto bg-white rounded-xl p-6 space-y-6 shadow-sm">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="font-semibold text-lg text-gray-900">
              Printable Vault
            </h1>
            <p className="text-sm text-gray-500">
              Upload, organize, and manage your files for printing.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 border border-gray-700 rounded-md text-gray-700 text-sm font-medium px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Create new folder"
            >
              <FaPlus className="w-4 h-4" /> Create Folder
            </button>

            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-75">
                <div className="bg-white p-6 rounded-3xl shadow-lg w-[400px]">
                  <h2 className="text-xl font-semibold mb-4">New Folder</h2>
                  <input
                    type="text"
                    defaultValue="Untitled folder"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 border border-[#0B005C] text-[#0B005C] rounded-md text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                      }}
                      className="px-4 py-2 bg-[#0B005C] text-white rounded-md text-sm"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium rounded-md px-5 py-2 hover:bg-gray-800 transition-colors duration-200"
              aria-label="Upload files"
            >
              <FaUpload className="w-4 h-4" /> Upload Files
            </button>
          </div>
        </header>

        <section className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:max-w-sm bg-gray-50 rounded-2xl p-8">
            <h2 className="text-gray-900 font-extrabold text-2xl mb-8">
              Storage Overview
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-gray-900 font-extrabold text-4xl leading-none">
                3.2 <span className="font-normal">GB</span>
              </p>
              <p className="text-gray-500 font-normal text-lg">of 5 GB Used</p>
            </div>

            <div
              className="mt-6"
              role="progressbar"
              aria-valuenow={64}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Storage usage: 64%"
            >
              <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 transition-all duration-300"
                  style={{ width: "64%" }}
                ></div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="bg-gray-900 text-white text-lg font-normal rounded-full px-8 py-3 hover:bg-gray-800 transition-colors duration-200">
                Upgrade Storage
              </button>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 flex-1 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <ApexChart />
            <div className="flex flex-col flex-1 max-w-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-6 rounded-sm bg-[#FACC15]"
                    aria-hidden="true"
                  ></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      <FaFileAlt className="w-3 h-3" aria-hidden="true" /> Docs
                    </p>
                    <p className="text-xs text-gray-400">1.2 GB</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900">35%</p>
              </div>

              <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-6 rounded-sm bg-[#F97316]"
                    aria-hidden="true"
                  ></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      <FaVideo className="w-3 h-3" aria-hidden="true" /> Videos
                    </p>
                    <p className="text-xs text-gray-400">123 MB</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900">15%</p>
              </div>

              <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-6 rounded-sm bg-[#A78BFA]"
                    aria-hidden="true"
                  ></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      <FaImage className="w-3 h-3" aria-hidden="true" /> Images
                    </p>
                    <p className="text-xs text-gray-400">601 MB</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900">28%</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-6 rounded-sm bg-[#EC4899]"
                    aria-hidden="true"
                  ></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      <FaFile className="w-3 h-3" aria-hidden="true" /> Others
                      Files
                    </p>
                    <p className="text-xs text-gray-400">232 MB</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900">11%</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="w-full rounded-xl bg-white p-6 md:p-8 mt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center w-full md:w-1/2 relative">
            <FaSearch
              className="text-gray-400 absolute left-3"
              aria-hidden="true"
            />
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Search orders, customers"
              type="text"
              aria-label="Search orders or customers"
            />
          </div>
          <div className="flex gap-3 justify-end w-full md:w-auto">
            <button
              className="flex items-center gap-1 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              type="button"
              aria-label="Apply filters"
            >
              <FaFilter /> Filters
            </button>
            <button
              className={`flex items-center gap-1 border border-gray-300 rounded-md px-4 py-2 text-sm ${
                isGridView
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              type="button"
              aria-label="Switch to grid view"
              onClick={() => toggleView("grid")}
            >
              <FaThLarge /> Grid
            </button>
            <button
              className={`flex items-center gap-1 rounded-md px-4 py-2 text-sm ${
                !isGridView
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
              type="button"
              aria-label="Switch to list view"
              onClick={() => toggleView("list")}
            >
              <FaList /> List
            </button>
          </div>
        </div>

        {isGridView ? (
          <div className="space-y-8">
            {/* FOLDERS SECTION */}
            {folders.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 px-1">
                  Folders
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {folders.map((folder, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors duration-200"
                    >
                      <FaFolder
                        className="w-12 h-12 mx-auto text-gray-600"
                        aria-hidden="true"
                      />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        {folder.name}
                      </h3>
                      <p className="text-xs text-gray-500">{folder.items}</p>
                      <p className="text-xs text-gray-500">{folder.date}</p>
                      {folder.starred && (
                        <RiStarFill
                          className="w-4 h-4 text-yellow-400 mx-auto mt-1"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative mt-2">
                        <FaEllipsisH
                          className="cursor-pointer text-gray-500"
                          onClick={() => {
                            setOpenMenuIndex(index);
                            setMenuType("folder");
                          }}
                        />
                        {openMenuIndex === index && menuType === "folder" && (
                          <div ref={menuRef}>
                            <ActionDropdown
                              onRename={() => {
                                setSelectedItem(folder);
                                setRenameValue(folder.name);
                                setIsRenameModalOpen(true);
                                setOpenMenuIndex(null);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* FILES SECTION */}
            {files.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 px-1">
                  Files
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors duration-200"
                    >
                      {file.type === "Image" && (
                        <img
                          alt="Image file"
                          className="w-12 h-12 mx-auto"
                          src="https://storage.googleapis.com/a1aa/image/99a8e7a6-faaa-43b2-e710-7fc231c08c5a.jpg"
                        />
                      )}
                      {file.type === "Document" && (
                        <img
                          alt="PDF file"
                          className="w-12 h-12 mx-auto"
                          src="https://storage.googleapis.com/a1aa/image/c9a2192a-f962-4fdd-c4a0-d9e0747ca44c.jpg"
                        />
                      )}
                      {file.type === "Word" && (
                        <img
                          alt="Word file"
                          className="w-12 h-12 mx-auto"
                          src="https://storage.googleapis.com/a1aa/image/838744c0-398f-4547-cf8d-56a95f9d9d70.jpg"
                        />
                      )}
                      {file.type === "Excel" && (
                        <img
                          alt="Excel file"
                          className="w-12 h-12 mx-auto"
                          src="https://storage.googleapis.com/a1aa/image/9c92a9ce-cc6a-40b5-0831-33666e45f1b7.jpg"
                        />
                      )}
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        {file.name}
                      </h3>
                      <p className="text-xs text-gray-500">{file.type}</p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                      <p className="text-xs text-gray-500">{file.date}</p>
                      <div className="relative mt-2">
                        <FaEllipsisH
                          className="cursor-pointer text-gray-500"
                          onClick={() => {
                            setOpenMenuIndex(index);
                            setMenuType("file");
                          }}
                        />
                        {openMenuIndex === index && menuType === "file" && (
                          <div ref={menuRef}>
                            <ActionDropdown
                              onRename={() => {
                                setSelectedItem(file);
                                setRenameValue(file.name);
                                setIsRenameModalOpen(true);
                                setOpenMenuIndex(null);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 font-normal">NAME</th>
                <th className="py-3 px-4 font-normal">TYPE</th>
                <th className="py-3 px-4 font-normal">SIZE</th>
                <th className="py-3 px-4 font-normal">LAST MODIFIED</th>
                <th className="py-3 px-4 font-normal">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {folders.map((folder, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-4 flex items-center gap-2">
                    <FaFolder aria-hidden="true" /> {folder.name}
                    {folder.starred && (
                      <RiStarFill
                        className="w-4 h-4 text-yellow-400"
                        aria-hidden="true"
                      />
                    )}
                  </td>
                  <td className="py-4 px-4">Folder</td>
                  <td className="py-4 px-4">{folder.items}</td>
                  <td className="py-4 px-4">{folder.date}</td>
                  <td className="py-4 px-4 relative">
                    <FaEllipsisH
                      className="cursor-pointer"
                      onClick={() => {
                        setOpenMenuIndex(index);
                        setMenuType("folder");
                      }}
                    />
                    {openMenuIndex === index && menuType === "folder" && (
                      <div
                        ref={menuRef}
                        className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white z-50"
                      >
                        <ActionDropdown
                          onRename={() => {
                            setSelectedItem(folder);
                            setRenameValue(folder.name);
                            setIsRenameModalOpen(true);
                            setOpenMenuIndex(null);
                          }}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {files.map((file, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-4 flex items-center gap-2">
                    {file.type === "Image" && (
                      <img
                        alt="Icon representing an image file"
                        className="w-5 h-5"
                        src="https://storage.googleapis.com/a1aa/image/99a8e7a6-faaa-43b2-e710-7fc231c08c5a.jpg"
                      />
                    )}
                    {file.type === "Document" && (
                      <img
                        alt="Icon representing a PDF document file"
                        className="w-5 h-5"
                        src="https://storage.googleapis.com/a1aa/image/c9a2192a-f962-4fdd-c4a0-d9e0747ca44c.jpg"
                      />
                    )}
                    {file.type === "Word" && (
                      <img
                        alt="Icon representing a Word document file"
                        className="w-5 h-5"
                        src="https://storage.googleapis.com/a1aa/image/838744c0-398f-4547-cf8d-56a95f9d9d70.jpg"
                      />
                    )}
                    {file.type === "Excel" && (
                      <img
                        alt="Icon representing an Excel spreadsheet file"
                        className="w-5 h-5"
                        src="https://storage.googleapis.com/a1aa/image/9c92a9ce-cc6a-40b5-0831-33666e45f1b7.jpg"
                      />
                    )}
                    {file.name}
                  </td>
                  <td className="py-4 px-4">{file.type}</td>
                  <td className="py-4 px-4">{file.size}</td>
                  <td className="py-4 px-4">{file.date}</td>
                  <td className="py-4 px-4 relative">
                    <FaEllipsisH
                      className="cursor-pointer"
                      onClick={() => {
                        setOpenMenuIndex(index);
                        setMenuType("file");
                      }}
                    />
                    {openMenuIndex === index && menuType === "file" && (
                      <div
                        ref={menuRef}
                        className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white z-50"
                      >
                        <ActionDropdown
                          onRename={() => {
                            setSelectedItem(file);
                            setRenameValue(file.name);
                            setIsRenameModalOpen(true);
                            setOpenMenuIndex(null);
                          }}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {isRenameModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-75">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Rename</h2>
                <button onClick={() => setIsRenameModalOpen(false)}>✕</button>
              </div>
              <input
                className="w-full border border-[#0b0b47] rounded-xl px-4 py-2 text-sm mb-4"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
              />
              <div className="flex justify-end gap-3">
                <button
                  className="border border-[#0b0b47] px-4 py-2 rounded-xl text-[#0b0b47]"
                  onClick={() => setIsRenameModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#0b0b47] text-white px-4 py-2 rounded-xl"
                  onClick={() => {
                    console.log("Renamed:", selectedItem, "to:", renameValue);
                    setIsRenameModalOpen(false);
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
