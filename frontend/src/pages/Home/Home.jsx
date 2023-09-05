import { useContext, useEffect, useState, useRef } from 'react';
import { userContext} from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import {BsFillPersonFill, BsEmojiSmile} from 'react-icons/bs'
import {HiOutlinePhotograph} from 'react-icons/hi'
import {SlRefresh} from 'react-icons/sl'
import {AiOutlineSend} from 'react-icons/ai'

import EmojiPicker from 'emoji-picker-react';

import logo from '../../assets/logo.png'

import styles from './Home.module.css'

import UserRightComponents from '../../components/HomeComponents/AsideRightComponent/RightUserMenu/UserRightComponent'
import Menu from '../../components/HomeComponents/AsideLeftComponent/Menu.jsx'

import { TextAreaInput, TextInput } from '../../components/ElementComponents/Input/TextInput'
import ShowTimeDiff from '../../components/ElementComponents/ShowTimeDiff/ShowTimeDiff';

export default function Home() {

    const [tweets, setTweets] = useState([]);

    const {isLogged, setIsLogged, actualTweetSeletor} = useContext(userContext)

    const {nickName, passwordsMatch} = isLogged

    const [tweetText, setTweetText] = useState('')
    const [tweetAnswers, setTweetAnswers]= useState([]);

    const [showEmojiScreen, setShowEmojiScreen] = useState(false)

    const [uploadedFile, setUploadedFile] = useState({});

    const [userInfo, setUserInfo] = useState();

    const navigate = useNavigate()

    useEffect(() => {
        if(passwordsMatch == false) {
            setIsLogged({passwordsMatch: false, nickName: ''})
            return navigate("/")
        }
        handleTweetGet()
        handleTweets()
        getUserInfo()
    }, [isLogged])

    const getUserInfo = async () => {

        try {
            const response = await axios.get(`http://localhost:3000/user/profile/${nickName}`);
            setUserInfo(response.data.user)
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleEmoji = (emoji) => {
        setShowEmojiScreen(false)
        setTweetText((prevState) => prevState + String.fromCodePoint(`0x${emoji.unified}`));
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
            if(tweetText.length > 0) {
                const result = await axios.post("http://localhost:3000/user/InsertTweet", tweetData);
                console.log(result)
            } else {

            }
        } catch(error) {
            console.log(error)
        }
    }

    const handleTweetGet = async () => {

        console.log("Getting in API")

        try {
            const actualSelector = actualTweetSeletor.actualSeletor
            const response = await axios.get(`http://localhost:3000/user/GetTweet/${actualSelector}`);
            setTweets(response.data.result);
        } catch (error) {
            console.error("Error fetching tweets:", error);
        }
    }

    const handleTweetResponses = async (item) => {
        
        const {_id} = item

        tweetAnswers.map((tweet) => {
            if(tweet.itemId == _id && tweet.text.length > 0) {
                console.log('Toma TOma')
            }
        })

    }

    const handleAnswerChange = async (itemId, respectiveText) => {
        console.log(itemId, respectiveText)
        setTweetAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            const existingIndex = newAnswers.findIndex(item => item.itemId === itemId);
    
            if (existingIndex === -1) {
                newAnswers.push({ itemId, text: respectiveText });
            } else {
                newAnswers[existingIndex] = { itemId, text: respectiveText };
            }
    
            return newAnswers;
        });
        console.log(tweetAnswers)
    }

    const handleTweets = () => {

        if(tweets) {
            if(tweets.length < 1) {

                return (
                    <div className={styles.noOneTweet}>
                        <h3 className={styles.noOneTweet__title}> Nenhum Tweet encontrado. </h3>
                    </div>
                )
            } else {
                // console.log(tweets)
                return (
                    tweets.map((item, index) => {

                        const {likes, nickName, userId, _id, content, comments, actualDate} = item
                        const {text, image, video} = content
                        
                        return (
                            <div className={styles.oneTweetdiv} key={index}>
                                <div className={styles.oneTweetdiv__infoAboutTweet}>
                                    <h2>{nickName}</h2>
                                    <ShowTimeDiff actualDate={actualDate} />
                                </div>
                                <div className={styles.oneTweetdiv__textAndFile}>
                                    <h1 className={styles.oneTweetdiv__text}>{text}</h1>
                                    <div className={styles.oneTweetdiv__image}>
                                        {image && <img src={image} />}
                                        {video && <video src={video} controls />}
                                    </div>
                                </div>
                                <div className={styles.oneTweetdiv__comments}>
                                    <h3 className={styles.oneTweetdiv__comments__title}>Comentários: </h3>
                                    <div className={styles.createComment__div}>
                                        <TextInput 
                                            type={"text"} 
                                            maxLength={280} 
                                            onChange={(e) =>  handleAnswerChange(item._id, e.target.value)}
                                        />
                                        <div className={styles.createComment__div__icon} onClick={() => handleTweetResponses(item)}>
                                            <AiOutlineSend />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )
            }
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
                {userInfo && (
                    <Menu userInfo={userInfo}/>
                )}
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
                                    <TextAreaInput 
                                        value={tweetText} 
                                        rows={8} 
                                        onChange={(e) => setTweetText(e.target.value)} 
                                        maxLength={280}
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
                                </div>
                                <div className={styles.tweetButton}>
                                    <button type='text' onClick={() => handleTweetSubmit()}>Tweetar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.tweetsDiv}>
                    <div className={styles.refreshTweets}>
                        <button className={styles.refreshTweets__button} onClick={() => handleTweetGet()}> 
                            <SlRefresh />
                        </button>
                    </div>
                    <div className={styles.allTweetsDiv} id='allTweetsDiv'>
                        {handleTweets()}
                    </div>
                </div>
            </div>
        </div>
    )
}