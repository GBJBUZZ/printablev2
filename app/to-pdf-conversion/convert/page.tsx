'use client';
import React from 'react'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import { GoArrowRight } from "react-icons/go";
import { GoArrowBoth } from "react-icons/go";
const Convert = () => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [extension,setExtension]=useState<string | null>(null);
    
  const [progress, setProgress] = useState(0);
const router =useRouter();
  useEffect(() => {
    const name = sessionStorage.getItem('selectedFileName');
    const exten=sessionStorage.getItem('extenName');
    setExtension(exten);
    setFileName(name);

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200); // every 200ms progress 5%

    return () => clearInterval(interval);
  }, []);
  
  useEffect(()=>{
    if(progress===100){ 
        router.push('/to-pdf-conversion/Download')
    }
  },[progress,router])
  return (
    <>
    <h1 className='flex items-center gap-2 bg-[#FFFFFF] font-bold text-[24px] px-2 h-[40px]'><span className='uppercase'>{extension}</span> <GoArrowBoth/> PDF </h1>
     <main className="min-h-screen flex flex-col items-center justify-center bg-[#E6E6ED] p-4">
          <div className="text-center flex flex-col items-center justify-center">
            <div className='flex items-center gap-4 mb-2'>
            {extension==='word' && <Image alt='image' src='/Worddoc.png' width={229} height={275}/>}
            {extension==='ppt' && <Image alt='image' src='/pptformat.png' width={229} height={275}/>}
            {extension==='excel' && <Image alt='image' src='/xmlformat.png' width={229} height={275}/>}
            {extension==='jpg' && <Image alt='image' src='/jpgformat.png' width={229} height={275}/>}
            <div className='bg-[#2B3F6C] rounded-full p-4'><GoArrowRight className='text-white text-[14px]'/></div>
            <Image alt='image' src='/pdfformat.png' width={229} height={275}/>
            </div>
            {fileName && <p className="text-[#555555] text-[14px] mb-2">{fileName}</p>}
            <div className="text-[24px] mb-2">converting to <span className='uppercase'>{extension}</span></div>
            <div className="w-[450px] h-[15px] bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#06044B] to-[#61E987] transition-all duration-200"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
    
            <div className="text-sm text-gray-600 mt-2">{progress}%</div>
          </div>
        </main>
        </>
  )
}

export default Convert