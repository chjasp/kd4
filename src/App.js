import { useState } from "react"
import Main from "./components/Main";
import "./App.css";

const App = () => {
  const [position, setPosition] = useState([1000,1000])

  return (
    <div className="App">
        <Main position={position} setPosition={setPosition}/>
    </div>
  );
};

export default App;
