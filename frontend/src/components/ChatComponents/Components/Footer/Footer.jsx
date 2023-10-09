import { useState } from 'react';
import { TextInput } from '../../../ElementComponents/Input/TextInput';
import { AiOutlineSend } from 'react-icons/ai';
import styles from './Footer.module.css';

const Footer = ({ sendMessage }) => {
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim() !== '') { 
      sendMessage(messageText);
      setMessageText('');
    }
  };

  return (
    <div className={styles.sendMessage}>
      <TextInput
        type={"text"}
        maxLength={280}
        placeholder={"Você viu o que está acontecendo na última semana?"}
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <div className={styles.sendMessage__div__icon} onClick={handleSendMessage}>
        <AiOutlineSend />
      </div>
    </div>
  );
};

export default Footer;