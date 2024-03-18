import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import AdminDashboard from "./admin/adminViews/AdminDashboard";
import TeacherDashboard from "./teacher/teacherviews/TeacherDashboard";
import StudentDashboard from "./student/studentviews/StudentDashboard";
import DefaultLayout from "./components/DefaultLayout";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/admin/dashboard",
                element: <AdminDashboard />,
            },
            {
                path: "/teacher/dashboard",
                element: <TeacherDashboard />,
            },
            {
                path: "/student/dashboard",
                element: <StudentDashboard />,
            },
        ],
    },
]);

export default router;
