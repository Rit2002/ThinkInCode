import { Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>} ></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>} ></Route>
      </Routes>
    </>
  )
}

export default App;