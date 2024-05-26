import React, { createContext, useContext, useState } from "react";

export const moduleClassForExamContext = createContext(
  {  classModule: {},
    setClassModule: () => {},}
);

export default function FindExamByClassModuleProvider({ children }) {
    const [classModule, setClassModule] = useState({
        class_name: "",
        module_name: "",
    });

    return (
        <moduleClassForExamContext.Provider value={{ classModule, setClassModule }}>
            {children}
        </moduleClassForExamContext.Provider>
    );
}
export const useClassModuleContext = () => useContext(moduleClassForExamContext);