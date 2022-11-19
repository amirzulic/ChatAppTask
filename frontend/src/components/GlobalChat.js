import React from "react";
import "../style/global_chat.css";

function GlobalChat(props) {
    return(
        <div>
            <div className="row border borderRadius text-center text-primary">
                <h1>GLOBAL CHAT</h1>
            </div>
            <div className="row">
                <br/>
            </div>
            <div className="row">
                {props.view === "GLOBAL" ? props.globalChat.map((chat, index) => (
                    <div key={index}>
                        {chat.senderName !== props.userData.username ? <p className="text-start"><div><p><b className="text-warning">{chat.senderName}</b>{" " + chat.message}</p></div></p> : null}
                        {chat.senderName === props.userData.username ? <p className="text-end"><div><p>{chat.message + " "}<b className="text-primary">{chat.senderName}</b></p></div></p> : null}
                    </div>
                )) : null}
                {props.view !== "GLOBAL" ? [...props.privateChat.get(props.view)].map((chat, index) => (
                    <div key={index}>
                        {chat.senderName !== props.userData.username ? <p className="text-start"><div><p><b className="text-warning">{chat.senderName}</b>{" " + chat.message}</p></div></p> : null}
                        {chat.senderName === props.userData.username ? <p className="text-end"><div><p>{chat.message + " "}<b className="text-primary">{chat.senderName}</b></p></div></p> : null}
                    </div>
                )) : null}
            </div>
            <div className="row">
                <br/>
            </div>
            <div className="row text-center">
                {props.userData.connected ?
                <div className="col-10">
                    <div className="form-group">
                        <input type="text" className="form-control borderRadius" id="message" 
                            placeholder={props.view === "GLOBAL" ? "Send a message to the global chat" : "Send a message to " + props.view}
                            value={props.userData.message} onChange={props.handleMessage}
                        />
                    </div>
                </div>
                : null}
                {props.userData.connected ?
                <div className="col text-end">
                {props.view === "GLOBAL" ?
                    <button className="btn btn-primary borderRadius" onClick={props.sendPublicMessage}>SEND</button> 
                    :
                    <button className="btn btn-primary borderRadius" onClick={props.sendPrivateMessage}>SEND</button>   
                }
                </div>
                : null}
            </div>
        </div>
    );
}

export default GlobalChat;