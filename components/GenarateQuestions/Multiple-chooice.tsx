import React from 'react'
import Further_actions from './Further_actions'
import { IoCopyOutline } from "react-icons/io5";
const Multiple_chooice = () => {
  return (
    <>
    <div className='max-h-[699px] bg-white rounded-[10px] shadow-xl ml-12 px-[26px]'>
                <h1 className='text-[20px] font-bold mb-4'>Multiple choice questions</h1>
                <div className='flex flex-col gap-[4px]'>
                    <p className='text-[17px]'>1.Multiple-choice questions What hobby did Ellis recently pick up?</p>
                   <div className='flex flex-col'>
                   <p>A. Cooking</p>
                   <p>B. Gardening</p>
                   <p>C. Painting</p>
                   <p>D. Reading</p>
                   </div>
                    <button className='rounded-[10px] bg-[#38366F] text-white text-[10px] px-[16px] py-[6px] w-[97px] h-[25px] mt-[8px]'>Show Answer</button>
                </div>
                <div className='flex flex-col gap-[4px]'>
                    <p className='text-[17px]'>1.Multiple-choice questions What hobby did Ellis recently pick up?</p>
                    <div className='flex flex-col'>
                    <p>A. Cooking</p>
                    <p>B. Gardening</p>
                    <p>C. Painting</p>
                    <p>D. Reading</p>
                    </div>
                    <button className='rounded-[10px] bg-[#38366F] text-white text-[10px] px-[16px] py-[6px] w-[97px] h-[25px] mt-[8px]'>Show Answer</button>
                </div>
                <Further_actions/>
               </div>
               <IoCopyOutline className='mt-4 ml-auto mr-4'/>
               </>
  )
}
export default Multiple_chooice