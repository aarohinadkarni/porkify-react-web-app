import "./index.css"

export function Signup() {
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
                type="username"
                autoComplete="username"
                required
                className="block w-full rounded-md border-0 py-2 bg-slate-200 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
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
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="sign-up-button flex w-full mt-12 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{backgroundColor:"#6B4A60"}}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
