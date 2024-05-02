import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";

import StudentSideNavigation from "./StudentSideNavigation";

export default function StudentLayout() {
    const { userToken, currentUser } = useStateContext();

    return userToken && currentUser.role === 3 ? (
        <div className="h-full">
            <div className="p-4 w-full relative after:absolute after:w-full after:h-[0.1px] after:bg-[rgb(202,202,203)] after:left-0 after:bottom-0 after:rounded-full  ">
                <p className="text-2xl text-gray-800">Subjects</p>
            </div>
            <div className="flex h-full items-start gap-10">
                <StudentSideNavigation />

                <Outlet />
            </div>
        </div>
    ) : (
        <Navigate to="/auth" />
    );
}
