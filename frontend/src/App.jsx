import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/profile" element={<Profile/>} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  );
}
