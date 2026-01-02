"use client";
import { createContext, useContext, ReactNode, useState } from "react";

type Slide = {
  id: number;
  title: string;
  bulletPoints: string[];
  isEditing: boolean;
};
export type SlidesContextType = {
  globalSlides: any;
  setGlobalSlides: React.Dispatch<React.SetStateAction<any>>;
};

const SlidesContext = createContext<SlidesContextType | undefined>(undefined);

export default SlidesContext;

export const useSlidesContext = (): SlidesContextType => {
  const context = useContext(SlidesContext);
  if (!context) {
    throw new Error("useSlidesContext must be used within a SlidesProvider");
  }
  return context;
};

export const SlidesProvider = ({ children }: { children: ReactNode }) => {
  const [globalSlides, setGlobalSlides] = useState<Slide[]>([]);

  return (
    <SlidesContext.Provider value={{ globalSlides, setGlobalSlides }}>
      {children}
    </SlidesContext.Provider>
  );
};
