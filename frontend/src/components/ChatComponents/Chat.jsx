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

	const {actualOpenedChat, isLogged } = useContext(userContext);

	console.log(actualOpenedChat)

	const {token} = isLogged

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
					<Messages />
				</div>
				<div className={styles.InputChat}>
					<Divider orientation='horizontal' />
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default Chat;