import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { userDataContext } from "../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, setUserData } = useContext(userDataContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/signin");
  };

  return (
    <div className="sticky top-0 z-50
      bg-gradient-to-r from-[#0f172a]/80 via-[#111827]/80 to-[#0b1120]/80
      backdrop-blur-xl
      border-b border-white/10">

      <div className="max-w-7xl mx-auto px-10 py-4 flex justify-between items-center">

        {/* Logo */}
        <div
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer select-none"
        >
          <h1 className="text-2xl font-bold tracking-tight
            bg-gradient-to-r from-blue-400 to-purple-500
            bg-clip-text text-transparent">
            CollabDocs
          </h1>
        </div>

        {/* Right Section */}
        {userData && (
          <div className="flex items-center gap-6">

            {/* Page Indicator */}
            <div className="hidden md:block text-sm text-gray-400">
              {location.pathname.includes("document")
                ? "Editor"
                : "Dashboard"}
            </div>

            {/* User Chip */}
            <div className="flex items-center gap-3
              px-4 py-2 rounded-xl
              bg-white/5 backdrop-blur-xl
              border border-white/10">

              <div className="w-8 h-8 rounded-full
                bg-gradient-to-r from-blue-500 to-purple-600
                flex items-center justify-center
                text-sm font-semibold">
                {userData.name?.charAt(0).toUpperCase()}
              </div>

              <span className="text-gray-300 text-sm">
                {userData.name}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-xl text-sm font-medium
              bg-white/5 border border-white/10
              hover:border-purple-500/40
              hover:bg-white/10
              transition-all duration-300"
            >
              Logout
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
