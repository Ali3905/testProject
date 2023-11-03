"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { db, imageDB } from '@/firebase'
import { doc, setDoc, getDoc } from "firebase/firestore";
import NavBar from '@/components/NavBar';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Profile = () => {
    const [errMsg, setErrorMsg] = useState(null)
    const [user, setUser] = useState(null)
    const [img, setImg] = useState(null)
    const [imgURL , setImgURL] = useState(null)
    const [values, setValues] = useState({
        "firstName" : "",
        "lastName" : "",
        "email" : "",
        "password" : "",
        "city" : "",
        "state" : "",
        "address" : ""
    })

    const handleChangeImg = (e) => {
        setImg(e.target.files[0])
        if (e.target.files[0]) {
            const reader = new FileReader();
          
            reader.onload = function(event) {
              const dataURL = event.target.result;
              setImgURL(dataURL)
            };
          
            reader.readAsDataURL(e.target.files[0]);
          }
    }


    const getUser = async() => { 
        const docRef = doc(db, "users", "abrar@gmail.com");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUser(docSnap.data())
            setValues(docSnap.data())
            getDownloadURL(ref(imageDB, `profileImages/${docSnap.data().email}.png`))
        .then((url) => {
            setImgURL(url)
        })
          }
          return  user
    }

    const imageUpload = () => {
        const imgRef = ref(imageDB, `profileImages/${values.email}.png`)
        uploadBytes(imgRef, img)
    }

    const SubmitUpdateProfileForm = async(e) => {
        e.preventDefault()
        await setDoc(doc(db, "users", values.email), {
            firstName : values.firstName,
            lastName : values.lastName,
            email : values.email,
            password : values.password,
            city : values.city,
            state : values.state,
            address : values.address
          });
        getUser()
        imageUpload()
      }

    useEffect(()=>{
        getUser()
    },[])


  return (
    <>
    <NavBar />
    <div className="profile bg-[#F5FBFB]">
    {user !== null ?<div className="flex flex-col gap-[20px] ">
      <div className='flex flex-col gap-[20px] bg-[#fff] rounded-[10px] border border-solid border-[#D9D9D9] px-[25px] py-[38px]'>

        <label htmlFor="profilePic" className='h-[140px] w-[140px]  m-auto relative rounded-full bg-gray-300 flex items-center justify-center'> 
            <input type="file" id='profilePic' onChange={(e)=>handleChangeImg(e)} className='hidden'/>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>

            <Image 
            className='max-h-[140px] max-w-[140px] m-auto rounded-full absolute top-0 left-0 hover:hidden bg-gray-300'
            src = {imgURL!==null?imgURL:"/person.svg"}
            alt='profile'
            width={140}
            height={140}
            />
        </label>
      
      <span className='flex flex-col items-center'>
      <p className='text-lg font-bold font'>{user.firstName} {user.lastName}</p>
      <p className='text-sm font-normal text-[#777777]'>Patient</p>
      <span className='flex gap-2 text-base text-[#26710C]'>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
          <path d="M14.864 14.8636L13.677 16.0376C12.802 16.8956 11.667 17.9996 10.271 19.3496C9.85143 19.7552 9.29063 19.982 8.707 19.982C8.12337 19.982 7.56258 19.7552 7.143 19.3496L3.652 15.9536C3.212 15.5226 2.846 15.1596 2.55 14.8636C1.33237 13.6458 0.503172 12.0944 0.167261 10.4054C-0.16865 8.71644 0.0038141 6.96579 0.662845 5.37483C1.32188 3.78387 2.43787 2.42406 3.86972 1.46735C5.30156 0.510641 6.98495 0 8.707 0C10.4291 0 12.1124 0.510641 13.5443 1.46735C14.9761 2.42406 16.0921 3.78387 16.7512 5.37483C17.4102 6.96579 17.5827 8.71644 17.2467 10.4054C16.9108 12.0944 16.0816 13.6458 14.864 14.8636ZM11.207 8.98156C11.207 8.31852 10.9436 7.68263 10.4748 7.21379C10.0059 6.74495 9.37004 6.48156 8.707 6.48156C8.04396 6.48156 7.40808 6.74495 6.93924 7.21379C6.4704 7.68263 6.207 8.31852 6.207 8.98156C6.207 9.6446 6.4704 10.2805 6.93924 10.7493C7.40808 11.2182 8.04396 11.4816 8.707 11.4816C9.37004 11.4816 10.0059 11.2182 10.4748 10.7493C10.9436 10.2805 11.207 9.6446 11.207 8.98156Z" fill="#26710C"/>
      </svg>
      <p>{user.state}, {user.city}</p>
      </span>
      </span>

      <button className='bg-[#26710C] rounded-[3px] py-[10px] text-[#fff] text-base'>Logout</button>
      </div>

      <div className='flex flex-col gap-[24px] bg-[#fff] rounded-[10px] border border-solid border-[#D9D9D9] px-[29px] py-[25px]'>
          <span className='flex gap-[15px]'>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
<circle cx="13" cy="13" r="13" fill="#26710C"/>
<path d="M14.8177 6.90533C14.8353 6.83933 14.8658 6.77746 14.9074 6.72325C14.949 6.66905 15.0008 6.62356 15.06 6.58939C15.1191 6.55523 15.1844 6.53305 15.2522 6.52413C15.3199 6.51522 15.3887 6.51973 15.4547 6.53742C16.4187 6.78894 17.2982 7.29289 18.0027 7.99736C18.7072 8.70183 19.2111 9.58136 19.4627 10.5454C19.4804 10.6113 19.4849 10.6802 19.476 10.7479C19.467 10.8156 19.4449 10.8809 19.4107 10.9401C19.3765 10.9992 19.331 11.0511 19.2768 11.0927C19.2226 11.1342 19.1608 11.1647 19.0948 11.1824C19.0508 11.1939 19.0056 11.1998 18.9602 11.1999C18.8456 11.1999 18.7342 11.1621 18.6434 11.0922C18.5525 11.0224 18.4873 10.9245 18.4578 10.8138C18.2526 10.0269 17.8413 9.30886 17.2663 8.73381C16.6912 8.15876 15.9732 7.74747 15.1862 7.54233C15.1202 7.52475 15.0583 7.49432 15.004 7.45278C14.9497 7.41124 14.9041 7.3594 14.8699 7.30024C14.8357 7.24108 14.8134 7.17574 14.8045 7.10798C14.7955 7.04022 14.8 6.97135 14.8177 6.90533ZM14.6662 9.62235C15.5626 9.86156 16.1385 10.4375 16.3777 11.3338C16.4072 11.4445 16.4725 11.5424 16.5633 11.6122C16.6542 11.6821 16.7656 11.7199 16.8802 11.7199C16.9256 11.7198 16.9708 11.7139 17.0147 11.7024C17.0807 11.6847 17.1426 11.6542 17.1968 11.6127C17.251 11.5711 17.2965 11.5193 17.3307 11.4601C17.3648 11.4009 17.387 11.3356 17.3959 11.2679C17.4048 11.2002 17.4003 11.1314 17.3826 11.0654C17.0498 9.81996 16.1801 8.95025 14.9347 8.61744C14.8687 8.59982 14.7999 8.59536 14.7322 8.60432C14.6645 8.61329 14.5992 8.6355 14.5401 8.6697C14.481 8.70389 14.4292 8.74939 14.3876 8.80361C14.3461 8.85782 14.3156 8.91969 14.298 8.98567C14.2804 9.05166 14.2759 9.12046 14.2849 9.18817C14.2939 9.25588 14.3161 9.32115 14.3503 9.38028C14.3845 9.4394 14.43 9.4912 14.4842 9.53274C14.5384 9.57428 14.6003 9.60473 14.6662 9.62235ZM19.9924 15.8202C19.8765 16.7009 19.444 17.5094 18.7755 18.0946C18.1071 18.6797 17.2485 19.0016 16.3602 19C11.1991 19 7.00001 14.801 7.00001 9.6399C6.99841 8.75153 7.32026 7.89296 7.90543 7.22454C8.4906 6.55612 9.29908 6.12357 10.1799 6.00767C10.4026 5.98047 10.6281 6.02604 10.8228 6.13756C11.0175 6.24909 11.171 6.42059 11.2602 6.62647L12.633 9.69125V9.69905C12.7013 9.85665 12.7295 10.0287 12.7151 10.1999C12.7007 10.371 12.6441 10.536 12.5505 10.6799C12.5388 10.6975 12.5264 10.7137 12.5134 10.73L11.1601 12.3342C11.6469 13.3235 12.6818 14.3492 13.6841 14.8374L15.2662 13.4912C15.2817 13.4781 15.298 13.466 15.3149 13.4548C15.4588 13.3589 15.6243 13.3003 15.7965 13.2844C15.9686 13.2685 16.142 13.2958 16.301 13.3638L16.3095 13.3677L19.3717 14.7399C19.5779 14.8288 19.7498 14.982 19.8617 15.1768C19.9736 15.3715 20.0195 15.5972 19.9924 15.8202ZM18.9602 15.6902H18.9531L15.898 14.3219L14.3152 15.6681C14.2999 15.6811 14.2838 15.6932 14.2671 15.7045C14.1175 15.8043 13.9445 15.8636 13.765 15.8766C13.5856 15.8896 13.4058 15.8558 13.2434 15.7786C12.0259 15.1903 10.8123 13.9858 10.2234 12.7814C10.1454 12.6201 10.1104 12.4414 10.1218 12.2626C10.1332 12.0838 10.1906 11.911 10.2884 11.7609C10.2994 11.7432 10.3118 11.7265 10.3255 11.7108L11.6801 10.1047L10.3151 7.04963C10.3148 7.04704 10.3148 7.04442 10.3151 7.04183C9.68472 7.12405 9.10596 7.43324 8.68718 7.91148C8.2684 8.38972 8.03832 9.00422 8.04002 9.6399C8.04243 11.8458 8.91979 13.9606 10.4796 15.5204C12.0394 17.0802 14.1543 17.9576 16.3602 17.96C16.9955 17.9622 17.6098 17.7329 18.0883 17.315C18.5668 16.8972 18.8768 16.3193 18.9602 15.6895V15.6902Z" fill="white"/>
          </svg>    
          <p className='font-normal text-base text-black'>{user.email.slice(0, 28)}
          {user.email.length>16?"...":null}</p>
          </span>
          <span className='flex gap-[15px]'>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
              <circle cx="13" cy="13" r="13" fill="#26710C"/>
              <path d="M12.2 20C12.2 20 7 16.1 7 12.2C7 8.95 9.6 7 12.2 7C14.8 7 17.4 8.95 17.4 12.2C17.4 16.1 12.2 20 12.2 20ZM12.2 14.15C12.7172 14.15 13.2132 13.9446 13.5789 13.5789C13.9446 13.2132 14.15 12.7172 14.15 12.2C14.15 11.6828 13.9446 11.1868 13.5789 10.8211C13.2132 10.4554 12.7172 10.25 12.2 10.25C11.6828 10.25 11.1868 10.4554 10.8211 10.8211C10.4554 11.1868 10.25 11.6828 10.25 12.2C10.25 12.7172 10.4554 13.2132 10.8211 13.5789C11.1868 13.9446 11.6828 14.15 12.2 14.15Z" stroke="white"/>
          </svg>
          <p className='font-normal text-base text-black'>{user.address.slice(0, 28)}
          {user.address.length>16?"...":null}
          
          </p>
          </span>
          <span className='flex gap-[15px]'>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
              <circle cx="13" cy="13" r="13" fill="#26710C"/>
              <path d="M18.5 8H6.83333C6.61232 8 6.40036 8.0878 6.24408 8.24408C6.0878 8.40036 6 8.61232 6 8.83333V17.1667C6 17.3877 6.0878 17.5996 6.24408 17.7559C6.40036 17.9122 6.61232 18 6.83333 18H18.5C18.721 18 18.933 17.9122 19.0893 17.7559C19.2455 17.5996 19.3333 17.3877 19.3333 17.1667V8.83333C19.3333 8.61232 19.2455 8.40036 19.0893 8.24408C18.933 8.0878 18.721 8 18.5 8ZM17.8583 17.1667H7.525L10.4417 14.15L9.84167 13.5708L6.83333 16.6833V9.46667L12.0125 14.6208C12.1686 14.776 12.3798 14.8632 12.6 14.8632C12.8202 14.8632 13.0314 14.776 13.1875 14.6208L18.5 9.3375V16.6292L15.4333 13.5625L14.8458 14.15L17.8583 17.1667ZM7.37917 8.83333H17.825L12.6 14.0292L7.37917 8.83333Z" fill="white"/>
          </svg>
          <p className='font-normal text-base text-black'>+6668768778</p>
          </span>
      </div>

    </div>: null}
    <div className="bg-[#fff] rounded-[10px] border border-solid border-[#D9D9D9] p-[32px]">
      <h3 className='text-lg font-bold font-sans mb-[15px]'>User Profile</h3>
      <form className='flex flex-col gap-[20px]' onSubmit={SubmitUpdateProfileForm}>
          <span className='flex justify-between gap-[31px]'>

          <label htmlFor="firstName" className='flex flex-col gap-[10px] grow cursor-pointer'>
              <p className='text-[16px] font-normal text-[#777777]'>First Name</p>
              <input type="text" name='firstName'
              className='bg-[#F4F8F1] rounded-[5px] border border-solid border-[rgba(11, 25, 3, 0.10)] outline-none px-[20px] py-[10px]'
              value={values.firstName}
              onChange={(e)=>setValues({...values, firstName : e.target.value })}
              />
          </label>
          <label htmlFor="lastName"  className='flex flex-col gap-[10px] grow cursor-pointer'>
              <p className='text-[16px] font-normal text-[#777777]'>Last Name</p>
              <input type="text" name='lastName' 
              className='bg-[#F4F8F1] rounded-[5px] border border-solid border-[rgba(11, 25, 3, 0.10)] outline-none px-[20px] py-[10px]'
              value={values.lastName}
              onChange={(e)=>setValues({...values, lastName : e.target.value })}
              />
          </label>

          </span>

          <span className='flex justify-between gap-[31px]'>

          <label htmlFor="email" className='flex flex-col gap-[10px] grow cursor-pointer'>
              <p className='text-[16px] font-normal text-[#777777]'>Email</p>
              <input type="text" name='email' 
              disabled
              className='bg-[#F4F8F1] rounded-[5px] border border-solid border-[rgba(11, 25, 3, 0.10)] outline-none px-[20px] py-[10px]'
              value={values.email}
              onChange={(e)=>setValues({...values, email : e.target.value })}
              />
          </label>
          <label htmlFor="password"  className='flex flex-col gap-[10px] grow cursor-pointer'>
              <p className='text-[16px] font-normal text-[#777777]'>Password</p>
              <input type="text" name='password' 
              className='bg-[#F4F8F1] rounded-[5px] border border-solid border-[rgba(11, 25, 3, 0.10)] outline-none px-[20px] py-[10px]'
              value={values.password}
              onChange={(e)=>setValues({...values, password : e.target.value })}
              />
          </label>
          </span>

          <span className='flex justify-between gap-[31px]'>
          <label htmlFor="city" className='flex flex-col gap-[10px] grow cursor-pointer'>
              <p className='text-[16px] font-normal text-[#777777]'>City</p>
              <input type="text" name='city' 
              className='bg-[#F4F8F1] rounded-[5px] border border-solid border-[rgba(11, 25, 3, 0.10)] outline-none px-[20px] py-[10px]'
              value={values.city}
              onChange={(e)=>setValues({...values, city : e.target.value })}
              />
          </label>
          <label htmlFor="state"  className='flex flex-col gap-[10px] grow cursor-pointer'>
              <p className='text-[16px] font-normal text-[#777777]'>State</p>
              <input type="text" name='state' 
              className='bg-[#F4F8F1] rounded-[5px] border border-solid border-[rgba(11, 25, 3, 0.10)] outline-none px-[20px] py-[10px]'
              value={values.state}
              onChange={(e)=>setValues({...values, state : e.target.value })}
              />
          </label>
          </span>

          <label htmlFor="address"  className='flex flex-col gap-[10px] grow cursor-pointer'>
              <p className='text-[16px] font-normal text-[#777777]'>Address</p>
              <textarea rows={2} type="text" name='address' 
              className='bg-[#F4F8F1] rounded-[5px] border border-solid border-[rgba(11, 25, 3, 0.10)] outline-none px-[20px] py-[10px]'
              value={values.address}
              onChange={(e)=>setValues({...values, address : e.target.value })}
              />
          </label>
          {errMsg !== null ? errMsg : null}

          <button type='submit' className='bg-[#26710C] rounded-[5px] self-start py-[10px] px-[48px] text-[#fff] text-base font-normal'>Update Account</button>
      </form>
    </div>
  </div>
  </>
  )
}

export default Profile
