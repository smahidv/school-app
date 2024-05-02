import React from 'react'
import { useStateContext } from '../../../contexts/ContextProvider';
import axiosClient from '../../../axios';

export default function StudentSideNavigation() {
  const { setCurrentUser, setUserToken } = useStateContext();

    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setCurrentUser({});
            setUserToken(null);
           
        });
    };
  return (
    <div className='p-4 h-full border-solid border-r-[.5px] border-r-[rgb(202,202,203)] '>
      <div onClick={logout}>log out</div>

    </div>
  )
}
