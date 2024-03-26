import React from "react";
import { Link } from "react-router-dom";

export default function BlackButton({ to = false, content = "" ,onClick}) {
    return (
        <>
            {to ? (
                <Link
                    className="text-white bg-slate-900 px-3 py-1 rounded-[5px] capitalize text-[0.8rem]"
                    to={to}
                >
                    <p>{content}</p>
                </Link>
            ) : (
                <button 
                onClick={onClick}
                className="text-white bg-slate-900 px-3 py-1  rounded-[5px] capitalize text-[0.8rem]">
                    <p>{content}</p>
                </button>
            )}
        </>
    );
}
