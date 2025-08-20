import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Left from "./home/Leftpart/Left";
import Right from "./home/Rightpart/Right";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Loading from "./components/Loading";
import { useAuth } from "./context/Authprovider.jsx";
import { Toaster } from "react-hot-toast";
function App() {
  const [authUser, setAuthUser] = useAuth();

  console.log(authUser); // For debugging

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
            <div className="flex h-screen">
              <Left />
              <Right />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <Login />}
      />

      <Route
        path="/signup"
        element={authUser ? <Navigate to="/" /> : <Signup />}
      />
    </Routes>
    <Toaster />

  </>
  );
}

export default App;
