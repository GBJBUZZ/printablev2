import React, { ReactNode } from "react";
// import { OrderProvider } from "@/context/orderContext";
import { Protect } from "@clerk/nextjs";

export default function PrintAndDeliverLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section>
      <Protect> {children}</Protect>
    </section>
  );
}
