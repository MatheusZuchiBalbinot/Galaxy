import { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'; // Importe o método v4 do pacote uuid

import { userContext } from './context/userContext.jsx';

import { useSocket } from './context/socketContext.jsx';
import { SocketProvider } from './context/socketContext.jsx';

import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Home from './pages/Home/Home.jsx';
import Profile from "./pages/Profile/Profile.jsx";

function App() {

  const [actualTweetSeletor, setActualTweetSeletor] = useState({ actualSeletor: 'orderByRecent' });
  const [actualOpenedChat, setActualOpenedChat] = useState('');

  const sessionId = uuidv4();

  const [token, setToken] = useState(localStorage.getItem(`jwt_token_${sessionId}`));

	useEffect(() => {

		if (token) {
			localStorage.setItem(`jwt_token_${sessionId}`, token);
		} else {
			localStorage.removeItem(`jwt_token_${sessionId}`);
		}

	}, [token]);

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
	]);

  return (
    	<userContext.Provider value={{ token, setToken, actualTweetSeletor, setActualTweetSeletor, actualOpenedChat, setActualOpenedChat }}>
      		<SocketProvider>
        		{routes}
      		</SocketProvider>
    	</userContext.Provider>
  	);
}

export default App;
