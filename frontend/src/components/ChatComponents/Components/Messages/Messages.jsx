import { useEffect, useContext, useState } from "react";

import { userContext } from '../../../../context/userContext';
import { useSocket } from "../../../../context/socketContext";

import styles from './Messages.module.css'

const Messages = ({ room }) => {
	const socket = useSocket();
	const [messages, setMessages] = useState({});

	const {actualOpenedChat, isLogged } = useContext(userContext);
	const {token} = isLogged

	useEffect(() => {

		socket.on('alreadyHave-messages', (allLocalMessages) => {
			console.log(allLocalMessages)
			setMessages(allLocalMessages);
		})

		socket.on('receive-message', (senderMessage) => {

			console.log(senderMessage)
			
			setMessages((prevMessages) => {
				const updatedMessages = { ...prevMessages };
				if (updatedMessages[room]) {
					updatedMessages[room].push(senderMessage);
				} else {
					updatedMessages[room] = [senderMessage];
				}
				return updatedMessages;
			});
		});
  	}, [socket, room]);

  	const generateChat = () => {
    	if (Object.keys(messages).length !== 0) {
      		return messages[room].map((oneMessage, index) => {
        		const { message, date, sender } = oneMessage;
				if(sender == token) {
					return (
						<div key={index} className={styles.itsMyMessage__div}>
							<p className={styles.itsMyMessage__div__p} >{message}</p>
						</div>
					);
				} else {
					return (
						<div key={index} className={styles.isNotMyMessage__div}>
							<p className={styles.isNotMyMessage__div__p} >{message}</p>
						</div>
					);
				}
      		});
		} else {
			return <h2> Parece que não há um histórico de mensagens...</h2>;
		}
  	};

  	return generateChat();
};

export default Messages;
