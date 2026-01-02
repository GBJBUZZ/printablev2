import React, { useState } from 'react'
import { GoArrowRight } from "react-icons/go";
import {SlArrowDown,SlArrowUp} from "react-icons/sl"
const Further_actions = () => {
    const[rotate,setRotate]=useState(true);
    const handleRotate=()=>{
        setRotate(!rotate);
    }
  return (
    <details className='group bg-white pb-4'>
                    <summary className='list-none flex justify-between mt-4 text-[19px] text-[#646A70]' onClick={handleRotate}>
                      ✨ Future Actions:
                      {rotate ?<SlArrowDown/>:<SlArrowUp/>}
                    </summary>
                    <div className='flex flex-col gap-4 bg-white'>
                      <div className='bg-white shadow-lg h-[60px] rounded-[10px] flex  justify-between items-center px-[40px] py-[18px]'>
                        <p className='text-[19px]'>Generate Questions</p>
                       <button className=''>< GoArrowRight/> </button>
                    </div>
                    <div className='bg-white shadow-lg h-[60px] rounded-[10px] flex justify-between items-center px-[40px] py-[18px]'>
                        <p className='text-[19px]'>Generate open-ended questions.</p>
                       <button className=''>< GoArrowRight/> </button>
                    </div>
                    <div className='bg-white shadow-lg h-[60px] rounded-[10px] flex justify-between items-center px-[40px] py-[18px]'>
                        <p className='text-[19px]'>Make the questions harder.</p>
                       <button className=''>< GoArrowRight/> </button>
                    </div>
                    </div>
                   </details>
  )
}

export default Further_actions