import { useState } from 'react';

import { ChatInput } from '../../../ElementComponents/Input/ChatInput/ChatInput';

import styles from './Footer.module.css';

const Footer = ({ sendMessage }) => {

	const [chatText, setChatText] = useState('')
	const [showEmojiScreen, setShowEmojiScreen] = useState(false)
    const [uploadedFile, setUploadedFile] = useState({});

	const handleChange = (e) => {
        setChatText(e.target.value);
    };

	const handleEmoji = (emoji) => {
        setShowEmojiScreen(false)
        setChatText((prevState) => prevState + String.fromCodePoint(`0x${emoji.unified}`));
    }

	const handleChatInputSubmit = () => {

		const messageHasVideoOrImage = Object.keys(uploadedFile).length !== 0;

		let messageVideoOrImageContent;

		if(messageHasVideoOrImage) {
			uploadedFile.video 
				? 
					messageVideoOrImageContent = {
						video: true,
						url: uploadedFile.url,
					} 
				: 
					messageVideoOrImageContent = {
						image: true,
						url: uploadedFile.url,
					}

				const chatComment = {
					text: chatText,
					messageVideoOrImageContent
				}

				sendMessage(chatComment)
		} else {
			const chatComment = {
				text: chatText,
			}

			sendMessage(chatComment)
		}

		setChatText('')
		setUploadedFile({})
	}

  	return (
    	<div className={styles.sendMessage}>
			<ChatInput
				setUploadedFile={setUploadedFile}
				uploadedFile={uploadedFile}
				chatText={chatText}
				handleChange={handleChange}
				setShowEmojiScreen={setShowEmojiScreen}
				showEmojiScreen={showEmojiScreen}
				handleEmoji={handleEmoji}
				handleTweetSubmit={handleChatInputSubmit}
			/>
    	</div>
  	);
};

export default Footer;