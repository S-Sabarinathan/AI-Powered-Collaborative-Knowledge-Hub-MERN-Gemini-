import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/AI.png";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinkClasses = ({ isActive }) =>
    `block px-3 py-2 rounded hover:text-green-400 transition ${
      isActive ? "text-black font-semibold bg-green-100" : ""
    }`;

  return (
    <nav className="bg-blue-500 text-white px-6 py-3 flex justify-between items-center relative">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="AI Docs Logo" className="h-8 w-8" />
        <span className="text-xl font-bold">AI Documents</span>
      </Link>

      <div className="hidden md:flex gap-4 items-center">
        <NavLink to="/geminidocs" className={navLinkClasses}>
          Docs
        </NavLink>
        <NavLink to="/search" className={navLinkClasses}>
          Search
        </NavLink>

        {!user ? (
          <>
            <NavLink to="/login" className={navLinkClasses}>
              Login
            </NavLink>
            <NavLink to="/register" className={navLinkClasses}>
              Register
            </NavLink>
          </>
        ) : (
          <div className="relative group">
            <button className="px-3 py-2 rounded hover:bg-green-600 transition">
              Hi!, User
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <NavLink
                to="/dashboard"
                className="block px-4 py-2 hover:bg-green-200"
              >
                Dashboard
              </NavLink>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-blue-500 text-white flex flex-col md:hidden p-4 gap-2 z-10">
          <NavLink
            to="/geminidocs"
            className={navLinkClasses}
            onClick={toggleMenu}
          >
            Docs
          </NavLink>
          <NavLink to="/search" className={navLinkClasses} onClick={toggleMenu}>
            Search
          </NavLink>

          {!user ? (
            <>
              <NavLink
                to="/login"
                className={navLinkClasses}
                onClick={toggleMenu}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={navLinkClasses}
                onClick={toggleMenu}
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <span className="px-3 py-2">Hi, {user.username}</span>
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
              <NavLink
                to="/reset"
                className={navLinkClasses}
                onClick={toggleMenu}
              >
                Reset Password
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
