
import Image from 'next/image'
import React from 'react'

const DownloadDropdown=()=>{
    
    const download=[
        {
            image:'/doc.png',
            name:'Word(.docx)'
        },
        {
            image:'/excel.png',
            name:'Excel(.xlsx)'
        },
        {
            image:'/ppt.png',
            name:'Power Point(.ppt)'
        },
        {
            image:'/gallery.png',
            name:'Image(.jpg)'
        }
    ];
    return(
        <div className=' relative top-[-200px]'>
            <ul className="bg-white p-4 rounded-lg">
                <div className='flex gap-2 items-center p-2 hover:text-white hover:bg-[#06044B] border-b-[2px] border-[#06044B]'>
                <Image src={'/compress.png'} alt='' width={18} height={18}></Image>
                <li className=" text-[14px] hover:text-white">Compress</li>
                </div>
                <div>
                {
                    download.map((item,index)=>(
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
export default DownloadDropdown