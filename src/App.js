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
import { Edit } from "./pages/Profile/edit";
import Navigation from "./components/Navigation";
import { Login } from "./pages/LogIn";
import { Details } from "./pages/Details";
import { Signup } from "./pages/SignUp";

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
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <Navigation />
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* <div className="col-3 bg-black"><Navigation /></div> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<Edit />} />
              <Route path="/details" element={<Details />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
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
