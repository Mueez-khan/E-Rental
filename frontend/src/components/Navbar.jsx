import React, { useState } from 'react';
import { Link, matchPath, useNavigate } from 'react-router-dom';
import { NavbarLinks } from './data/navbar-link'; // Ensure this path is correct
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/slices/authSlice";
import { removeUser } from "../redux/slices/profileSlice";
import { IoMdMenu, IoMdClose } from "react-icons/io";  // Import icons for the menu

export default function Navbar() {
  const catalog = 'Catalog';
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track mobile menu visibility

  // Match current path to the link path
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // Logout function
  const logoutFun = () => {
    dispatch(logout()); // Clear token from Redux and localStorage
    dispatch(removeUser()); // Clear user from Redux and localStorage
    navigate("/login");
  };

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-richblack-800 p-4">
      <div className="flex justify-between items-center max-w-maxContent mx-auto">
        
        {/* Brand Name */}
        <Link to="/" className="text-lg text-richblack-25 font-bold">
          E_Rental
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex">
          <ul className="flex gap-x-6 text-yellow-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === catalog ? null : ( // Render null instead of a div for cleanliness
                  <Link to={link?.path}>
                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-yellow-25 text-3xl">
            {isMenuOpen ? <IoMdClose /> : <IoMdMenu />} {/* Show close or menu icon */}
          </button>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isMenuOpen && (
          <nav className="lg:hidden absolute top-16 left-0 w-full bg-richblack-800 p-4">
            <ul className="flex flex-col gap-y-4 text-yellow-25">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link?.path} onClick={toggleMenu}> {/* Close the menu after clicking */}
                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                      {link.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Login, Signup, Dashboard, and Logout buttons */}
        <div className="hidden lg:flex gap-x-4 items-center">
          {user && token ? (
            <>
              {/* Create Plot button for Owner */}
              {user?.accountType === "Owner" && (
                <Link to="/createPlot">
                  <button className="border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 rounded-md text-xs md:text-sm lg:text-base">
                    Create Plot
                  </button>
                </Link>
              )}

              {/* Dashboard button for logged-in users */}
              {user?._id && (
                <Link to={`/dashboard/${user._id}`}>
                  <button className="border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 rounded-md text-xs md:text-sm lg:text-base">
                    Go to Dashboard
                  </button>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 rounded-md text-xs md:text-sm lg:text-base">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 rounded-md text-xs md:text-sm lg:text-base">
                  Sign Up
                </button>
              </Link>
            </>
          )}

          {token && (
            <button
              onClick={logoutFun}
              className="border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 rounded-md text-xs md:text-sm lg:text-base"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
