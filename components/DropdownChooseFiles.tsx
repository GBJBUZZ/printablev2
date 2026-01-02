import Image from 'next/image'
import React from 'react'

const ChooseDropdown = () => {
  const download = [
    {
      image: '/doc.png',
      name: 'From Device'
    },
    {
      image: '/excel.png',
      name: 'From Printable'
    },
    {
      image: '/dropbox.png',
      name: 'From Dropbox'
    },
    {
      image: '/drive.png',
      name: 'From Drive'
    }
  ];

  return (
    <div className='relative top-[-185px] left-[30px]'>
      <ul className="bg-white p-2 rounded-lg">
        {download.map((item, index) => (
          <li
            key={index}
            className='flex gap-2 items-center p-1 hover:text-white hover:bg-[#06044B] cursor-pointer'
          >
            <Image src={item.image} alt={item.name} width={18} height={18} />
            <span className="text-[14px]">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChooseDropdown;
