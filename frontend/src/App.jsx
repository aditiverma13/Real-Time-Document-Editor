
// import React, { useContext } from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import SignUp from './pages/SignUp'
// import SignIn from './pages/SignIn'
// import Customize from './pages/Customize'
// import { userDataContext } from './context/UserContext'
// import Home from './pages/Home'
// import Customize2 from './pages/Customize2'

// function App() {
//   const {userData,setUserData}=useContext(userDataContext)
//   return (
//    <Routes>
//      <Route path='/' element={(userData?.assistantImage && userData?.assistantName)? <Home/> :<Navigate to={"/customize"}/>}/>
//     <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
//      <Route path='/signin' element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>
//       <Route path='/customize' element={userData?<Customize/>:<Navigate to={"/signup"}/>}/>
//        <Route path='/customize2' element={userData?<Customize2/>:<Navigate to={"/signup"}/>}/>
//    </Routes>
//   )
// }

// export default App

import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Editor from './pages/Editor';
import { userDataContext } from './context/UserContext.jsx';

function App() {
  const { userData } = useContext(userDataContext);

  return (
    <Routes>

      {/* Home Redirect */}
      <Route
        path="/"
        element={
          userData
            ? <Navigate to="/document/new" />
            : <Navigate to="/signin" />
        }
      />

      {/* Auth Routes */}
      <Route
        path="/signup"
        element={
          !userData
            ? <SignUp />
            : <Navigate to="/" />
        }
      />

      <Route
        path="/signin"
        element={
          !userData
            ? <SignIn />
            : <Navigate to="/" />
        }
      />

      {/* Real-Time Editor */}
      <Route
        path="/document/:id"
        element={
          userData
            ? <Editor />
            : <Navigate to="/signin" />
        }
      />

    </Routes>
  );
}

export default App;






