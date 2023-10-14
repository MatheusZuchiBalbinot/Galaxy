import Avatar from "../../Avatar/Avatar"
import FileUploadButton from "../../FileUploadButton/FileUploadButton";
import { TextAreaInput } from "../TextInput/TextInput"
import EmojiPicker from 'emoji-picker-react';

import {BsEmojiSmile} from 'react-icons/bs'

import styles from './TweetInput.module.css'

export const TweetInput = ({
        setUploadedFile,
        uploadedFile,
        userInfo, 
        chatText, 
        handleChange, 
        handleInput, 
        setShowEmojiScreen, 
        showEmojiScreen, 
        handleEmoji,
        handleTweetSubmit,
}) => {
    return (
        <>
            <div className={styles.inputAvatar}>
                {userInfo && (
                    <Avatar userInfo={userInfo} size={'small'}/>
                )}
            </div>
            <div className={styles.mainInputDiv}>
                <div className={styles.inpuItemsDiv}>
                    <div className={styles.inputBar}>
                        <div className={styles.inputBar__textarea}>
                        <TextAreaInput 
                            value={chatText} 
                            rows={8} 
                            id={'tweetInput'}
                            onChange={handleChange} 
                            maxLength={280}
                            onInput={handleInput}
                        />
                        </div>
                        <div className={styles.inputBar__videoAndImage}>
                            {uploadedFile.image && (
                                <img
                                    src={uploadedFile.url}
                                    alt="Uploaded"
                                    className={styles.uploadedImageStyle}
                                />
                            )}
                            {uploadedFile.video && (
                                <video 
                                    src={uploadedFile.url} 
                                    controls autoplay 
                                    className={styles.uploadedVideoStyle}
                                />
                            )}
                        </div>
                    </div>
                    <div className={styles.bottomTweetDiv}>
                        <div className={styles.imageVideoEmojiIcons}>
                            <div className={styles.imageVideoEmojiIcons__div}>
                                <BsEmojiSmile onClick={() => setShowEmojiScreen(true)}/>
                                {showEmojiScreen && (
                                    <div style={{position: 'absolute', margin: '3vw'}}>
                                        <EmojiPicker 
                                            skinTonesDisabled={true} 
                                            autoFocusSearch={true} 
                                            className={styles.emojiPickerStyle}
                                            onEmojiClick={(emoji) => handleEmoji(emoji)}
                                        />
                                    </div>
                                )}
                                <FileUploadButton 
                                    uploadedFile={uploadedFile} 
                                    setUploadedFile={setUploadedFile} 
                                    styleOfButton={"small"}
                                />
                            </div>
                        </div>
                        <div className={styles.tweetButton}>
                            <button type='text' onClick={() => handleTweetSubmit()}>Tweetar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}