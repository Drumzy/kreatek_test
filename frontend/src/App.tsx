import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home.component";
import AdminPanel from "./components/admin.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
