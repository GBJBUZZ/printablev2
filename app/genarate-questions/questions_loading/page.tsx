'use client';
import React from 'react'
import Image from 'next/image'
import { useEffect,useState } from 'react'
import True_or_False from '@/components/GenarateQuestions/True-or-False';
import Open_ended from '@/components/GenarateQuestions/Open_ended';
import Multiple_chooice from '@/components/GenarateQuestions/Multiple-chooice';
import { MdOutlineFileDownload } from 'react-icons/md'

const page = () => {
    const [progress, setProgress] = useState(0);
    const[typeQA,setTypeQA]=useState<string | null>();
    useEffect(()=>{
      const value = sessionStorage.getItem('typeQA');
     setTypeQA(value);
      console.log(typeQA);
    },[typeQA])
     useEffect(() => {
    
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
  return (
    <>
    <div className='flex justify-between items-center  bg-[#FFFFFF] h-[60px] shadow-lg px-4'>
       <h1 className='font-bold text-[24px] '>Genarate Questions</h1>
       <button className='flex items-center gap-[5px] font-bold bg-[#06044B] rounded-[10px] text-white px-[26px] py-[10px]  text-[13px]'><MdOutlineFileDownload className='font-bold text-[13px]'/>Download</button>
       </div>
       <div className='flex flex-row bg-[#E6E6ED]'>
            <div className='flex justify-center w-full my-[53px]'>
                <Image src={'/pdf_real.png'} width={495} height={2137} alt='pdf'></Image>
            </div>
            <div className='realative w-[970px] h-[910px] bg-white flex flex-col'>
             {progress != 100 ?(<div>
               <div className='flex'>
               <Image src={'/logo.png'} width={144} height={61} alt=''></Image>
               <p className='bg-white shadow-lg text-[19px] text-center flex items-center w-[702px] h-[60px] pl-[40px] w-full'>Genarate True or false questions</p>
               </div>
               <div className='flex mt-4'>
               <Image src={'/logo.png'} width={144} height={61} alt=''></Image>
              <div className='bg-white shadow-lg text-[19px] text-center flex items-center gap-4 px-[35px] rounded-[10px]'>
               Overthinking...
                  <div className="flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
    </div>
               </div>
               </div>
               </div>)
               :
               (
               <div className=''>
                <Image src={'/logo.png'} width={100} height={61} alt='' className='relative left-[-20px]'></Image>
                <div className='flex flex-col relative top-[-40px] left-[10px]'>
               {progress===100 && typeQA==='Multiple-choice questions'&& <Multiple_chooice/>}
               {progress===100 && typeQA==='Open-ended questions'&& <Open_ended/>}
               {progress===100 && typeQA==='True-or-false questions'&& <True_or_False/>}
               </div>
               </div>)
              }
               <input type='text' placeholder='Stuck? Just ask me anything about your PDF!' className='bg-[#F5F5F5] text-[14px] text-[#A1A1A1] h-[50px] w-[500px]  rounded-[10px] border-[1px] border-[#A1A1A1] mx-12 pl-[34px] absolute top-[900px]'></input>
            </div>
        </div>
     </>   
  ) 
}

export default page