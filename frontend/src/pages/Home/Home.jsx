import { useContext, useEffect, useState } from 'react';
import { userContext} from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

import {BsFillPersonFill, BsEmojiSmile} from 'react-icons/bs'
import {HiOutlinePhotograph} from 'react-icons/hi'

import EmojiPicker from 'emoji-picker-react';
import { SkinTones } from 'emoji-picker-react';

import logo from '../../assets/logo.png'

import styles from './Home.module.css'

import UserRightComponents from '../../components/HomeComponents/AsideRightComponent/RightUserMenu/UserRightComponent'
import Menu from '../../components/HomeComponents/AsideLeftComponent/Menu.jsx'

export default function Home() {

    const {isLogged, setIsLogged} = useContext(userContext)

    const {nickName, passwordsMatch} = isLogged

    const [tweetText, setTweetText] = useState('')

    const [showEmojiScreen, setShowEmojiScreen] = useState(false)

    const [uploadedFile, setUploadedFile] = useState(null);

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
        const selectedFile = file.target.files[0]

        if(selectedFile) {
            setUploadedFile(selectedFile)
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
                                <input 
                                    type='text' 
                                    className={styles.mainInput} 
                                    value={tweetText}
                                    onChange={(e) => setTweetText(e.target.value)}
                                    placeholder='No que está pensando?'
                                />
                                
                            </div>
                            <div className={styles.bottomTweetDiv}>
                                <div className={styles.imageVideoEmojiIcons}>
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
                                        onChange={handleFileUpload}
                                    />
                                    {uploadedFile && <p>Arquivo selecionado: {uploadedFile.name}</p>}
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