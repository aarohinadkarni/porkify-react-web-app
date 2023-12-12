import { Link, useLocation } from "react-router-dom";
import { FaHome, FaSearch, FaUserCircle, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import porkify from "./porkify-dark-mode.png";
import "./index.css";
import { Popover } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

function Navigation() {
  const links_logged_in = [
    { name: "HOME", route: "home" },
    { name: "PROFILE", route: "profile" },
    { name: "SEARCH", route: "search" },
  ];
  const links_not_logged_in = [
    { name: "HOME", route: "home" },
    { name: "LOG IN", route: "login" },
    { name: "CREATE ACCOUNT", route: "signup" },
    { name: "SEARCH", route: "search" },
  ];
  const { pathname } = useLocation();
  const { user } = useAuth();

  function ChevronUpIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <path
          d="M17 14l-5-5-5 5"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  function MenuIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <path
          d="M5 6h14M5 18h14M5 12h14"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  function MobileNavLink({ children, to }) {
    return (
      <Link to={`/${to}`} className=" no-underline">
        <Popover.Button className="block text-base py-2 leading-7 no-underline font-semibold tracking-tight" style={{color:"#EB8FCC"}}>
          {children}
        </Popover.Button>
      </Link>
    );
  }

  if (!user) {
    return (
      <div className="container porkify-navigation">
        <div className="row">
          <div className="porkify-nav-heading h-0 sm:h-auto p-flex-row-container d-flex align-items-start col-md-6 col-12">
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
          <div className=" hidden h-0 sm:h-auto lg:flex p-nav-bar lg:gap-6 align-items-start col-md-6 col-12 justify-content-end">
            {links_not_logged_in.map((link, index) => (
              <Link
                key={index}
                to={`/${link.route}`}
                className={`list-group-item border-0 pb-1 ${
                  pathname.includes(link) && "active"
                }`}
                style={{ whiteSpace: "nowrap" }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="lg:hidden flex justify-between align-middle">
            <img
              className=""
              src={porkify}
              style={{ width: 40 }}
              alt="porkify logo"
            />
            <Popover className="mr-2 justify-center items-center flex">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 ui-not-focus-visible:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )
                    }
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
                        />
                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-24 shadow-2xl shadow-gray-900/20"
                          style={{backgroundColor:"#333333"}}
                        >
                          <div className="space-y-4">
                            {links_not_logged_in.map((link, index) => (
                              <MobileNavLink key={index} to={link.route}>
                                {link.name}
                              </MobileNavLink>
                            ))}
                          </div>
                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div class="container porkify-navigation">
        <div className="row">
          <div className=" md:block porkify-nav-heading p-flex-row-container d-flex align-items-start col-md-6 col-12">
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
          <div className=" hidden h-0 sm:h-auto lg:flex p-nav-bar lg:gap-6 align-items-start col-md-6 col-12 justify-content-end">
            {links_logged_in.map((link, index) => (
              <Link
                key={index}
                to={`/${link.route}`}
                className={`list-group-item border-0 pb-1 ${
                  pathname.includes(link) && "active"
                }`}
                style={{ whiteSpace: "nowrap" }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="lg:hidden flex justify-between align-middle">
            <img
              className=""
              src={porkify}
              style={{ width: 40 }}
              alt="porkify logo"
            />
            <Popover className="mr-2 justify-center items-center flex">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 ui-not-focus-visible:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )
                    }
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
                        />
                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-24 shadow-2xl shadow-gray-900/20"
                        >
                          <div className="space-y-4">
                            {links_logged_in.map((link, index) => (
                              <MobileNavLink key={index} to={link.route}>
                                {link.name}
                              </MobileNavLink>
                            ))}
                          </div>
                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
    );
  }
}
export default Navigation;
