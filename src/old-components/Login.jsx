import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { errorNotification } from "../components/Notifications";
import { UserContext } from "../context/UserContext";
import { SERVER_URL } from "../lib/config";

const Login = () => {
  const navigate = useNavigate();
  const { username, setUsername, setIsAdmin } = useContext(UserContext);

  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (username) {
      navigate("/user");
    }
  }, [username]);

  async function userHandler(event) {
    event.preventDefault();

    const response = await fetch(SERVER_URL + "/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: user_name, password }),
    });
    const data = await response.json();
    if (data.user) {
      localStorage.setItem("token", data.user);
      setUsername(data.username);
      setIsAdmin(data.admin);
      navigate("/user");
    } else {
      errorNotification("Incorrect combination");
    }
  }

  return (
    <div className="p-2 flex flex-col items-center">
      <div>
        <p className="pb-2 text-3xl text-blue-100">Login</p>
        <form className="flex flex-col" onSubmit={userHandler}>
          <div className="user-box ">
            <input
              className="input-text"
              id="username"
              type="text"
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)}
              required={true}
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              className="input-text"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
            <label>Password</label>
          </div>

          <input
            className="block py-2 bg-cyan-600 rounded-md text-gray-200"
            value="Submit"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
