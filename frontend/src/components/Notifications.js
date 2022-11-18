import React from "react";
import "../style/notifications.css";

function Notifications(props) {
    return(
        <div>
            <div className="row border borderRadius text-center">
                <h1>NOTIFICATIONS</h1>
            </div>
            {[...props.notification_online.keys()].map((name, index) => (
                <div className="row notificationTab border borderRadius">
                <div className="col">
                    <small>
                        <b className="text-success">new activity</b>
                    </small>
                    <p key={index}>{name} is now online!</p>
                </div>
            </div>
            ))}
        </div>
    );
}

export default Notifications;