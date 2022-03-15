import "./header.css"
import { Context } from "../../context/Context";
import { useContext } from "react";

export default function Header() {
  const {darkMode} = useContext(Context);

  return (
    <div className="header">
      <div className={darkMode ? "headerTitles-d" :"headerTitles"}>
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img src={darkMode? "https://images.unsplash.com/photo-1534862559316-6579e3b7872a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1641&q=80" : "https://images.pexels.com/photos/147465/pexels-photo-147465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"} alt="" className="headerImg" />

    </div>
  )
}
