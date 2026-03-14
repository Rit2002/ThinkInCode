import { Navigate, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { checkAuth } from "./app/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

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

  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // React in development deliberately runs certain lifecycle flows twice to detect side-effects. That includes useEffect. So two api call are going to backend (route: /auth/check) & due to rate limiting return 429 status
  const called = useRef(false);

  // checkAuth() inside dispatch means runs the checkAuth fn --> checkAUth makes API calls --> than Redux updates auth slice inside the store
  useEffect(() => {
    if (called.current) return;

    called.current = true;
    dispatch(checkAuth());
  }, [dispatch]);

  const {loading} = useSelector(state => state.auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Homepage /> : <Navigate to="/signup" />}
        ></Route>
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
        ></Route>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
