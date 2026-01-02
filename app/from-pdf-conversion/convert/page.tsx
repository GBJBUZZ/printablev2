'use client'
import React, { useState } from 'react';
import Convert from "@/components/Convert/ConvertDropDown";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function to change the state of isOpen
  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div>
      {/* Passing the required props */}
      <Convert isOpen={isOpen} onToggle={toggleOpen} />
    </div>
  );
}

export default page;
