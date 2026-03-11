import { Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import { checkAuth } from './app/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";

function App() {

  /**
   * state.auth <--- name of slice returns
   * {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      }
   */

  const isAuthenticated = useSelector( state => state.auth);
  const dispatch = useDispatch();
  // checkAuth() inside dispatch means runs the checkAuth fn --> checkAUth makes API calls --> than Redux updates auth slice inside the store
  useEffect(()=>{
    dispatch(checkAuth());
  },[]);

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