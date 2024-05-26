import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./contexts/ContextProvider";
import router from "./router.jsx";
import "./index.css";
import SvgsProvider from "./contexts/SvgsProvider.jsx";
import FindExamByClassModuleProvider from "./contexts/FindExamByClassModuleProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
        <FindExamByClassModuleProvider>
            <SvgsProvider>
               
                    <RouterProvider router={router} />
              
            </SvgsProvider>
            </FindExamByClassModuleProvider>
        </ContextProvider>
    </React.StrictMode>
);
