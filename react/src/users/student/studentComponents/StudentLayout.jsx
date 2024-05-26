import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";

import StudentSideNavigation from "./StudentSideNavigation";

export default function StudentLayout() {
    const { userToken, currentUser } = useStateContext();

    return userToken && currentUser.role === 3 ? (
        <div className="flex h-full items-stretch">
            <div className=" w-[5%] bg-gray-900 min-h-[100vh]  border-solid border-r-[.5px] border-r-[rgb(202,202,203)] ">
                <StudentSideNavigation />
            </div>
            <div className="w-[95%]">
            <div className="p-4  relative after:absolute after:w-full after:h-[0.1px] after:bg-[rgb(202,202,203)] after:left-0 after:bottom-0 after:rounded-full  ">
                <p className="text-2xl text-gray-900 ml-10 font-semibold">Subjects</p>
            </div>
             <div className="mx-20"> <Outlet /></div>  
            </div>
        </div>
    ) : (
        <Navigate to="/auth" />
    );
}
