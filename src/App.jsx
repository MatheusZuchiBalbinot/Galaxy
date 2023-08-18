import { useRoutes } from "react-router-dom";

import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import { useState } from "react";

import {userContext} from './context/userContext.jsx'

function App() {

  const [isLogged, setIsLogged] = useState(false)

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
    }
  ])

  return (
    <userContext.Provider value={{isLogged, setIsLogged}} className="App">
      {routes}
    </userContext.Provider>
)
}

export default App
