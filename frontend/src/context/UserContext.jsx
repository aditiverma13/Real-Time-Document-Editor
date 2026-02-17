import React, { createContext, useState } from "react";

export const userDataContext = createContext();

function UserContext({ children }) {

  // ✅ Keep ONLY ONE server URL
  const serverUrl = "http://localhost:5000";
  // const serverUrl = "https://virtual-assistant-backend-u4ax.onrender.com";

  const [userData, setUserData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);

  return (
    <userDataContext.Provider
      value={{
        userData,
        setUserData,
        frontendImage,
        setFrontendImage,
        serverUrl
      }}
    >
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;

