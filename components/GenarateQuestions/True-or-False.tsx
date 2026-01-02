import React from 'react'
import Further_actions from './Further_actions'
import { IoCopyOutline } from "react-icons/io5";
const True_or_False = () => {
  return (
    <>
    <div className='max-h-[699px] bg-white  rounded-[10px]s  shadow-xl ml-12 px-[26px]'>
                <h1 className='text-[20px] font-bold mb-4'>True or False questions</h1>
                <div className='flex flex-col gap-[4px]'>
                    <p className='text-[17px]'>1.Ellis recently picked up a new hobby of painting.</p>
                    <div className='flex gap-2'>
                    <input type='radio' value={'true'} checked></input>
                    <label htmlFor=''>True</label>
                    </div>
                    <div className='flex gap-2'>
                    <input type='radio' value={'false'} checked></input>
                    <label htmlFor=''>False</label>
                    </div>
                    <button className='rounded-[10px] bg-[#38366F] text-white text-[10px] px-[16px] py-[6px] w-[97px] h-[25px] mt-[8px]'>Show Answer</button>
                </div>
                <div className='flex flex-col gap-[4px]'>
                    <p className='text-[17px]'>1.Ellis recently picked up a new hobby of painting.</p>
                    <div className='flex gap-2'>
                    <input type='radio' value={'true'} checked></input>
                    <label htmlFor=''>True</label>
                    </div>
                    <div className='flex gap-2'>
                    <input type='radio' value={'false'} checked></input>
                    <label htmlFor=''>False</label>
                    </div>
                    <button className='rounded-[10px] bg-[#38366F] text-white text-[10px] px-[16px] py-[6px] w-[97px] h-[25px] mt-[8px]'>Show Answer</button>
                </div>
                <div className='flex flex-col gap-[4px]'>
                    <p className='text-[17px]'>1.Ellis recently picked up a new hobby of painting.</p>
                    <div className='flex gap-2'>
                    <input type='radio' value={'true'} checked></input>
                    <label htmlFor=''>True</label>
                    </div>
                    <div className='flex gap-2'>
                    <input type='radio' value={'false'} checked></input>
                    <label htmlFor=''>False</label>
                    </div>
                    <button className='rounded-[10px] bg-[#38366F] text-white text-[10px] px-[16px] py-[6px] w-[97px] h-[25px] mt-[8px]'>Show Answer</button>
                </div>
                <Further_actions/>
               </div>
               <IoCopyOutline className='mt-4 ml-auto mr-4'/>
               </>
  )
}

export default True_or_False