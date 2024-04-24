import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function TeacherLayout() {
    const { userToken, currentUser } = useStateContext();

    return userToken && currentUser.role === 2 ? (
        <>
            <div className=" border-b-[rgb(202,202,203)] border-solid border-b-[.5px] shadow-md  w-full text-2xl font-bold p-4   overflow-hidden top-0">
                <div className="flex items-center justify-between">
                    <p>Classes</p>
                    <div>
                        <img
                            className="w-9 h-9 rounded-full"
                            src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
                            alt=""
                        />
                    </div>
                </div>
            </div>

            <Outlet />
        </>
    ) : (
        <Navigate to="/auth" />
    );
}
