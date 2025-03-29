import "./App.css";
import Navbar from "./component/navbar";
import Create from "./component/Create.jsx";
import Read from "./component/Read.jsx";
import Update from "./component/Update.jsx";


import {Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <div>
      <Routes>
          <Route path="/" element={<Create/>}></Route>
          <Route path="/all" element={<Read/>}></Route>
          <Route path="/update/:id" element={<Update/>} />
      </Routes>

    </div>
    </div>
    
  );
}

export default App;
