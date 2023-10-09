import { useContext, useState } from 'react'

import { useSocket } from '../../../../context/socketContext'
import { userContext } from '../../../../context/userContext';

import {TextInput} from '../../../ElementComponents/Input/TextInput' 

import {AiOutlineSend} from 'react-icons/ai'

import styles from './Footer.module.css'

const Footer = () => {

	const [chatMessage, setChatMessage] = useState()

	const {actualOpenedChat, isLogged } = useContext(userContext);

	const socket = useSocket();

	const handleChatMessage = (e) => {
		
	}

	return (
		<div className={styles.sendMessage}>
			<TextInput 
				type={"text"} 
				maxLength={280} 
				onChange={(e) =>  handleChatMessage(e)}
				placeholder={"Você viu o que está acontecendo na última semana?"}
			/>
			<div className={styles.sendMessage__div__icon} onClick={() => console.log("MANDEI")}>
				<AiOutlineSend />
			</div>
		</div>
	);
};

export default Footer;