import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import axiosClient from "../../../axios";

export default function TeacherLayout() {
    const { userToken, currentUser,setUserToken,setCurrentUser } = useStateContext();
    const [isOpen, setIsOpen] = useState(false);

    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setCurrentUser({});
            setUserToken(null);
           
        });


    };
    const toggleLogout = () => {
        setIsOpen(!isOpen);
    };

    return userToken && currentUser.role === 2 ? (
        <>
            <div className=" toggleLogout border-b-[rgb(202,202,203)] border-solid border-b-[.5px] shadow-md  w-full text-2xl font-bold p-4   overflow-hidden top-0">
                <div className="flex items-center justify-between ">
                    <p>Classes</p>
                    <div>
                        <img
                            className="w-9 h-9 rounded-full cursor-pointer"
                            src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
                            alt=""
                            onClick={toggleLogout}
                        />
                    </div>
                </div>
                
                {isOpen && (
                                    <div className="absolute top-[2.4em]  right-3 block max-w-[200px] w-[120px] text-center bg-[rgb(248,248,248)] py-1 px-8  rounded-sm shadow-md ">
                                        <NavLink
                                            href="#"
                                            onClick={(ev) => logout(ev)}
                                            className={"text-sm text-gray-700"}
                                        >
                                            sign out
                                        </NavLink>
                                    </div>
                                )}
            </div>

            <Outlet />
        </>
    ) : (
        <Navigate to="/auth" />
    );
}
