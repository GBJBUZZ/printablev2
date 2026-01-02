'use client'
import React from 'react'
import { NavBar } from './nav-bar'
import Image from 'next/image'
import {CiShare2} from "react-icons/ci"
import {RiDeleteBin5Line} from "react-icons/ri"
import {MdOutlineFileUpload} from "react-icons/md"
import {SlArrowDown} from "react-icons/sl"
import {PiPrinterBold} from "react-icons/pi"
import { MdOutlineFileDownload } from 'react-icons/md'
import Dropdown from './DropDownfilemanagers'
import { useState } from 'react'
import { useEffect } from 'react'
import DownloadDropdown from './DropdownDownload'
import { GoArrowBoth } from "react-icons/go";
const Pdf_Doc_Download = () => {
  const [isOpen2, setIsOpen2] = useState(false);
  const toggleDropdown2 = () => setIsOpen2(!isOpen2);
  const [isOpen1, setIsOpen1] = useState(false);
  const toggleDropdown1 = () => setIsOpen1(!isOpen1);
 const [extension,setExtension]=useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  useEffect(() => {
      const name = sessionStorage.getItem('selectedFileName');
      const exten=sessionStorage.getItem('extenName');
      setExtension(exten);
      setFileName(name);
  }
  )
  return (
    <>
     <h1 className='flex items-center gap-2 bg-[#FFFFFF] font-bold text-[24px] px-2 h-[40px]'>PDF <GoArrowBoth/> <span className='uppercase'>{extension}</span></h1>
    <div className='flex flex-row bg-[#E6E6ED]'>
        <div className='flex flex-col items-center w-full mt-[130px] '>
            {extension==='word' && <Image alt='image' src='/Worddoc.png' width={229} height={275}/>}
                        {extension==='ppt' && <Image alt='image' src='/pptformat.png' width={229} height={275}/>}
                        {extension==='excel' && <Image alt='image' src='/xmlformat.png' width={229} height={275}/>}
                        {extension==='jpg' && <Image alt='image' src='/jpgformat.png' width={229} height={275}/>}
            <p className='text-[14px]'>{fileName}</p>
        </div>
        <div className='flex flex-col gap-2 p-4 w-[480px] h-[930px] bg-[#DFFBE7] pt-24'>
        <p className=''><span className='font-bold border-b-2 border-dashed'>{fileName}</span></p>
        <div className='flex mt-4'>
        <button className='flex gap-2 items-center justify-center bg-[#06044B] text-white border-r-2 border-white  rounded-l-lg text-[14px] w-[287px] h-[45px]' ><MdOutlineFileDownload />Download</button>
        <button className='w-[50px] h-[45px] bg-[#06044B] text-white rounded-r-lg flex justify-center items-center 'onClick={toggleDropdown1} ><SlArrowDown className='hover:rotate-180'></SlArrowDown></button>
        </div>
        <p className="text-center">or</p>
        <button className='flex gap-2 items-center justify-center bg-[#06044B] text-white border-r-2 border-white  rounded-lg text-[14px] w-[338px] h-[45px]'><PiPrinterBold/>Print</button>
        <div>
        <button className='group flex gap-2 items-center justify-center hover:bg-[#06044B] hover:text-white border-2 border-[#06044B]  rounded-lg text-[14px] w-[338px] h-[45px]' onClick={toggleDropdown2}><MdOutlineFileUpload/>Export<SlArrowDown/></button>
        </div>
        <div className='flex gap-2 w-[338px]'>
        <button className='border-2 w-1/2 h-[45px] rounded-lg border-[#06044B] hover:bg-[#06044B]  flex justify-center items-center text-[#06044B] hover:text-white'><CiShare2 className=''></CiShare2></button>
        <button className='border-2 w-1/2 h-[45px] rounded-lg border-[#06044B] hover:bg-[#06044B] text-[#06044B] hover:text-white flex justify-center items-center'><RiDeleteBin5Line className=''></RiDeleteBin5Line></button>
        </div>
        {isOpen1 && <DownloadDropdown/>}
        {isOpen2 && <Dropdown/>}
        </div>
    </div>
    </>
  )
}

export default  Pdf_Doc_Download