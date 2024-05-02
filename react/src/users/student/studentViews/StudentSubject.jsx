import React from 'react'
import { NavLink } from 'react-router-dom'

export default function StudentSubject() {
 
  return (
    <div>
         <div>4iir Date science</div>
         <NavLink to={"/exam/:id"}>exam</NavLink>
    </div>
   
  )
}
