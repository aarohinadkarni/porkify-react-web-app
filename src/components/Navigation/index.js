import { Link, useLocation } from "react-router-dom";
import { FaHome, FaSearch, FaUserCircle, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import porkify from './porkify.png';
import "./index.css";

function Navigation() {
  const links_logged_in = ["Home", "Profile", "Search"];
  const links_not_logged_in = ["Home", "Log In", "Create Account", "Profile", "Search"];
  const { pathname } = useLocation();
  const { user } = useAuth();

  if (!user) {
    return (
      <div class="container porkify-navigation">
        <div className="row">
          <div className="p-flex-row-container d-flex align-items-start col-md-4">
            <img src={porkify}
                style={{width:40}}
                alt="porkify logo"
            />
            &nbsp;
            <h1>Porkify</h1>
          </div>
        <div className="list-group list-group-horizontal d-flex align-items-start col-md-8">
          {links_not_logged_in.map((link, index) => (
            <Link
              key={index}
              to={`/${link}`}
              className={`list-group-item ${pathname.includes(link) && "active"}`}
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
          <div className="p-flex-row-container d-flex align-items-start col-md-4">
            <img src={porkify}
                style={{width:40}}
                alt="porkify logo"
            />
            &nbsp;
            <h1>Porkify</h1>
          </div>
        <div className="list-group list-group-horizontal d-flex align-items-end col-md-8">
          {links_logged_in.map((link, index) => (
            <Link
              key={index}
              to={`/${link}`}
              className={`list-group-item ${pathname.includes(link) && "active"}`}
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
