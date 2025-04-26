import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Browsepage from "./pages/Browsepage";
import Createpost from "./pages/Createpost";
import Postdetails from "./pages/Postdetails";
import Editpost from "./pages/Editpost";
import { Link } from "react-router-dom";
import './App.css';

function App() {


  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/create" element={<Createpost />} />
    <Route path="/browse" element={<Browsepage />} />
    <Route path="/" element={<Createpost />} />
    <Route path = "/post/:id" element={<Postdetails />} />
    <Route path = "/post/:id/edit" element={<Editpost />} />

    </Routes>
    </BrowserRouter>
  )
}

export default App
