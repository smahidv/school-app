import {  Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';

export default function StudentLayout() {
  const { userToken, currentUser } = useStateContext();

  return (
    userToken && currentUser.role===3 ?
      <Outlet/>
  : <Navigate to="/auth"/>
     
    )
}
