import { useContext, useEffect } from 'react';
import { userContext} from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

import {BsFillPersonFill, BsEmojiSmile} from 'react-icons/bs'
import {HiOutlinePhotograph, HiOutlineVideoCamera} from 'react-icons/hi'

import logo from '../../assets/logo.png'

import styles from './Home.module.css'

import UserRightComponents from '../../components/HomeComponents/AsideRightComponent/RightUserMenu/UserRightComponent'
import Menu from '../../components/HomeComponents/AsideLeftComponent/Menu.jsx'

export default function Home() {

    const {isLogged, setIsLogged} = useContext(userContext)

    const {nickName, passwordsMatch} = isLogged

    const navigate = useNavigate()

    useEffect(() => {
        if(passwordsMatch == false) {
            setIsLogged({passwordsMatch: false, nickName: ''})
            return navigate("/")
        }
    }, [isLogged])

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
                                <input type='text' className={styles.mainInput} placeholder='No que está pensando?'></input>
                            </div>
                            <div className={styles.bottomTweetDiv}>
                                <div className={styles.imageVideoEmojiIcons}>
                                    <BsEmojiSmile />
                                    <HiOutlinePhotograph />
                                    <HiOutlineVideoCamera />
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