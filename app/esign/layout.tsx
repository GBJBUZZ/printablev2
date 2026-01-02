import SignProvider from "./useSign";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SignProvider>{children}</SignProvider>
  );
}
