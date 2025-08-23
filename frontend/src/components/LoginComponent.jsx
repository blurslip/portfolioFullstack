import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_URL;
function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ username, password }),
        credentials: "include",
      });
      if (response.ok) {  
        window.location.href = "https://portfolio-fullstack-tau.vercel.app/admin";
        toast.success("WeLcome Vishnu Narayan");
        console.log("you in")
      } else if (response.status === 401) {
        toast.error("Invalid Credentials");
      } else {
        toast.error("Login Failed");
      }
    } catch (err) { 
      toast.error("Something went wrong: ", err);
    }
  };

  const handleForgotPassword = () => {
    // Implement forgot password logic here
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black">
      <div className="m-auto w-full max-w-md p-6 bg-white dark:bg-gray-900 shadow rounded-lg">
        <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
          Login
        </h1>

        <div className="mt-4">
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            autoComplete="username"
          />
        </div>

        <div className="mt-4">
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 pr-16 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs font-semibold border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <button
            className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 dark:hover:bg-indigo-800 cursor-pointer"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            className="text-blue-600 hover:underline"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginComponent;
