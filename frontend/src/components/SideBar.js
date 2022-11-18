import React from "react";
import "../style/sidebar.css";

function SideBar(props) {
    return(
        <div className="text-center">
            <div className="row border borderRadius">
                <h1>ONLINE USERS</h1>
            </div>
            {props.userData.connected ?
            <div className="row userTab border borderRadius py-2" onClick={() => {props.setTheView("GLOBAL")}}>
                <h1 className="title text-primary"><b>GLOBAL CHATROOM</b></h1>
            </div>
            : null }
            {props.userData.connected ?
            <div>
            {[...props.onlineUsers.keys()].map((name, index) => (
                <div className="row justify-content-center align-items-center userTab border borderRadius py-2" key={index} onClick={() => {props.setTheView(name)}}>
                    <div className="col">
                        <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" height="40px"/>
                    </div>
                    <div className="col-6" key={index}><b>{name}</b></div>
                    <div className="col">🟢</div>
            </div>
            ))}
            </div> : null }
            <div className="row">
                <br/>
            </div>
        </div>
    );
}

export default SideBar;