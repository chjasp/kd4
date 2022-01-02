import { useState } from "react"
import Main from "./components/Main";
import "./MainApp.css";

const MainApp = () => {
  const [position, setPosition] = useState([1000,1000])

  return (
    <div className="main-app">
        <Main position={position} setPosition={setPosition}/>
    </div>
  );
};

export default MainApp;
