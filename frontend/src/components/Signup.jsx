import React from "react";
import { useForm } from "react-hook-form";
import  { useAuth }  from "../context/Authprovider.jsx";// ✅ adjust path if needed
import { Link } from "react-router-dom";

import axios from "axios";

function Signup() {
  const [authUser, setAuthUser] = useAuth();
   const {
  register,
  handleSubmit,
  watch,
  formState: { errors }
} = useForm();
    // watch the password and confirm password fields
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");
  

    const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };


 const onSubmit = async (data) => {
  const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
  };

 await axios
  .post("/api//user/signup" , userInfo, { withCredentials: true })
   .then((response) => {
    console.log( response.data);
    if( response.data){
      toast.success("Signup successful!");
    }

            localStorage.setItem("ChatApp", JSON.stringify(response.data));
            setAuthUser(response.data);
    // Handle successful signup (e.g., redirect to login page)
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
      className="w-94 h-67 p-6 rounded-xl border bg-gray-200 shadow-md text-gray-800"
      >

        {/* Header */}
        
          <div className="flex items-center justify-center mb-4 ">
            <h1 className="text-xl text-center font-bold">
              Chat<span style={{ color: "#22c55e" }}>App</span>
            </h1>
          </div>
          <h2 className="text-xl text-center font-bold">Signup</h2>
          <br />
        

        {/* Form Fields */}
        <div className="space-y-4 mb-10 bg-gray-300">
          <input style={{ fontWeight: "bold",  }}
            type="text"
            placeholder="Fullname"
            className="w-full px-3 py-2  border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("fullname", { required: true })}
          />
           {errors.fullname && <span style={{ color: "red" }} className=" font-semibold">This field is required</span>}
          <input style={{ fontWeight: "bold" }}
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2  border border-gray-600 rounded-md placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("email", { required: true })}
          />
          {errors.email &&  <span style={{ color: "red" }}  className=" font-semibold">This field is required</span>}
          <input style={{ fontWeight: "bold" }}
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2  border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("password", { required: true })}
          />
          {errors.password &&  <span style={{ color: "red" }}  className=" font-semibold">This field is required</span>}
          <input
            type="password" style={{ fontWeight: "bold" }}
            placeholder="Confirm Password"
            className="w-full px-3 py-2  border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("confirmPassword", { required: true ,  validate: validatePasswordMatch })}
          />
          {errors.confirmPassword && <span style={{ color: "red" }} className=" font-semibold">
            {errors.confirmPassword.message}
            </span>}
        </div>

        {/* Bottom Text and Button */}
        <div className="flex justify-between items-center mt-10 border-t border-[#444] pt-4">
          <p className="text-m text-gray-900">Have an account? <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>Login</Link>
          </p>
         <button
           type="submit"
             className="bg-green-500 text-xl px-5 py-1.5 rounded-md hover:bg-green-600 transition text-white ml-auto"
           >
            Signup
        </button>

  

        </div>
      </form>
    </div>
  );

}



export default Signup;
