import { Link, useLocation } from "react-router-dom";
import { FaHome, FaSearch, FaUserCircle, FaSignInAlt } from "react-icons/fa";

function Navigation() {
  const links = ["Home", "LogIn", "Profile", "Search"];
  const icons = {
    Home: <FaHome />,
    LogIn: <FaSignInAlt />,
    Profile: <FaUserCircle />,
    Search: <FaSearch />,
  };
  const { pathname } = useLocation();
  return (
    <div className="list-group list-group-horizontal" style={{ width: 150 }}>
      {links.map((link, index) => (
        <Link
          key={index}
          to={`/${link}`}
          className={`list-group-item ${pathname.includes(link) && "active"}`}
        >
          <div class="flex align-items-center">
            {icons[link]}
            &nbsp;
            {link}
          </div>
        </Link>
      ))}
    </div>
  );
}
export default Navigation;
