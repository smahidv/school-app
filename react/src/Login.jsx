import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosClient from "./axios";
import { useStateContext } from "./contexts/ContextProvider";
import logo from "../src/images/Allinlab.png"

export default function Login() {
    
    const { setCurrentUser, setUserToken } = useStateContext();
    const navigate = useNavigate();

    const [loginInput, setLogin] = useState({
        matricule:"",
        password:"",
    });
    const [error, setError] = useState("");

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    };

    const loginSubmit = (e) => {
        e.preventDefault();
        setError("");

        axiosClient
            .post("/login", {
                matricule: loginInput.matricule,
                password: loginInput.password,
            })
            .then(({ data }) => {
                setCurrentUser(data.user);
                setUserToken(data.token);
                if (data.user.role === 1) {
                    navigate("/");
                } else if (data.user.role === 2) {
                    navigate("/t");
                } else if (data.user.role === 3) {
                    navigate("/s");
                }
            })
            .catch((error) => {
                if (error.response) {
                    setError(error.response.data.message);
                }
            });
    };

    return (
        <div>

         
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src={logo}
                            alt="Your Company"
                        />
                    </div>
                    {error && (
                        <div className="bg-red-500 rounded py-2 px-3 text-white">
                            {error}
                        </div>
                    )}
                    <form
                        onSubmit={loginSubmit}
                        className="mt-8 space-y-6"
                        action="#"
                        method="POST"
                    >
                        <input
                            type="hidden"
                            name="remember"
                            defaultValue="true"
                        />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label
                                    htmlFor="matricule"
                                    className="sr-only"
                                >
                                    matricule address
                                </label>
                                <input
                                    id="matricule"
                                    name="matricule"
                                
                                    autoComplete="matricule"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="matricule"
                                    onChange={handleInput}
                                    value={loginInput.matricule}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    onChange={handleInput}
                                    value={loginInput.password}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon
                                        className="h-5 w-5   group-hover:text-indigo-400"
                                        aria-hidden="true"
                                    />
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div> 
            
        </div>
    );
}
