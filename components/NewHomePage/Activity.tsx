import React from "react";
import { FiFileText } from "react-icons/fi";

export default function Activity() {
  const Activity = [
    {
      file: <FiFileText />,
      title: "Project_Proposal_2024.pdf",
      time: "2 hours ago",
      status: "Completed",
    },

    {
      file: <FiFileText />,
      title: "Project_Proposal_2024.pdf",
      time: "2 hours ago",
      status: "In Transit",
    },

    {
      file: <FiFileText />,
      title: "Project_Proposal_2024.pdf",
      time: "2 hours ago",
      status: "Pending",
    },

    {
      file: <FiFileText />,
      title: "Project_Proposal_2024.pdf",
      time: "2 hours ago",
      status: "Pending",
    },
  ];

  return (
    <div className="lg:px-[200px] md:px-[100px] sm:px-[100px] px-4">
      {/* Recent Activity Section */}

      <section>
        <div className="py-6 w-full h-auto">
          <h2 className="text-black  py-10 text-[32px] text-center lg:text-start md:text-start sm:text-start">
            My Recent Activity
          </h2>

          <div className="flex gap-2 flex-wrap w-full justify-center lg:justify-start">
            <div className="lg:w-[48%] md:w-[45%] w-full h-auto px-4 py-4 bg-[#E6E6ED] rounded-[10px]">
              <div className="flex gap-2 items-center">
                <FiFileText size={20} className="text-black" />{" "}
                <p className="text-black font-bold py-4">Recently printed</p>
              </div>

              <div>
                {Activity.map((item, idx) => (
                  <div key={idx}>
                    <div className="w-full h-auto bg-[#FFFFFF] rounded-[10px] mt-2">
                      <div className="flex justify-between px-2 py-2">
                        <div>
                          <div className="flex gap-4 items-center">
                            <div>
                              <FiFileText size={25} className="text-black" />
                            </div>
                            <div>
                              <p className="text-black">{item.title}</p>
                              <p className="text-black text-[10px]">
                                {item.time}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div
                            className={`text-sm px-2 py-1 rounded-full ${
                              item.status === "Completed"
                                ? "bg-[#34C75926] text-[#34C759]"
                                : item.status === "In Transit"
                                ? "bg-[#007AFF26] text-[#007AFF]"
                                : "bg-[#FBBC0426] text-[#AC2B20]"
                            }`}
                          >
                            {item.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-[48%] md:w-[45%] w-full h-auto px-4 py-4 bg-[#E6E6ED] rounded-[10px] flex justify-center items-center">
              <div>
                <p className="text-black font-semibold text-[32px]">
                  In Progress
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
