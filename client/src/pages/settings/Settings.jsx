import axios from "axios";
import { useContext, useEffect, useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import { Context } from "../../context/Context"
import "./settings.css"

export default function Settings() {
  const { user, dispatch, darkMode } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const PF = "http://localhost:8000/images/"

  useEffect(()=> {
    const TOKEN = JSON.parse(localStorage.getItem("user")).accessToken;
    console.log(TOKEN)

  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const TOKEN = JSON.parse(localStorage.getItem("user")).accessToken;
      console.log(TOKEN)
      const res = await axios.put("/users/" + user._id, updatedUser, {
        headers: { token: `Bearer ${TOKEN}`}
      });
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      console.log(JSON.parse(localStorage.getItem("user")).accessToken)
    }
  };

  setTimeout(() => {
    setSuccess(false);
  }, 3000);
  
  return (
    <div className={darkMode?"settings-d":"settings"}>
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update your account</span>
          <span className="settingsDeleteTitle">Delete account</span>
        </div>
        <form onSubmit={handleSubmit} className="settingsForm">
          <label >Profile Picture</label>
          <div className="settingsPP">
            <img className="settingsPPImg" src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
            <label className="settingsFormLabel" htmlFor="fileInput">
              <i className="settingsPPIcon fas fa-user"></i>
            </label>
            <input className="settingsFormInput" type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <label>username</label>
          <input className={darkMode?"settingsFormInput-d":"settingsFormInput"} type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)} />
          <label>email</label>
          <input className={darkMode?"settingsFormInput-d":"settingsFormInput"} type="text" placeholder={user.email} onChange={e => setEmail(e.target.value)} />
          <label>password</label>
          <input className={darkMode?"settingsFormInput-d":"settingsFormInput"} type="password" onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="settingsSubmit">Submit</button>
          {success && <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}> Profile has been updated...</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
