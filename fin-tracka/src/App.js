import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

// pages
import Home from "./pages/home/Home"
import Signup from "./pages/signup/Signup"
import Login from "./pages/login/Login"

// styles
import './App.css';
import Navbar from "./components/Navbar";

function App() {
  const { authIsReady } = useAuthContext()

  return (
    <div className="App">
      { authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={ <Home />} />
            <Route path="/signup" element={ <Signup />} />
            <Route path="/login" element={ <Login />} />
          </Routes>
      </BrowserRouter>
      )}
      
      
    </div>
  );
}

export default App;
