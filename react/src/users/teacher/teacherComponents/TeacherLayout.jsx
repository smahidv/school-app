import {  Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';

export default function TeacherLayout() {
    const { userToken, currentUser } = useStateContext();

    return (
        userToken && currentUser.role===2 ?
          <Outlet/>
      : <Navigate to="/auth"/>
         
        )
}
