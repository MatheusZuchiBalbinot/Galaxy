import { useContext, useEffect, useState } from 'react';
import { userContext} from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

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

                const typeIndex = dataUrl.indexOf(':') + 1;
                const typeEndIndex = dataUrl.indexOf(';');
                const fileType = dataUrl.substring(typeIndex, typeEndIndex);
    
                if (fileType.includes('video/')) {
                    setUploadedFile({
                        video: true,
                        url: dataUrl
                    })
                } else if (fileType.includes('image/png')) {
                    setUploadedFile({
                        file: true,
                        url: dataUrl
                    })
                } 
                else {
                    console.log('Tipo de arquivo não suportado.');
                }
            };
    
            reader.readAsDataURL(inputFile.files[0]);
        }
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
                                <textarea 
                                    type='textarea' 
                                    rows={6}
                                    maxLength={280}
                                    className={styles.mainInput} 
                                    value={tweetText}
                                    onChange={(e) => setTweetText(e.target.value)}
                                    placeholder='No que está pensando?'
                                />
                                <div>
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
                                            <EmojiPicker 
                                                skinTonesDisabled={true} 
                                                autoFocusSearch={true} 
                                                onEmojiClick={(emoji) => handleEmoji(emoji)}
                                            />
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
                                    {console.log(uploadedFile)}
                                </div>
                                <div className={styles.tweetButton}>
                                    <button type='text'>Tweetar</button>
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