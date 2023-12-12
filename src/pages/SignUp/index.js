import "./index.css"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../client";
import { useAuth } from "../../hooks/useAuth";

export function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const signup = async () => {
    console.log("hit")
    try {
      const response = await client.signup(credentials);
      login(response)
      navigate("/profile");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 mb-10 text-center text-4xl font-bold leading-9 tracking-tight green-text">
          Sign up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
        <form className=" space-y-4" action="#" method="POST">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 green-text"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                id="firstname"
                name="text"
                type="text"
                autoComplete="text"
                required
                className="block w-full rounded-md border-0 py-2 bg-slate-200 text-gray-900   placeholder:text-gray-400  sm:text-sm sm:leading-6"
                value={credentials.first_name}
                onChange={(e) => setCredentials({...credentials, first_name: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 green-text"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                id="lastname"
                name="lastname"
                type="text"
                autoComplete="lastname"
                required
                className="block w-full rounded-md border-0 py-2 bg-slate-200 text-gray-900   placeholder:text-gray-400  sm:text-sm sm:leading-6"
                value={credentials.last_name}
                onChange={(e) => setCredentials({...credentials, last_name: e.target.value })}              
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 green-text"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-2 bg-slate-200 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 green-text"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full rounded-md border-0 py-2 bg-slate-200 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value })}
             />
            </div>
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium leading-6 green-text"
            >
              Role
            </label>
            <div className="mt-2">
              <div className="flex items-center row">
                <div className = "col-3" style={{display: "flex"}}>
                  <input
                      id="user-role"
                      name="role"
                      type="radio"
                      autoComplete="role"
                      className="form-check-input block w-full rounded-md border-0 py-2 bg-slate-200 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      checked
                      value="Reviewer"
                      onChange={(e) => setCredentials({ ...credentials, is_moderator: e.target.checked })}
                  />
                  &nbsp;
                  &nbsp;
                  <label className="form-check-label green-text" htmlFor="user-role">
                      Reviewer
                  </label>
                </div>
                <div className="col-auto" style={{display: "flex"}}>
                  <input
                      id="admin-role"
                      name="role"
                      type="radio"
                      autoComplete="role"
                      className="form-check-input block w-full rounded-md border-0 py-2 bg-slate-200 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      value="Admin"
                      onChange={(e) => setCredentials({ ...credentials, is_moderator: e.target.checked })}
                  />
                  &nbsp;
                  &nbsp;
                  <label className="form-check-label green-text" htmlFor="admin-role">
                      Admin
                  </label>
                </div>
              </div>
          </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 green-text"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-2 bg-slate-200 text-gray-900   placeholder:text-gray-400  sm:text-sm sm:leading-6"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              className="sign-up-button flex w-full mt-12 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{backgroundColor:"#6B4A60"}}
              onClick={signup}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
