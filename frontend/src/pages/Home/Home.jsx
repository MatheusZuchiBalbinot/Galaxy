import { useContext, useEffect, useState, useRef } from 'react';
import { userContext} from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import {BsFillPersonFill, BsEmojiSmile} from 'react-icons/bs'
import {HiOutlinePhotograph} from 'react-icons/hi'

import EmojiPicker from 'emoji-picker-react';

import logo from '../../assets/logo.png'

import styles from './Home.module.css'

import UserRightComponents from '../../components/HomeComponents/AsideRightComponent/RightUserMenu/UserRightComponent'
import Menu from '../../components/HomeComponents/AsideLeftComponent/Menu.jsx'

export default function Home() {

    const {isLogged, setIsLogged} = useContext(userContext)

    const {nickName, passwordsMatch} = isLogged

    const [tweetText, setTweetText] = useState('')

    const [showEmojiScreen, setShowEmojiScreen] = useState(false)

    const [uploadedFile, setUploadedFile] = useState({});

    const navigate = useNavigate()

    useEffect(() => {
        if(passwordsMatch == false) {
            setIsLogged({passwordsMatch: false, nickName: ''})
            return navigate("/")
        }
    }, [isLogged])

    const handleEmoji = (emoji) => {
        setShowEmojiScreen(false)
        setTweetText((prevState) => prevState + String.fromCodePoint(`0x${emoji.unified}`));

        {/* <p> <span> &#x1F600; </span> </p> */}
    }

    const handleFileUpload = (file) => {
        const inputFile = file.target;

        if (inputFile.files && inputFile.files[0]) {
            const reader = new FileReader();
    
            reader.onload = function (e) {
                const dataUrl = e.target.result;
                console.log(dataUrl)

                const typeIndex = dataUrl.indexOf(':') + 1;
                const typeEndIndex = dataUrl.indexOf(';');
                const fileType = dataUrl.substring(typeIndex, typeEndIndex);
    
                if (fileType.includes('video/')) {
                    setUploadedFile({
                        video: true,
                        url: dataUrl
                    })
                } else if (fileType.includes('image/png') || fileType.includes('image/jng')) {
                    setUploadedFile({
                        file: true,
                        url: dataUrl
                    })
                } 
                else {
                    throw ('Tipo de arquivo não suportado.');
                }
            };
    
            reader.readAsDataURL(inputFile.files[0]);
        }
    }

    const handleTweetSubmit = async () => {

        const actualDate = new Date();
        const hours = actualDate.getHours();
        const minutes = actualDate.getMinutes();
        const days = actualDate.getDate();
        const month = actualDate.getMonth() + 1;
        const year = actualDate.getFullYear();

        const tweetData = {
            nickName,
            userId: '',
            likes: 0,
            content: {
                text: tweetText,
                image: uploadedFile.file ? uploadedFile.url : null,
                video: uploadedFile.video ? uploadedFile.url : null,
            }, 
            actualDate: {
                hours,
                minutes,
                days,
                month,
                year
            },
            comments: {}
        }

        try {
            console.log(tweetData)
            const result = await axios.post("http://localhost:3000/user/tweet", tweetData);
            console.log(result)
        } catch(error) {
            console.log(error)
        }
 
        console.log(tweetData.content)
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.asideLeft}>
                <div className={styles.appLogo}>
                    <div className={styles.leftLogo}>
                        <img src={logo} className={styles.logoImage}/>
                    </div>
                </div>
                <div className={styles.menu}>
                    <Menu />
                </div>
            </div>

            <div className={styles.asideRight}>
                <UserRightComponents />
            </div>

            <div className={styles.main}>
                <div className={styles.postDiv}>
                    <div className={styles.inputAvatar}>
                        <BsFillPersonFill />
                    </div>
                    <div className={styles.mainInputDiv}>
                        <div className={styles.inpuItemsDiv}>
                            <div className={styles.inputBar}>
                                <div className={styles.inputBar__textarea}>
                                    <textarea 
                                        type='textarea' 
                                        rows={8}
                                        maxLength={280}
                                        className={styles.mainInput} 
                                        value={tweetText}
                                        onChange={(e) => setTweetText(e.target.value)}
                                        placeholder='No que está pensando?'
                                    />
                                </div>
                                <div className={styles.inputBar__videoAndImage}>
                                    {uploadedFile.file && (
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
                                        <HiOutlinePhotograph 
                                            onClick={() => document.getElementById('inputFile').click()}
                                        />
                                        <input
                                            type="file"
                                            id="inputFile"
                                            style={{ display: 'none' }}
                                            onChange={(file) => handleFileUpload(file)}
                                        />
                                    </div>
                                    {/* {console.log(uploadedFile)} */}
                                </div>
                                <div className={styles.tweetButton}>
                                    <button type='text' onClick={handleTweetSubmit}>Tweetar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.tweetsDiv}>

                </div>
            </div>
        </div>
    )
}