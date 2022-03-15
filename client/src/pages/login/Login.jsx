import "./login.css"
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";


export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();

  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "FAILURE" });
    }
  };
 
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form onSubmit={handleSubmit} className="loginForm">
        <label className="loginFormLabel">Username:</label>
        <input ref={userRef} className="loginInput" type="text" placeholder="enter your username" />
        <label className="loginFormLabel">Password:</label>
        <input ref={passwordRef} className="loginInput" type="password" placeholder="enter your password" />
        <button disabled={isFetching} className="loginButton">Login</button>
      </form>
      <Link to="/register" className="link">
        <button type="submit" className="loginRegisterButton" >Register</button>
      </Link>
    </div>
  )
}
