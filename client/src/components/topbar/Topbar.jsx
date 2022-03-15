import "./topbar.css"
import {Link} from "react-router-dom"
import { useContext } from "react";
import { Context } from "../../context/Context";
import Toggle from "../toggle/Toggle";

export default function Topbar() {
  const {dispatch, user, darkMode} = useContext(Context);

  const handleLogout = () => {
    dispatch({type:"LOGOUT"})
  };

  const PF = "http://localhost:8000/images/"
  return (
    <div className={darkMode ? "top-d"  :"top"}>
      <div className="topLeft">
        <i className={darkMode?"topIcon-d fab fa-pinterest-square": "topIcon fab fa-pinterest-square"}></i>
        <i className={darkMode?"topIcon-d fab fa-twitter-square" :"topIcon fab fa-twitter-square"}></i>
        <i className={darkMode?"topIcon-d fab fa-facebook-square":"topIcon fab fa-facebook-square"}></i>
        <i className={darkMode?"topIcon-d fab fa-instagram-square":"topIcon fab fa-instagram-square"}></i>
        </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className={darkMode? "link-d":"link"}>HOME</Link>
          </li>
          <li className="topListItem"><Link to="/about" className={darkMode? "link-d":"link"}>ABOUT</Link></li>
          <li className="topListItem"><Link to="/contact" className={darkMode? "link-d":"link"}>CONTACT</Link></li>
          <li className="topListItem"><Link to="/write" className={darkMode? "link-d":"link"}>WRITE</Link></li>
          <li className={darkMode?"topListItem-d":"topListItem"} onClick={handleLogout}>
            {user && "LOGOUT" }
          </li>
        </ul>
      </div>
      <div className="topRight">
        <Toggle/>
        {user ? (
        <Link to="/settings">
          <img className="topImg" src={PF+user.profilePic} alt="" />
          </Link>)
            : 
            (<ul className="topList">
              <li className="topListItem">
            <Link className={darkMode? "link-d":"link"} to="/login">LOGIN</Link>
              </li>
              <li className="topListItem">
            <Link className={darkMode? "link-d":"link"} to="/register">REGISTER</Link>
              </li>
            </ul>
            )
        }
        <i className={darkMode? "topSearchIcon-d fas fa-search":"topSearchIcon fas fa-search"}></i>
      </div>
    </div>
  )
}
