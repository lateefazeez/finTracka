import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

// styles
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return ( 
    <nav className={styles.navbar}>
      <ul>
        <li className={ styles.title }>
          <Link to="/">finTracka</Link>
        </li>

        { !user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
        
        { user && (
          <>
            <li>hello, {user.displayName}</li>
            <li><button className="btn-logout" onClick={handleLogout}>Logout</button></li>
          </>
          
        )}
      </ul>
    </nav>
   );
}
 
export default Navbar;