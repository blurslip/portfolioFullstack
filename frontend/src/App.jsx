import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Admin from "./pages/Admin.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import Education from "./pages/Education.jsx";
import Project from "./pages/Projects.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/education" element={<Education/>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/projects" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
