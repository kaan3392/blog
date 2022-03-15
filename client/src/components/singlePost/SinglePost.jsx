import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import { Context } from "../../context/Context";
import "./singlePost.css"

export default function SinglePost() {
  const [post, setPost] = useState({});
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const PF = "http://localhost:8000/images/"
  const { user, darkMode } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    }
    getPost();
  }, [path])

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, { username: user.username, title, desc });
      window.location.reload();
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo &&
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        }{
          updateMode ?
            <input onChange={(e) => setTitle(e.target.value)}
              className={darkMode ? "singlePostTitleInput-d" : "singlePostTitleInput"} autoFocus type="text" value={title} />
            :
            <h1 className="singlePostTitle">{post.title}
              {(post.username === user?.username || user?.isAdmin === true) && (
                <div className="singlePostEdit">
                  <i
                    className="singlePostIcon far fa-edit"
                    onClick={() => setUpdateMode(true)}
                  ></i>
                  <i
                    className="singlePostIcon far fa-trash-alt"
                    onClick={handleDelete}
                  ></i>
                </div>
              )}
            </h1>
        }
        <div className="singlePostInfo">
          <span className="singlePostAuthor">Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (<textarea onChange={(e) => setDesc(e.target.value)} value={desc} className={darkMode ? "singlePostDescInput-d" : "singlePostDescInput"} />) :
          (<p className="singlePostDesc">{post.desc}</p>)
        }{updateMode &&
          <button onClick={handleUpdate} className="singlePostButton">Update</button>
        }
      </div>
    </div>
  )
}
