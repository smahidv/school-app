import React from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

export default function StudentExamView() {
    const { userToken, currentUser } = useStateContext();
    return userToken && currentUser.role === 3 ? (
        <div>StudentExamView</div>
    ) : (
        <Navigate to="/auth" />
    );
}
