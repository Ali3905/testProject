import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { doc, getDoc } from "firebase/firestore";
import { db, imageDB } from '@/firebase'
import { getDownloadURL, ref } from 'firebase/storage';

const NavBar = () => {
  const [user, setUser] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const getUser = async() => { 
    const docRef = doc(db, "users", "abrar@gmail.com");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setUser(docSnap.data())
        getDownloadURL(ref(imageDB, `profileImages/${docSnap.data().email}.png`))
        .then((url) => {
            setImgURL(url)
        })
      } 
      return  user
}

useEffect(()=>{
  getUser()
},[])

  return (
    <nav className='w-full flex justify-between items-center px-[40px] py-[10px]'>
        <div className='flex items-center gap-[21px]'>
            <h2 className='text-2xl font-semibold'>Home</h2>
            <label htmlFor="search" className='flex items-center gap-[11px] px-[20px] py-[15px] bg-[#F4F8F1] rounded-[5px] border border-solid border-[rgba(11, 25, 3, 0.10)]'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" height={12} width={12}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>

            <input type="text" name='search' id='search' placeholder='Search here' className='outline-none bg-transparent'/>
            </label>
        </div>
       {user !== null ? <div className='ml-auto flex items-center gap-[20px]'>
            <span className='relative'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
           </svg>
            <span className='w-[5px] h-[5px] abosulte top-0 right-0 rounded-full bg-green-500'></span>
            </span>
            <span className='flex flex-col items-end text-base font-medium'>
                <p>{user.firstName} {user.lastName}</p>
                <p className='text-gray-400 font-normal'>Designer</p>
            </span>
        <Image 
        className='rounded-full'
        src={imgURL!==null?imgURL:"/person.svg"}
        alt='profile'
        width={50}
        height={50}
        />
        </div> : null}
        <div></div>
    </nav>
  )
}

export default NavBar
