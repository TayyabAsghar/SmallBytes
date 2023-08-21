import React from "react";
import "../styles/Service.css";

export default function Service(props) {
    return (
        <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full service-circle-icon bg-red-100 mb-5 flex-shrink-0">
                {props.icon}
            </div>
            <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-bold mb-3">
                    {props.heading}
                </h2>
                <p className="leading-relaxed text-base mb-10">
                    {props.text}
                </p>
            </div>
        </div>
    );
}