import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password
      });
      res.data && window.location.replace("/login");
      console.log(res.data)
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form onSubmit={handleSubmit} className="registerForm">
        <label className="registerFormLabel">Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="enter your username..."
          onChange={e => setUsername(e.target.value)} />
        <label className="registerFormLabel">Email:</label>
        <input
          className="registerInput"
          type="text"
          placeholder="enter your email..."
          onChange={e => setEmail(e.target.value)} />
        <label className="registerFormLabel">Password:</label>
        <input
          className="registerInput"
          type="password"
          placeholder="enter your password..."
          onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="registerButton">Register</button>
      </form>
      <button className="registerLoginButton">
        <Link to="/login" className="link">Login</Link>
      </button>
      {error && <span style={{ color: "red", marginTop: "10px" }}>Something went wrong!</span>}
    </div>
  )
}
