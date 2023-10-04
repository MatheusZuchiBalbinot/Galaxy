import { useState } from "react";

import { Divider } from '@chakra-ui/react'

import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Messages from "./Components/Messages/Messages";

import styles from './Chat.module.css'

const Chat = () => {
	return (
		<div className={styles.mainChat}>
			<div className={styles.anotherChats}>
				<h2>Teste</h2>
			</div>
			<div className={styles.actualChat}>
				<div className={styles.Header}>
					<Header />
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