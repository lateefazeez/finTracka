import { Routes, Route } from "react-router-dom"

// pages
import Home from "./pages/home/Home"
import Signup from "./pages/signup/Signup"
import Login from "./pages/login/Login"

// styles
import './App.css';

function App() {
  return (

    <div className="App">
      <Routes>
        <Route exact path="/" element={ <Home />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/login" element={ <Login />} />
      </Routes>
    </div>
  );
}

export default App;
