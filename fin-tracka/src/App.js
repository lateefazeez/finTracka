import { Routes, Route } from "react-router-dom"

// pages
import Home from "./pages/home/Home"
import Signup from "./pages/signup/Signup"
import Login from "./pages/login/Login"

// styles
import './App.css';
import Navbar from "./components/Navbar";

function App() {
  return (

    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={ <Home />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/login" element={ <Login />} />
      </Routes>
    </div>
  );
}

export default App;
