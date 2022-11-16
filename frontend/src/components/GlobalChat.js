import React from "react";
import "../style/global_chat.css";

function GlobalChat() {
    return(
        <div>
            <div className="row border text-center">
                <h1>Global chat</h1>
            </div>
            <div className="row text-center">
                <div className="col-10">
                    <div class="form-group">
                        <input type="email" class="form-control borderRadius" id="exampleInputEmail1" placeholder="Enter message"/>
                    </div>
                </div>
                <div className="col">
                    <button className="btn btn-primary borderRadius">SEND</button>  
                </div>
            </div>
        </div>
    );
}

export default GlobalChat;