

// styles
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"

const Navbar = () => {
  return ( 
    <nav className={styles.navbar}>
      <ul>
        <li className={ styles.title }>
          <Link to="/">finTracka</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
   );
}
 
export default Navbar;