import React, { ReactNode } from "react";
// import { OrderProvider } from "@/context/orderContext";
import { Protect } from "@clerk/nextjs";
import { SlidesProvider } from "@/context/globalSlideContext";
export default function PresentationMakerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section>
      <Protect>
        <SlidesProvider>{children}</SlidesProvider>
      </Protect>
    </section>
  );
}
