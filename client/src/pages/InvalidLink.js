import React from "react";
import NavBar from "../components/NavBar";
import NotFound from "../images/NotFound.svg";

const InvalidLink = () => {
    return (
        <div>
            <NavBar />
            <div className="flex justify-center content-center">
                <img alt="Not Found" src={NotFound}></img>
            </div>
        </div>
    );
};

export default InvalidLink;
