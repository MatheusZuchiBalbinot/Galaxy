import { useContext, useEffect, useState, useRef } from 'react';
import { userContext} from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import io from 'socket.io-client';

import {SlRefresh} from 'react-icons/sl'
import {AiOutlineSend} from 'react-icons/ai'

import logo from '../../assets/logo.png'

import styles from './Home.module.css'

import UserRightComponents from '../../components/HomeComponents/AsideRightComponent/RightUserMenu/UserRightComponent'
import Menu from '../../components/HomeComponents/AsideLeftComponent/Menu.jsx'

import { TextInput } from '../../components/ElementComponents/Input/TextInput'
import ShowTimeDiff from '../../components/ElementComponents/ShowTimeDiff/ShowTimeDiff';
import { TweetInput } from '../../components/ElementComponents/Input/TweetInput';

import { Popover, Portal, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody, PopoverFooter, Button } from '@chakra-ui/react';

export default function Home() {

    const [tweets, setTweets] = useState([]);

    const {isLogged, setIsLogged, actualTweetSeletor} = useContext(userContext)

    const {token, passwordsMatch} = isLogged

    const [tweetText, setTweetText] = useState('')
    const [tweetAnswers, setTweetAnswers]= useState([]);

    const [showEmojiScreen, setShowEmojiScreen] = useState(false)

    const [uploadedFile, setUploadedFile] = useState({});

    const [userInfo, setUserInfo] = useState();

    const initialFocusRef = useRef();

    const [isOpen, setIsOpen] = useState(false);
    

    const navigate = useNavigate()

    useEffect(() => {
        if(passwordsMatch == false) {
            setIsLogged({passwordsMatch: false, token: ''})
            return navigate("/")
        }
        handleTweetGet()
        handleTweets()
        getUserInfo()
    }, [isLogged])
  

    useEffect(() => {
        const socket = io('http://localhost:3000');
    
        socket.on('solicitacaoDoCliente', (message) => {
          console.log('Solicitação do cliente recebida:', message);
        });

        socket.on('listaUsuariosConectados', (usuarios) => {
            console.log('Usuários conectados:', usuarios);
        });

        socket.on('change123', () => {
            handleTweetGet()
        });


        const sendUserData = () => {
            socket.emit('userId', token)
        };

        sendUserData()
    
        return () => {
          socket.disconnect();
        };
      }, []);

    const getUserInfo = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
            const response = await axios.get('http://localhost:3000/user/profile', config);
            setUserInfo(response.data.user);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleEmoji = (emoji) => {
        setShowEmojiScreen(false)
        setTweetText((prevState) => prevState + String.fromCodePoint(`0x${emoji.unified}`));
    }

    const handleTweetSubmit = async () => {

        const actualDate = new Date();
        const hours = actualDate.getHours();
        const minutes = actualDate.getMinutes();
        const seconds = actualDate.getSeconds()
        const days = actualDate.getDate();
        const month = actualDate.getMonth() + 1;
        const year = actualDate.getFullYear();

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };

        const tweetData = {
            likes: 0,
            content: {
                text: tweetText,
                image: uploadedFile.image ? uploadedFile.url : null,
                video: uploadedFile.video ? uploadedFile.url : null,
            }, 
            actualDate: {
                seconds,
                minutes,
                hours,
                days,
                month,
                year
            },
            comments: {}
        }

        try {
            if(tweetText.length > 0) {
                try {
                    const result = await axios.post("http://localhost:3000/user/InsertTweet", tweetData, config);
                    if(result.status == 200) {
                        setUploadedFile({})
                        setTweetText('')
                        handleTweetGet()
                    }

                } catch(error) {
                    console.log(error)
                }
            } else {
                console.log("Tweet Vazio")
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
                                    <div>
                                        <Popover>
                                            <PopoverTrigger>
                                                <h2>{nickName}</h2>
                                            </PopoverTrigger>
                                            <Portal>
                                            <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverHeader>Header</PopoverHeader>
                                            <PopoverCloseButton />
                                            <PopoverBody>
                                            <Button colorScheme='blue'>Button</Button>
                                            </PopoverBody>
                                            <PopoverFooter>This is the footer</PopoverFooter>
                                            </PopoverContent>
                                            </Portal>
                                        </Popover>
                                    </div>
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
                                        {/* <TweetInput 
                                            setUploadedFile={setUploadedFile}
                                            uploadedFile={uploadedFile}
                                            userInfo={userInfo}
                                            tweetText={tweetText}
                                            handleChange={handleChange}
                                            handleInput={handleInput}
                                            setShowEmojiScreen={setShowEmojiScreen}
                                            showEmojiScreen={showEmojiScreen}
                                            handleEmoji={handleEmoji}
                                            handleTweetSubmit={handleTweetSubmit}
                                        /> */}
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

    const changeToHome = () => {
        return navigate("/home")
    }

    const handleChange = (e) => {
        setTweetText(e.target.value);
    };

    const handleInput = (e) => {
        setRowsInput(e.target.value.split('\n').length);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.asideLeft}>
                <div className={styles.appLogo}>
                    <div className={styles.leftLogo} onClick={changeToHome}>
                        <img src={logo} className={styles.logoImage}/>
                    </div>
                </div>
                <Menu userInfo={userInfo} setUserInfo={setUserInfo}/>
            </div>

            <div className={styles.asideRight}>
                <UserRightComponents />
            </div>

            <div className={styles.main}>
                <div className={styles.postDiv}>
                <TweetInput
                    setUploadedFile={setUploadedFile}
                    uploadedFile={uploadedFile}
                    userInfo={userInfo}
                    tweetText={tweetText}
                    handleChange={handleChange}
                    handleInput={handleInput}
                    setShowEmojiScreen={setShowEmojiScreen}
                    showEmojiScreen={showEmojiScreen}
                    handleEmoji={handleEmoji}
                    handleTweetSubmit={handleTweetSubmit}
                />
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