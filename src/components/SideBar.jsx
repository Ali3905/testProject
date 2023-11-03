import React from 'react'
import data from '@/data'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const SideBar = () => {
  const router = useRouter()
  return (
    <div className='bg-[#0B1903] text-[#fff] h-full'>
    <ul className='flex flex-col gap-[38px] px-[38px] py-[14px]'>

    <li className='self-center'>
    <Image 
      src={"/logo.png"}
      alt='logo'
      width={90}
      height={70}
      />
    </li>

    {data.sideBar.map((ele, i)=>{
        return <li className='flex gap-[13px]' key={i} onClick={()=>router.push(`/${ele.name.toLocaleLowerCase()}`)}>
            {ele.icon}
            <p>{ele.name}</p>  
        </li>
    })}
    </ul>
    </div>
  )
}

export default SideBar
