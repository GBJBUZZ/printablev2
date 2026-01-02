
import Image from 'next/image'
import React from 'react'

const Dropdown=()=>{
    
    const filemangerMenu=[
        {
            image:'/',
            name:'Save to Printable'
        },
        {
            image:'/dropbox.png',
            name:'Save to Dropbox'
        },
        {
            image:'/drive.png',
            name:'Save to Google drive'
        }
    ];
    return(
        <div className='relative top-[-60px]'>
            <ul className="bg-white p-4 rounded-lg">
                <div className='flex gap-2 items-center p-2 hover:text-white hover:bg-[#06044B] border-b-[2px] border-[#06044B]'>
                <Image src={'/compress.png'} alt='' width={18} height={18}></Image>
                <li className=" text-[14px] hover:text-white">Compress</li>
                </div>
                <div>
                {
                    filemangerMenu.map((item,index)=>(
                        <div key={index} className='flex gap-2 items-center p-2 hover:text-white border-b-[0.5px] border-[#C9C9C9] hover:bg-[#06044B]'>
                <Image src={item.image} alt='' width={18} height={18}></Image>
                <li className="text-[14px] hover:text-white ">{item.name}</li>
                </div>
                    ))
                }
                </div>
            </ul>
        </div>
    )
}
export default Dropdown