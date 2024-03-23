import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios";

export default function AdminLayout() {
    const { userToken, currentUser, setCurrentUser, setUserToken } =
        useStateContext();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const sideBar = [
        { name: "Dashboard", link: "/" },
        { name: "Fields", link: "/admin/fields" },
        { name: "Students", link: "/admin/students" },
        { name: "Teachers", link: "/admin/teachers" },
        { name: "Grades", link: "/admin/grades" },
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
        <div className="grid grid-flow-col ">
            <aside className="bg-[rgb(248,248,248)] pl-7 pt-4 pr-4  h-full min-h-[100vh]">
                <div className="text-2xl mb-12">Logo</div>
                <nav>
                    {sideBar.map((item) => (
                        <NavLink
                            to={item.link}
                            key={item.name}
                            className="block font-semibold mb-2 px-2 py-1 text-[rgb(138,139,140)]  rounded-md ) "
                            style={({ isActive }) => ({
                                backgroundColor: isActive ? "#fff" : "",
                                color: isActive ? "black" : " ",
                            })}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </aside>
            <main className="col-[2_/_span_10] pl-7 pr-7 overflow-auto">
                <div className="flex justify-between pt-4 pb-10">
                    <div className="font-semibold text-2xl">{title}</div>
                    <div className="relative">
                        <img
                            className="w-[30px] h-[30px] rounded-[100%] cursor-pointer "
                            src={`http://localhost:8000/${currentUser.image}`}
                            alt="admin profile"
                            onClick={toggleMenu}
                        />

                        {isMenuOpen && (
                            <div className="block max-w-[200px] w-[120px] text-center bg-[rgb(248,248,248)] py-1 px-8  rounded-sm top-9 shadow-md right-0 absolute">
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
