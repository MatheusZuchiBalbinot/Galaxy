import {TextInput} from '../../../ElementComponents/Input/TextInput' 

import {AiOutlineSend} from 'react-icons/ai'

import styles from './Footer.module.css'

const Footer = () => {
	return (
		<div className={styles.sendMessage}>
			<TextInput 
				type={"text"} 
				maxLength={280} 
				onChange={(e) =>  handleAnswerChange(item._id, e.target.value)}
				placeholder={"Você viu o que está acontecendo na última semana?"}
			/>
			<div className={styles.sendMessage__div__icon} onClick={() => console.log("MANDEI")}>
				<AiOutlineSend />
			</div>
		</div>
	);
};

export default Footer;