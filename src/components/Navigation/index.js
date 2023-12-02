import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const links = ["Home", "LogIn", "Profile", "Search"];
  const { pathname } = useLocation();
  return (
    <div className="list-group list-group-horizontal" style={{ width: 150 }}>
      {links.map((link, index) => (
        <Link
          key={index}
          to={`/Porkify/${link}`}
          className={`list-group-item ${pathname.includes(link) && "active"}`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
export default Navigation;
