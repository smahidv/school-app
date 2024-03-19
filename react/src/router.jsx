import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import AdminLayout from "./users/admin/adminComponents/AdminLayout";
import TeacherLayout from "./users/teacher/teacherComponents/TeacherLayout";
import StudentLayout from "./users/student/studentComponents/StudentLayout";
import AdminDashboard from "./users/admin/adminViews/AdminDashboard"
import TeacherDashboard from "./users/teacher/teacherviews/TeacherDashboard"
import StudentDashboard from "./users/student/studentViews/StudentDashboard"


const router = createBrowserRouter([
    {
        path: "/auth",
        element: <Login />,
    },
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            {
                path: "/admin/dashboard",
                element: <AdminDashboard />,
            },
            
        ],
    },
    {
        path: "/",
        element: <TeacherLayout />,
        children: [
            {
                path: "/teacher/dashboard",
                element: <TeacherDashboard />,
            },
        ],
    },
    {
        path: "/",
        element: <StudentLayout />,
        children: [
            {
                path: "/student/dashboard",
                element: <StudentDashboard />,
            },
        ],
    },
]);

export default router;
