import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

const App = () => {
  const { user, darkMode } = useContext(Context);
  return (
    <div style={{backgroundColor: darkMode ? "#333" : "white", color:darkMode && "white", transition:"all 1s ease"}}>
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/register" exact element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/login" exact element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/write" exact element={user ? <Write /> : <Navigate to="/register" />} />
          <Route path="/settings" exact element={user ? <Settings /> : <Navigate to="/register" />} />
          <Route path="/post/:postId" exact element={<Single />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;