import { Link, useLocation } from "react-router-dom";
import { FaHome, FaSearch, FaUserCircle, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import porkify from "./porkify.png";
import "./index.css";

function Navigation() {
  const links_logged_in = [
    { name: "Home", route: "home" },
    { name: "profile", route: "profile" },
    { name: "Search", route: "search" },
  ];
  const links_not_logged_in = [
    { name: "Home", route: "home" },
    { name: "Log In", route: "login" },
    { name: "Create Account", route: "signup" },
    { name: "Profile", route: "profile" },
    { name: "Search", route: "search" },
  ];
  const { pathname } = useLocation();
  const { user } = useAuth();

  if (!user) {
    return (
      <div class="container porkify-navigation">
        <div className="p-flex-row-container">
          <div className="p-flex-row-container d-flex align-items-start col-4">
            <img src={porkify} style={{ width: 40 }} />
            <h1>Porkify</h1>
          </div>
          <div className="list-group list-group-horizontal d-flex align-items-end col-8">
            {links_not_logged_in.map((link, index) => (
              <Link
                key={index}
                to={`/${link.route}`}
                className={`list-group-item ${
                  pathname.includes(link) && "active"
                }`}
                style={{ whiteSpace: "nowrap" }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div class="container porkify-navigation">
        <div className="p-flex-row-container">
          <h1>Porkify</h1>
          <div className="list-group list-group-horizontal">
            {links_logged_in.map((link, index) => (
              <Link
                key={index}
                to={`/${link.route}`}
                className={`list-group-item ${
                  pathname.includes(link) && "active"
                }`}
                style={{ whiteSpace: "nowrap" }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Navigation;
