import "./global.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import { AuthProvider } from "./contexts/authContext";
import { Modal } from "./components/Modal";
import { ModalProvider } from "./contexts/modalContext";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <Modal />

        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </ModalProvider>
    </AuthProvider>
  );
};

export default App
