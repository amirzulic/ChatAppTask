import React from "react";

function Navbar(props) {
    return(
        <div>
            <nav className="navbar bg-light">
                <div className="container-fluid">
                    {props.userData.username !== "" && !props.userData.connected ?
                    <span className="text-danger">
                        Welcome to ChatApp. We've given you a name, {props.userData.username}
                    </span>
                    :null}
                    {props.userData.username !== "" && props.userData.connected ?
                    <span className="text-danger">
                    Hi {props.userData.username}! Welcome to ChatApp.
                    </span>    
                : null}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;