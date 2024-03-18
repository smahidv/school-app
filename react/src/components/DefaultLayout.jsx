import React, { useEffect } from 'react';
import { Navigate,useNavigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

export default function DefaultLayout() {
    const { userToken, currentUser } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
      
            if (currentUser.role === 1) {
                navigate("/admin/dashboard");
            } else if (currentUser.role === 2) {
                navigate("/teacher/dashboard");
            } else if (currentUser.role === 3) {
                navigate("/student/dashboard");
            }

    }, [currentUser.role, navigate]);

   return (
    userToken  ?
     <>
     hi
     <Outlet/> 
     </>
    : <Navigate to='/login'/>
   )
 

}
