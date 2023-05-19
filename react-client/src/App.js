import "./index.css"
import Navbar from "./components/Navbar";
import Game from "./components/Game";
import Computer from "./components/Computer";
import Footer from "./components/Footer";
import About from "./components/About";
import Home from "./components/Home";
import Online from "./components/Online";
import OnlineGame from "./components/OnlineGame"
import React,{useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
function App(props) {
  const [login,setLogin]=useState(true);
  return (
    <>
    <Router>
      <Navbar login={login} signup={true}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>}></Route>
        <Route path="/playwithcomputer" element={<Computer />}/>
        <Route path="/playwithfriend" element={<Game />}  />
        <Route path="/startgamepage" element={<OnlineGame/>}/>
        <Route path="/playonline" element={<Online/>}/>
      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;
