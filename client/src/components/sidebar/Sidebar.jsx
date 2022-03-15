import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import "./sidebar.css"

export default function Sidebar() {
  
  const [cats,setCats] = useState([]);
  const {darkMode} = useContext(Context);

  useEffect(()=>{
    const getCats = async ()=>{
      const res= await axios.get("/categories");
      setCats(res.data); 
    }
    getCats();
  },[])
  return (
    <div className={darkMode ? "sidebar-d" :"sidebar"}>
      <div className="sidebarItem">
        <span className={darkMode ? "sidebarTitle-d" : "sidebarTitle"}>ABOUT ME</span>
        <img className="sidebarImg" src="https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
        <p className={darkMode?"sidebarText-d":"sidebarText"}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta quia iure aliquam veniam ullam debitis illo nesciunt quod adipisci iste! Asperiores iste, natus cum facere nostrum adipisci modi vel aut?</p>
        
      </div>
      <div className="sidebarItem">
        <span className={darkMode ? "sidebarTitle-d" : "sidebarTitle"}>CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c,index)=>(
            <Link to={`/?cat=${c.name}`} key={index} className="link">
          <li className={darkMode?"sidebarListItem-d":"sidebarListItem"}>{c.name}</li>
            </Link>
          ))}
          
        </ul>
      </div>
      <div className="sidebarItem">
        <span className={darkMode ? "sidebarTitle-d" : "sidebarTitle"}>FOLLOW US</span>
        <div className="sidebarSocial">
        <i className="sidebarIcon fab fa-pinterest-square"></i>
        <i className="sidebarIcon fab fa-twitter-square"></i>
        <i className="sidebarIcon fab fa-facebook-square"></i>
        <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  )
}
