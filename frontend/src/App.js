import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from "./components/SideBar";
import GlobalChat from "./components/GlobalChat";
import Notifications from "./components/Notifications";
import Navbar from "./components/Navbar";
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import {over} from 'stompjs';
import SockJS from "sockjs-client";
var stompClient = null;

function App() {
  const [userData, setUserData] = useState({
    username: "",
    receiver_name: "",
    connected: false,
    message: ""
  });
  const [globalChat, setGlobalChat] = useState([]);
  const [privateChat, setPrivateChat] = useState(new Map());
  const [view, setView] = useState("GLOBAL");
  const [notifications, setNotification] = useState([]);

  useEffect(() => {
    const randomName = uniqueNamesGenerator({ dictionaries: [colors, animals] });
    setUserData({...userData, "username":randomName});
  }, []);

  const handleName = () => {
    //const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
    //setUserData({...userData, "username":randomName});
    registerUser();
   }

  const handleMessage = (event) => {
    const {value} = event.target;
    setUserData({...userData, "message":value});
  }

  const registerUser = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  const onConnected = () => {
    setUserData({...userData, "connected": true});
    stompClient.subscribe('/global/public', onPublicMessageReceived);
    stompClient.subscribe('/user/' + userData.username + "/private", onPrivateMessageReceived);
    userJoin();
  }

  const userJoin = () => {
    let chatMessage = {
      senderName: userData.username,
      status: 'JOIN'
    };
    stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
  }

  const onPublicMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch(payloadData.status) {
      case "JOIN":
        if(!privateChat.get(payloadData.senderName)) {
          privateChat.set(payloadData.senderName, []);
          setPrivateChat(new Map(privateChat));
        }
        break;
      case "MESSAGE":
        globalChat.push(payloadData);
        setGlobalChat([...globalChat]);
        break;
      }
    }

  const onPrivateMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    if(privateChat.get(payloadData.senderName)) {
      privateChat.get(payloadData.senderName).push(payloadData);
      alert(userData.username + " sent you a message!");
      setPrivateChat(new Map(privateChat));
    } else {
      let list = [];
      list.push(payloadData);
      privateChat.set(payloadData.senderName, list);
      alert(userData.username + " sent you a message!");
      setPrivateChat(new Map(privateChat));
    }
  }

  const sendPublicMessage = () => {
    if(stompClient) {
      let chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: 'MESSAGE'
      };
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
      setUserData({...userData, "message": ""})
    }
  }

  const sendPrivateMessage = () => {
    if(stompClient) {
      let chatMessage = {
        senderName: userData.username,
        receiverName: view,
        message: userData.message,
        status: 'MESSAGE'
      };
      if(userData.username !== view) {
        privateChat.get(view).push(chatMessage);
        setPrivateChat(new Map(privateChat));
      }
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setUserData({...userData, "message": ""})
    }
  }

  const onError = (error) => {
    alert(error);
  }

  const setTheView = (view) => {
    setView(view);
  }

  return (
    <div>
      <Navbar userData = {userData}/>
      <div className="container-fluid">
        {!userData.connected ? 
          <div className="row">
            <button className="btn btn-primary" onClick={handleName}>START CHATTING</button>
          </div> : null
        }
        {userData.connected ?
        <div>
        <div className="row">
          <div className="col-3">
            <SideBar onlineUsers = {privateChat} userData = {userData} setTheView = {setTheView}/>  
          </div>
          <div className="col-6">
            <GlobalChat globalChat = {globalChat} privateChat = {privateChat} userData = {userData} view = {view}
                      handleMessage = {handleMessage} sendPublicMessage = {sendPublicMessage} sendPrivateMessage = {sendPrivateMessage}
            />
          </div>
          <div className="col-3">
            <Notifications notification_online = {privateChat} userData = {userData}/>
          </div>
        </div>
        </div> : null }
        {!userData.connected ?
          <div>
            <div className="row">
              <br/>
            </div>
            <div className="row">
              <div className="col"></div>
              <div className="col">
                <img className="shadow rounded-circle" src="https://images.squarespace-cdn.com/content/v1/5b59e4ec3c3a536b5705cf13/c59cf914-6b6b-4f02-8d91-72fa529de85e/Asset+2.png" />
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <br/>
            </div>
            <div className="row text-center">
              <p><i>Welcome to ChatApp. Click the button above to enter the world of chatting!</i></p>
            </div>
          </div> : null
        }
      </div>
    </div>
  );
}

export default App;
