import {  Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';



export default function AdminLayout() {
  const { userToken, currentUser } = useStateContext();

  return (
  userToken && currentUser.role===1 ?
    <Outlet/>
: <Navigate to="/auth"/>
   
  )
}
