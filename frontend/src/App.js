import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from "./components/SideBar";
import GlobalChat from "./components/GlobalChat";
import Notifications from "./components/Notifications";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar/>
      <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <SideBar/>
        </div>
        <div className="col-6">
          <GlobalChat/>
        </div>
        <div className="col-3">
          <Notifications/>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
