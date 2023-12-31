import { useContext, useState, useEffect } from "react";

import { userContext } from '../../context/userContext';
import { useSocket } from "../../context/socketContext";

import axios from 'axios'

import { Divider } from '@chakra-ui/react'

import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Messages from "./Components/Messages/Messages";
import AnotherChats from "./Components/AnotherChats/AnotherChats";

import styles from './Chat.module.css'

const Chat = () => {

	const socket = useSocket();

	const {actualOpenedChat, token } = useContext(userContext);

	const [currentConversationInfo, setCurrentConversationInfo] = useState()

	const [chatInputContent, setChatInputContent] = useState()

	// console.log(actualOpenedChat)

	useEffect(() => {

		const config = {
			headers: {
				'Authorization': `Bearer ${token}`,
			},
		};

		const getChatUserInfo = async () => {

            try {
                const result = await axios.get(`http://localhost:3000/v1/chat/getCurrentConversationInfo/${actualOpenedChat}`, config)
                setCurrentConversationInfo(result.data.getAnotherPersonChatInfo);
            } catch(error) {
                console.log(error)
            }
		}

		getChatUserInfo()
	}, [actualOpenedChat])

	const sendMessage = (messageContent) => {
		const roomName = `friendship_${actualOpenedChat}`;
		const actualDate = new Date()
		socket.emit('send-message', { room: roomName, message: messageContent, date: actualDate, sender: token});
	};

	return (
		<div className={styles.mainChat}>
			<div className={styles.anotherChats}>
				<AnotherChats />
			</div>
			<div className={styles.actualChat}>
				<div className={styles.Header}>
					<Header anotherUserInfo={currentConversationInfo}/>
					<Divider orientation='horizontal' />
				</div>
				<div className={styles.MessagesChat}>
					<Messages room={`friendship_${actualOpenedChat}`}/>
				</div>
				<div className={styles.InputChat}>
					<Divider orientation='horizontal' />
					<Footer sendMessage={sendMessage} />
				</div>
			</div>
		</div>
	);
};

export default Chat;