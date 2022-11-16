import React from "react";
import "../style/sidebar.css";

function SideBar() {
    return(
        <div className="text-center">
            <div className="row border">
                <h1>Online users</h1>
            </div>
            <div className="row justify-content-center align-items-center userTab">
                <div className="col">
                    <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" height="50px"/>
                </div>
                <div className="col">Name</div>
                <div className="col">
                    🟢
                </div>
            </div>
            <div className="row">
                <br/>
            </div>
        </div>
    );
}

export default SideBar;