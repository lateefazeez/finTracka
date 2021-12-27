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
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      { authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={ user && <Home />} />
            <Route path="/signup" element={ !user && <Signup />} />
            <Route path="/login" element={ !user && <Login />} />
          </Routes>
      </BrowserRouter>
      )}
    </div>
  );
}

export default App;
