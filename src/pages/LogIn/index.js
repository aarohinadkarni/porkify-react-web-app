import * as client from "../client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const { login } = useAuth();

  const navigate = useNavigate();
  const signin = async () => {
    //TODO SIGN IN ON NETLIFY IS NOT WORKING
    const response = await client.signin(credentials);
    login(response)
    navigate("/profile");
  };
  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 mb-10 text-center text-4xl font-bold leading-9 tracking-tight light-green-text"
        style={{color: "#C0EB8F"}}>
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="space-y-4" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 green-text"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                required
                className="block w-full rounded-md border-0 py-2 bg-slate-200 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                value={credentials.username} 
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 green-text"
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
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              className="flex w-full mt-12 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{backgroundColor:"#6B4A60"}}
              onClick={signin}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
