import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import axiosClient from "../../../axios";
import {useClassModuleContext} from "../../../contexts/FindExamByClassModuleProvider";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export default function TeacherLayout() {
    const { userToken, currentUser, setUserToken, setCurrentUser } =
        useStateContext();
    const [isOpen, setIsOpen] = useState(false);
    const {  classModule } = useClassModuleContext();

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
            <div className=" toggleLogout border-b-[rgb(202,202,203)] border-solid border-b-[.5px] shadow-md  w-full  py-4  px-10  overflow-hidden top-0">
                <div className="flex items-center justify-between  ">
                    <div className="flex gap-2 items-center">
                    <span className="text-3xl font-semibold text-gray-700">Classes</span>
                    { classModule.class_name && classModule.module_name && <ChevronRightIcon className="w-[30px] text-gray-500"/>}
                    <div>
                    <div    className="text-xl hover:underline hover:text-primary hover:cursor-pointer">{classModule.class_name}</div>
                    <div className="text-gray-500 hover:underline hover:text-primary  hover:cursor-pointer">{classModule.module_name}</div>
                    </div>
                    </div>
                    <div>
                        <img
                            className="w-9 h-9 rounded-full cursor-pointer"
                            src={`http://localhost:8000/${currentUser.image}`}
                            alt=""
                            onClick={toggleLogout}
                        />
                    </div>
                </div>

                {isOpen && (
                    <div className="absolute top-[3.5em] hover:ring-1 right-3 block max-w-[200px] w-[120px] text-center bg-[rgb(248,248,248)] py-1 px-8  rounded-sm shadow-md ">
                        <NavLink
                            href="#"
                            onClick={(ev) => logout(ev)}
                            className={" text-gray-900  "}
                        >
                            Sign out
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
