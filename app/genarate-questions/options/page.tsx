'use client'
import React from 'react'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GoArrowRight } from "react-icons/go";
const page = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isSelect,setIsSelect]=useState(false);
   const router=useRouter();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value=event.target.value;
      setSelectedOption(value);
     
     
    };
    const handleGenareateQA=()=>{
      sessionStorage.setItem('typeQA',selectedOption);
      router.push('/genarate-questions/questions_loading')
    }
   
  return (
   <>
   <h1 className='flex items-center gap-2 bg-[#FFFFFF] font-bold text-[24px] px-2 h-[40px]'>Genarate Questions</h1>
   <div className='flex flex-row bg-[#E6E6ED]'>
        <div className='flex justify-center w-full my-[53px]'>
            <Image src={'/pdf_real.png'} width={495} height={2137} alt='pdf'></Image>
        </div>
        <div className='flex flex-col gap-2 px-4 pt-[53px] pb-4 w-[480px] h-[910px] bg-gradient-to-b from-[#DFFBE7] to-[#CDCDDB] transition-all duration-200'>
        <h1 className='font-bold text-[28px] text-center '>Pick a question type:</h1>
        <div className='flex flex-col gap-[20px] mt-[100px]'>
            <div className='flex gap-[10px] items-center bg-white px-[18px] py-[16px] rounded-[10px]'>
            <input type='radio' id='Multiple-choice questions' name='multi' value='Multiple-choice questions' className='p-[3pxs]' checked={selectedOption === 'Multiple-choice questions'} onChange={handleChange} ></input>
            <label className='text-[20px] font-semibold' htmlFor='Multiple-choice questions'>Multiple-choice questions</label>
            </div>
            <div className='flex gap-[10px] items-center bg-white px-[18px] py-[16px] rounded-[10px]'>
            <input type='radio' id='Open-ended questions' name='multi' value='Open-ended questions' className='p-[3pxs]' checked={selectedOption === 'Open-ended questions'} onChange={handleChange} ></input>
            <label className='text-[20px] font-semibold' htmlFor='Open-ended questions'>Open-ended questions</label>
            </div>
            <div className='flex gap-[10px] items-center bg-white px-[18px] py-[16px] rounded-[10px]'>
            <input type='radio'id='True-or-false questions' name='multi' value='True-or-false questions' className='p-[3pxs]' checked={selectedOption === 'True-or-false questions'} onChange={handleChange} ></input>
            <label className='text-[20px] font-semibold' htmlFor='True-or-false questions'>True-or-false questions</label>
            </div>
        </div>
        <button className='flex items-center justify-center gap-[8px] border-[1px] border-[#06044B] rounded-[10px] px-[4px] py-[13px] hover:bg-[#06044B] hover:text-green-400 relative top-[370px]' onClick={handleGenareateQA}>Generate Questions <GoArrowRight /></button>
        </div>
    </div>
   </>
  )
}

export default page