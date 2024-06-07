import React from 'react'

export default function StudentsGrades() {
   
  return (
    

<div className="p-10 relative overflow-x-auto shadow-md ">
    <button type='button' className='text-semibold text-xl bg-green-700 text-white block ml-auto px-5 py-1 rounded-md'>Publish</button>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        
        <caption className="p-5 text-2xl font-bold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
           S1-Exam 1
        </caption>
        <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    STUDENT
                </th>
                <th scope="col" className="px-6 py-3">
                    SID
                </th>
                <th scope="col" className="px-6 py-3">
                    DATE OF SUBMISSION
                </th>
                <th scope="col" className="px-6 py-3">
                    GRADES
                </th>

            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ahmed ghalli
                </th>
                <td className="px-6 py-4">
                    2024-0002
                </td>
                <td className="px-6 py-4">
                    20/3/2024 06/00/01
                </td>
                <td className="px-6 py-4 font-bold text-xl text-green-700">
                    15/20
                </td>
            </tr>

        </tbody>
    </table>
</div>

  )
}
