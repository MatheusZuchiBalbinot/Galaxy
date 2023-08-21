import { useRoutes } from "react-router-dom";
import { useState } from "react";

import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Home from './pages/Home/Home.jsx'

import {userContext} from './context/userContext.jsx'

function App() {

  const [isLogged, setIsLogged] = useState({passwordsMatch: false, nickName: ''})

  const routes = useRoutes([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '*',
      element: <Login />
    }, 
    {
      path: '/home',
      element: <Home />
    }
  ])

  return (
    <userContext.Provider value={{isLogged, setIsLogged}} className="App">
      {routes}
    </userContext.Provider>
)
}

export default App
