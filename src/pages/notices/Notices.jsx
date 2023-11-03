import React from 'react'
import data from "@/data"
import NavBar from '@/components/NavBar'

const Notices = () => {
  return (
    <>
    <NavBar />
    <div className='bg-[#F5FBFB] h-full p-[30px] rounded-[10px]'>
        <div className='bg-[#fff] p-[20px] w-full'>

            <div className='flex justify-between'>
                <button className='px-[20px] py-[10px] rounded-[5px] border border-solid border-[rgba(0, 0, 0, 0.07)] flex gap-2'>Show All 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>

                </button>
                <button className='px-[20px] py-[10px] bg-[#26710C] rounded-[5px] text-[#fff]'>+ Create Notice</button>
            </div>
        <table className='w-full font-medium text-base my-[16px] border border-solid border-[rgba(0, 0, 0, 0.07)]'>
            <thead>
                <tr className='my-[5px] bg-[#f8f9ffb8]'>
                    <td className='p-[18px]'>#</td>
                    <td className='p-[18px]'>Subject</td>
                    <td className='p-[18px] text-center'>Type</td>
                    <td className='p-[18px]'>Start Date</td>
                    <td className='p-[18px]'>End Date</td>
                </tr>
            </thead>
            <tbody >
                {data.notices.map((ele, i)=>{
                    return <tr className='rounded-[5px] border border-solid border-[rgba(0, 0, 0, 0.07)] my-[15px]' key={i}>
                        <td className='p-[18px]'>{i+1}</td>
                        <td className='p-[18px]'>{ele.subject}</td>
                        <td className='p-[18px] py-[35px]'>
                            <p className='bg-[#f67070a1] rounded-[5px] py-[5px] px-[5px]'>{ele.type}</p>
                            </td>
                        <td className='p-[18px]'>{ele.startDate}<br />
                            <span className='text-[#000000b5] text-sm font-normal'>
                                ({ele.startTime})
                            </span>
                        </td>
                        <td className='p-[18px]'>{ele.endDate}<br />
                            <span className='text-[#000000b5] text-sm font-normal'>
                                ({ele.endTime})
                            </span>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
        </div>
    </div>
    </>
  )
}

export default Notices
