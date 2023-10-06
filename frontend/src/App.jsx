import { useRoutes } from "react-router-dom";
import { useState } from "react";

import {userContext} from './context/userContext.jsx'

import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Home from './pages/Home/Home.jsx'
import Profile from "./pages/Profile/Profile.jsx";

function App() {

  const [isLogged, setIsLogged] = useState({passwordsMatch: false, token: ''})
  const [actualTweetSeletor, setActualTweetSeletor] = useState({actualSeletor: 'orderByRecent'})
  const [actualOpenedChat, setActualOpenedChat] = useState()

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
    },
    {
      path: '/user/profile',
      element: <Profile />
    },
  ])

	return (
		<userContext.Provider value={{isLogged, setIsLogged, actualTweetSeletor, setActualTweetSeletor, actualOpenedChat, setActualOpenedChat}} className="App">
			{routes}
		</userContext.Provider>
	)
}

export default App
