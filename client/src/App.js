import "./app.css";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login"
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Navigate to="/friend" replace={true} />} />
        <Route path="/:page" element={<Home />} />
        <Route path="/:page/:chatRoomId" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<p>not exist</p>} />
    </Routes >
  );
}

export default App;
