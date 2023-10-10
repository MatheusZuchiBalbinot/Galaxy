import { useEffect } from "react";
import { useSocket } from "../../../../context/socketContext";

const Messages = ({ room }) => {

	const socket = useSocket()

	useEffect(() => {

		console.log("INFINITO???????")

		socket.on('receive-message', (senderMessage) => {

			const {sender, message, date} = senderMessage

			console.log(`Recebido uma mensagem na sala ${room}: ${message}, ${sender}`);
		});
		  
	}, [socket]);

	return (
		<h2>Messages</h2>
	);
};

export default Messages;