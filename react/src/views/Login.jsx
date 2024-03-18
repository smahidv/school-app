import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {

    const { setCurrentUser, setUserToken } = useStateContext();
  const navigateTo = useNavigate();

    const [loginInput, setLogin] = useState({
        email: "",
        password: "",
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    };

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        };

        // When you get the csrf token, in the following request, laravel will update the token automatic
        axiosClient.get("/sanctum/csrf-cookie").then((response) => {
            axiosClient.post(`api/login`, data).then((res) => {
                if (res.data.status === 200) {
                    setCurrentUser(res.data.username);
                    setUserToken( res.data.token);

                    swal("Success", res.data.message, "success");
                    if (res.data.role === "admin") {
                      navigateTo("/admin/dashboard");
                    } else {
                      navigateTo("/dashboard");
                    }
                } else if (res.data.status === 401) {
                    swal("Warning", res.data.message, "warning");
                } else {
                    setLogin({
                        ...loginInput,
                        error_list: res.data.validation_errors,
                    });
                }
            });
        });
    };

    function click(){
      navigateTo("/admin/dashboard");
    }

    return (
        <>
            <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <Link
                    to="/signup"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    signup for free
                </Link>
            </p>

            <form
                onSubmit={loginSubmit}
                className="mt-8 space-y-6"
                action="#"
                method="POST"
            >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email address"
                            onChange={handleInput}
                            value={loginInput.email}
                        />
                        <span>{loginInput.error_list.email}</span>
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
                        <span>{loginInput.error_list.password}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                            htmlFor="remember-me"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            Remember me
                        </label>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon
                                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                aria-hidden="true"
                            />
                        </span>
                        Sign in
                    </button>
                </div>
            </form>
        </>
    );
}
