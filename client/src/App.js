import "./app.css";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
// import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login"
import { BrowserRoute, Routes, Route, Navigate, Link } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Navigate to="/chat" replace={true} />} />
        <Route path="/:page" element={<Home />} />
        <Route path="/:page/:chatRoomId" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<p>not exist</p>} />
    </Routes >
  );
}

// {<Route path="/profile/:username" element={<Profile />} />}
// { <Route path="/" element={<Home />} /> }



export default App;
