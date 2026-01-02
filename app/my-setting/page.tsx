// app/account/page.tsx@/components/UserProfile/myaccount/account
"use client";

import Sidebar from "@/components/UserProfile/sidebar"; 
import { motion } from "framer-motion";
// import MySpaceBox from "@/components/UserProfile/spacebox";
import SystemSetting from "@/components/UserProfile/settingpage";

const mockUser = {
  name: "Jay Vasani",
  email: "jayuuxz48@gmail.com",
  imageUrl: "/UserAvtar.png",
  phone: "+91 9173664845",
};

export default function Page() {
  return (
    <div className="flex bg-[#f5f6fa] min-h-screen px-36 py-6 gap-6">
      <Sidebar user={mockUser} />
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <SystemSetting />
      </motion.div>
    </div>
  );
}
