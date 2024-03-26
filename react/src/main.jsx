import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./contexts/ContextProvider";
import router from "./router.jsx";
import './index.css'
import SvgsProvider from "./contexts/SvgsProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
     <SvgsProvider>
      <RouterProvider router={router} />
      </SvgsProvider>
    </ContextProvider>
   
  </React.StrictMode>
);