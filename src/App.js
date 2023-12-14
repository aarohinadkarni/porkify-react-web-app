import "./App.css";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { useLoaderData, useOutlet } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { useAuth } from "./hooks/useAuth";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Profile } from "./pages/Profile";
import { UserTable } from "./pages/UserTable";
import { Edit } from "./pages/Profile/edit";
import Navigation from "./components/Navigation";
import { Login } from "./pages/LogIn";
import { Details } from "./pages/Details";
import { Signup } from "./pages/SignUp";
import { useEffect } from "react";
import { getToken } from "./pages/spotifyClient";

export const AuthLayout = () => {
  const outlet = useOutlet();

  return <AuthProvider>{outlet}</AuthProvider>;
};

// To be used for routes that require authentication (i.e profile?)
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  useEffect(() => {
    async function fetchToken() {
      const token = localStorage.getItem("token");

      if (!token) {
        const token = await getToken();
        localStorage.setItem("token", JSON.stringify(token));
      } else {
        // refresh token if needed
        const token = JSON.parse(localStorage.getItem("token"));
      }
    }
    fetchToken();
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <Navigation />
          <div className="mx-auto max-w-7xl container">
            {/* <div className="col-3 bg-black"><Navigation /></div> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/profile/edit/:id" element={<Edit />} />
              <Route path="/details" element={<Details />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<UserTable />} />
              {/* <Route
                path="/"
                element={<Navigate to="/project/napster-search" />}
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/account" element={<Account />} />
              <Route path="/napster-search" element={<NapsterSearch />} />
              <Route path="/napster-album/:id" element={<NapsterAlbum />} />
              <Route
                path="/users"
                element={
                  <ProtectedAdminRoute>
                    <UserList />
                  </ProtectedAdminRoute>
                }
              />
              <Route path="/users/:id" element={<UserDetails />} /> */}
            </Routes>
          </div>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
