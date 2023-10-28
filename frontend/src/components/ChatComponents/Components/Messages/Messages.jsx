import { useEffect, useContext, useState } from "react";

import { userContext } from '../../../../context/userContext';
import { useSocket } from "../../../../context/socketContext";

import styles from './Messages.module.css'

const Messages = ({ room }) => {
	const socket = useSocket();
	const [messages, setMessages] = useState({});

	const {actualOpenedChat, token } = useContext(userContext);

	useEffect(() => {

		socket.on('alreadyHave-messages', (allLocalMessages) => {
			// console.log("Esse é o token: ", token)

			// console.log("\n Esse é o socket.id: ",socket.id)

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

	const handleImageOrVideoInChat = (messageVideoOrImageContent) => {
		return (
			messageVideoOrImageContent.image 
				?
					<img 
						src={messageVideoOrImageContent.url}
						className={styles.chatImageAndVideo}
					/>
				:
					<video 
						controls 
						autoPlay 
						src={messageVideoOrImageContent.url}
						className={styles.chatImageAndVideo}
					/>
		)
	}

  	const generateChat = () => {
    	if (Object.keys(messages).length === 0) return <h2> Parece que não há um histórico de mensagens...</h2>;

		return messages[room].map((oneMessage, index) => {

			const { message, date, sender } = oneMessage;
			const {text, messageVideoOrImageContent} = message

			if(sender == token) {
				return (
					<div key={index} className={styles.itsMyMessage__div}>
						<p className={styles.itsMyMessage__div__p} >{text}</p>
						{ messageVideoOrImageContent && (handleImageOrVideoInChat(messageVideoOrImageContent))}
					</div>
				);
			} else {
				return (
					<div key={index} className={styles.isNotMyMessage__div}>
						<p className={styles.isNotMyMessage__div__p} >{text}</p>
						{ messageVideoOrImageContent && (handleImageOrVideoInChat(messageVideoOrImageContent))}
					</div>
				);
			}
		});
	};

  	return generateChat();
};

export default Messages;
