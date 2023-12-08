import { Link, useLocation } from "react-router-dom";
import { FaHome, FaSearch, FaUserCircle, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import porkify from "./porkify-logo.png";
import "./index.css";

function Navigation() {
  const links_logged_in = ["Home", "Profile", "Search"];
  const links_not_logged_in = [
    "HOME",
    "LOG IN",
    "CREATE ACCOUNT",
    "PROFILE",
    "SEARCH",
  ];
  const { pathname } = useLocation();
  const { user } = useAuth();

  if (!user) {
    return (
      <div class="container porkify-navigation">
        <div className="row">
          <div className="porkify-nav-heading p-flex-row-container d-flex align-items-start col-md-6">
            <img
              className="d-none d-md-block"
              src={porkify}
              style={{ width: 40 }}
              alt="porkify logo"
            />
            &nbsp;
            <Link to={`/Home`} className="d-none d-md-block">
              <h1>PORKIFY</h1>
            </Link>
          </div>
          <div className="p-nav-bar list-group list-group-horizontal d-flex align-items-start col-md-6 justify-content-end">
            {links_not_logged_in.map((link, index) => (
              <Link
                key={index}
                to={`/${link}`}
                className={`list-group-item border-0 ${
                  pathname.includes(link) && "active"
                }`}
                style={{ whiteSpace: "nowrap" }}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div class="container porkify-navigation">
        <div className="row">
          <div className="porkify-nav-heading p-flex-row-container d-flex align-items-start col-md-4">
            <img src={porkify} style={{ width: 40 }} alt="porkify logo" />
            &nbsp;
            <h1>Porkify</h1>
          </div>
          <div className="p-nav-bar list-group list-group-horizontal d-flex align-items-end col-md-8 justify-content-end">
            {links_logged_in.map((link, index) => (
              <Link
                key={index}
                to={`/${link}`}
                className={`list-group-item ${
                  pathname.includes(link) && "active"
                }`}
                style={{ whiteSpace: "nowrap" }}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Navigation;
