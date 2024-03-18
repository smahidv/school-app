import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

import swal from "sweetalert";
import axios from "axios";

function Navbar() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const navigateTo = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then((res) => {
            if (res.data.status === 200) {
                setCurrentUser(res.data.username);
                    setUserToken( res.data.token);

                swal("Success", res.data.message, "success");
                navigateTo("/login");
            }
        });
    };

    var AuthButtons = "";
    if (!localStorage.getItem("auth_token")) {
        AuthButtons = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Register
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/contact">
                        Contact
                    </Link>
                </li>
            </ul>
        );
    } else {
        AuthButtons = (
            <li className="nav-item">
                <button
                    type="button"
                    onClick={logoutSubmit}
                    className="nav-link btn btn-danger btn-sm text-white"
                >
                    Logout
                </button>
            </li>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    LOGO
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {AuthButtons}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
