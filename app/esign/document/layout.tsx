import React from "react";
import SignProvider from "../useSign";
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignProvider>{children}</SignProvider>
    </>
  );
}

export default Layout;
