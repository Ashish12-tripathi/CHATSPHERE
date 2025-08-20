import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import  { useAuth }  from "../context/Authprovider.jsx";
import { Link } from "react-router-dom";

function Login() {
   const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const userInfo = {
      
      email: data.email,
      password: data.password,
      
    };

    await axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          toast.success("Login successful!");
        }

        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);

        // Handle successful login (e.g., redirect to home page)
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
        // Handle signup error (e.g., show error message)
      });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#1f1f1f] bg-gray-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-94 h-67 p-6 rounded-xl border border-gray-300 bg-[#f0e8e8] shadow-md text-gray-800"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-xl text-center font-bold">
              Chat<span style={{ color: "#22c55e" }}>App</span>
            </h1>
          </div>
          <h2 className="text-xl font-bold">Login</h2>
          <br />
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mb-23 ">
          <input style={{ fontWeight: "bold" }}
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2  border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span style={{ color: "red" }} className=" font-semibold">
              This field is required
            </span>
          )}

          <input style={{ fontWeight: "bold" }}
            type="password"
            placeholder="Password"
             className="w-full px-3 py-2  border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span style={{ color: "red" }} className=" font-semibold">
              This field is required
            </span>
          )}
        </div>

        {/* Bottom Text and Button */}
        <div className="flex justify-between items-center mt-10 border-t border-[#444] pt-4">
          <p className="text-m text-gray-400">
            New user?{" "}
            <Link to="/signup" style={{ color: "blue", textDecoration: "underline" }}>
              Signup
            </Link>
          </p>
          <input
            type="submit"
            value="Login"
            className="bg-green-500 text-xl px-5 py-1.5 rounded-md hover:text-green-600 transition ml-auto"
          />

          {/* Bottom Text and Button */}
        </div>
      </form>
    </div>
  );
}

export default Login;
