import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useContext, useState } from "react";
import axiosClient from "../../../axios";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { SvgsContext } from "../../../contexts/SvgsProvider";

export default function AdminLayout() {
    const svgs = useContext(SvgsContext);
    const { userToken, currentUser, setCurrentUser, setUserToken } =
        useStateContext();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSideBarOpen, setSideBarOpen] = useState(true);
    const location = useLocation();

    const sideBar = [
        {
            name: "Dashboard",
            link: "/",
            icon: svgs.dashboard,
        },
        {
            name: "Courses",
            link: "/admin/fields",
            icon: svgs.field,
        },
        {
            name: "Students",
            link: "/admin/students",
            icon: svgs.student,
        },
        {
            name: "Teachers",
            link: "/admin/teachers",
            icon: svgs.teacher,
        },
        { name: "Exams", link: "/admin/exams", icon: svgs.exam },
        { name: "Grades", link: "/admin/grades", icon: svgs.grade },
    ];
    const currentNavItem = sideBar.find(
        (item) => item.link === location.pathname
    );
    const title = currentNavItem ? currentNavItem.name : "";

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setCurrentUser({});
            setUserToken(null);
        });
    };

    return userToken && currentUser.role === 1 ? (
        <div className="flex h-full  ">
            <aside
                className={`bg-[rgb(248,248,248)] pt-4 max-w-fit px-4  min-h-full relative ${
                    isSideBarOpen ? "min-w-[200px]  pl-7 " : "w-[90px]  "
                } `}
            >
                {/* {logo} */}
                <div className="mb-[90px] w-4"></div>
                {/* {logo} */}
                <nav
                    className={`overflow-auto grid  ${
                        isSideBarOpen ? "gap-8 " : "gap-12"
                    }`}
                >
                    {sideBar.map((item) => (
                        <NavLink
                            to={item.link}
                            key={item.name}
                            className="flex items-center gap-4 font-semibold px-1    text-[rgb(138,139,140)]  rounded-md "
                            style={({ isActive }) => ({
                                backgroundColor: isActive ? "#fff" : "",
                                color: isActive ? "black" : " ",
                            })}
                        >
                            <span> {item.icon}</span>
                            {isSideBarOpen && <p> {item.name}</p>}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            <div className="relative">
                <ChevronDoubleRightIcon
                    onClick={() => {
                        setSideBarOpen(!isSideBarOpen);
                    }}
                    className={`  fixed top-2/4  w-7 text-[rgb(138,139,140)] [transition:rotate_.4s,_height_4s] cursor-pointer ${
                        isSideBarOpen ? "[rotate:180deg] " : " "
                    }`}
                />
            </div>
            <main className=" ml-10 pl-7 pr-7 overflow-auto w-full ">
                <div className="flex justify-between pt-4 pb-10">
                    <div className="font-semibold text-2xl">{title}</div>
                    <div className="relative">
                        <img
                            className="w-[40px] h-[40px] rounded-[100%] cursor-pointer border-[3px] border-[dotted] border-[rgb(238,237,237)] p-[2px] bg-clip-padding"
                            src={`http://localhost:8000/${currentUser.image}`}
                            alt="admin profile"
                            onClick={toggleMenu}
                        />

                        {isMenuOpen && (
                            <div className="block max-w-[200px] w-[120px] text-center bg-[rgb(248,248,248)] py-1 px-8  rounded-sm top-[43px] shadow-md right-0 absolute">
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
                </div>
                <Outlet />
            </main>
        </div>
    ) : (
        <Navigate to="/auth" />
    );
}
