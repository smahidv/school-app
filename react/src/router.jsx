import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import GuestLayout from './components/GuestLayout'
import Dashboard from "./views/Dashboard";
import AdminDashboard from "./adminViews/AdminDashboard";
import TeacherDashboard from "./teacherviews/TeacherDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />},
  
      {
        path: '/dashboard',
        element: <Navigate to="/" />
      },
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/teacher/dashboard",
        element: <TeacherDashboard />,
      },
 

	{
		path: "/login",
		element: <Login />,
	},
]);

export default router;
