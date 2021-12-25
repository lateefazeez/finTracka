import { useState } from "react";
import { useLogin } from "../../hooks/useLogin"
import { useNavigate } from "react-router-dom";

// styles
import styles from "./Login.module.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { error, isPending, login } = useLogin()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    navigate("/")
  }

  return ( 
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>email</span>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password</span>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      { !isPending && <button className="btn">Login</button>}
      { isPending && <button className="btn" disabled>Logging in...</button>}
      { error && <p>{ error }</p>}
    </form>
   );
}
 
export default Login;