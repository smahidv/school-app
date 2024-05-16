import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import axiosClient from '../../../axios'
import { useStateContext } from '../../../contexts/ContextProvider';


export default function StudentSubject() {
  const [exams, setexams] = useState([]);
  const { id } = useParams();
  const { currentUser } = useStateContext();

  function getClassExams(){
    axiosClient.get(`/getExams?moduleId=${id}&classRoomId=${currentUser.student_class_room_id}`).then(({data})=>{
      
   
      setexams(data);
        })
  }


  
  useEffect(() => {
  
       getClassExams()

  }, []);



  return (
    <div className='mr-12 my-10 w-full grid gap-y-6'>
    
         <div className=' bg-student-class bg-cover bg-center bg-no-repeat bg-origin-border  pb-4 px-4 rounded-md h-[35vh] flex items-end '>
         <p className='text-3xl font-bold'>{}</p>
          </div>

          <div className='grid gap-4'>

            {exams.length > 0 && exams.map((e,index)=>(  
              <NavLink 
              to={`/exam/${e.exam_id}`}
              key={index}
              className='border-solid border-gray-300 border-[1px] p-4 rounded-sm hover:bg-blue-100'>
                 <div>A new exam, is now available for you to take. Please review the following details carefully before beginning the exam:</div>
                 <ul>
                 <li><span className='font-bold'>Duration: </span>{e.duration}</li>
                 <li><span className='font-bold'>Start Date and Time: </span> {e.enable_date}</li>
                 <li><span className='font-bold'>End Date and Time: </span> {e.expire_date}</li>
                 </ul>
            </NavLink>
            ))
              
            }

          </div>
        
    </div>
   
  )
}
