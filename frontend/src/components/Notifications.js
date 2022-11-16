import React from "react";
import "../style/notifications.css";

function Notifications() {
    return(
        <div>
            <div className="row border text-center">
                <h1>Notifications</h1>
            </div>
            <div className="row notificationTab">
                <div className="col">
                    <small>
                        <b className="text-success">new activity</b>
                    </small>
                    <p>someuser is now online!</p>
                </div>
            </div>
            <div className="row notificationTab justify-content-center align-items-center">
                <small>
                    <b className="text-warning">new activity</b>
                </small>
                <p>someuser sent you a message!</p>
            </div>
        </div>
    );
}

export default Notifications;