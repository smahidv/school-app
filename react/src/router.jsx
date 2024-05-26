import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import AdminLayout from "./users/admin/adminComponents/AdminLayout";
import TeacherLayout from "./users/teacher/teacherComponents/TeacherLayout";
import StudentLayout from "./users/student/studentComponents/StudentLayout";
import AdminDashboard from "./users/admin/adminViews/AdminDashboard";
import TeacherDashboard from "./users/teacher/teacherviews/TeacherDashboard";
import StudentDashboard from "./users/student/studentViews/StudentDashboard";
import AdminStudents from "./users/admin/adminViews/AdminStudents";
import AdminTeachers from "./users/admin/adminViews/AdminTeachers";
import Admingrades from "./users/admin/adminViews/Admingrades";
import AdminFields from "./users/admin/adminViews/AdminFields";
import FieldsView from "./users/admin/adminViews/FieldsView";
import ClassRoomEditor from "./users/admin/adminComponents/ClassRoomEditor";
import ModulesEditor from "./users/admin/adminComponents/ModulesEditor";
import AdminExams from "./users/admin/adminViews/AdminExams";
import TeacherClass from "./users/teacher/teacherviews/TeacherClass";
import TeacherExams from "./users/teacher/teacherviews/TeacherExams";
import TeacherPeaple from "./users/teacher/teacherviews/TeacherPeaple";
import StudentSubject from "./users/student/studentViews/StudentSubject";
import StudentExamView from "./users/student/studentViews/StudentExamView";
import AdminTeacherForm from "./users/admin/adminViews/AdminTeacherForm";
import ExamView from "./users/teacher/teacherviews/ExamView";

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
                path: "/",
                element: <AdminDashboard />,
            },
            {
                path: "/admin/fields",
                element: <AdminFields />,
            },
            {
                path: "/fields/create",
                element: <FieldsView />,
                children: [
                    {
                        path: "/fields/create/classrooms",
                        element: <ClassRoomEditor />,
                    },
                    {
                        path: "/fields/create/modules",
                        element: <ModulesEditor />,
                    },
                ],
            },
            {
                path: "/fields/create/:id",
                element: <FieldsView />,
                children: [
                    {
                        path: "/fields/create/:id/classrooms",
                        element: <ClassRoomEditor />,
                    },
                    {
                        path: "/fields/create/:id/modules",
                        element: <ModulesEditor />,
                    },
                ],
            },
            {
                path: "/admin/students",
                element: <AdminStudents />,
            },
            {
                path: "/admin/teachers",
                element: <AdminTeachers />,
            },
            {
                path: "/admin/exams",
                element: <AdminExams />,
            },
            {
                path: "/admin/grades",
                element: <Admingrades />,
            },
        ],
        
    },
    {
        path: "/admin/teachers/:id",
        element: <AdminTeacherForm />,
    },
    {
        path: "/t",
        element: <TeacherLayout />,
        children: [
            {
                path: "/t",
                element: <TeacherDashboard />,
            },
            {
                path: "/t/exam",
                element: <ExamView />,
            },
            {
                path: "/t/exam/:id",
                element: <ExamView />,
            },
            {
                path: "/t/c",
                element: <TeacherClass />,
                children: [
                    {
                        path: "/t/c/:classId/:moduleId",
                        element: <TeacherExams />,
                    },                 
                    {
                        path: "/t/c/p",
                        element: <TeacherPeaple />,
                    },
                ],
            },
        ],
    },
    {
        path: "/s",
        element: <StudentLayout />,
        children: [
            {
                path: "/s",
                element: <StudentDashboard />,
            },
            {
                path: "/s/:id",
                element: <StudentSubject />,
            },
        ],
    },
    {
        path: "/exam/:id",
        element: <StudentExamView />,
    },
]);

export default router;
