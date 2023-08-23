import { useContext, useEffect, useState } from 'react';
import { userContext} from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

import {BsSearch} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {BsFillPersonFill} from 'react-icons/bs'
import {FaUserFriends} from 'react-icons/fa'
import {BsFilePerson} from 'react-icons/bs'
import {CgRowFirst, CgRowLast} from 'react-icons/cg'

import logo from '../../assets/logo.png'

import styles from './Home.module.css'
import ShowAsideTweets from '../../components/HomeComponents/AsideShowComponent/ShowAsideTweets';
import ShowAsideFriend from '../../components/HomeComponents/AsideShowComponent/showAsideFriend';

export default function Home() {

    const {isLogged, setIsLogged} = useContext(userContext)

    const {nickName, passwordsMatch} = isLogged

    const [showFriendComponent, setShowFriendComponent] = useState(false)
    const [showTweetsComponent, setShowTweetsComponent] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        if(passwordsMatch == false) {
            setIsLogged({passwordsMatch: false, nickName: ''})
            return navigate("/")
        }
    }, [isLogged])

    const changeAsideComponent = (selected) => {
        if(selected == "friends") {
            setShowFriendComponent(true)
            setShowTweetsComponent(false)
            document.getElementById("friends").style.borderBottom = '3px solid green'
            document.getElementById("tweets").style.borderBottom = '3px solid white'
        }
        else {
            setShowFriendComponent(false)
            setShowTweetsComponent(true)
            document.getElementById("tweets").style.borderBottom = '3px solid green'
            document.getElementById("friends").style.borderBottom = '3px solid white'
        }
    }

    const handleLogout = () => {
        setIsLogged({passwordsMatch: false, nickName: ''})
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.header}>
                <div className={styles.leftLogo}>
                    <img src={logo} className={styles.logoImage}/>
                </div>
                <div className={styles.midSearchBar}>
                    <div className={styles.searchBarDiv}>
                        <div className={styles.userDivAvatar}>
                            <img src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80' className={styles.avatarImage}/>
                        </div>
                        <div className={styles.inputDiv}>
                            <input type='text' className={styles.searchBarInput} placeholder='Pesquise por um tweet: '></input>
                            <div className={styles.inputIcon}>
                                <BsSearch />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.rightIcons}>
                    <div className={styles.personDivInfo}>
                        <BsFillPersonFill />
                        <h2 className={styles.nickNameTitle}> {nickName} </h2>
                    </div>
                    <div className={styles.logoutIcon} onClick={handleLogout}>
                        <FiLogOut />
                    </div>
                </div>
            </div>

            <div className={styles.main}>
                <div className={styles.aside}>
                    <div className={styles.asideSelect}>
                        <button className={styles.selectAsideButtons} id="friends" onClick={() => changeAsideComponent("friends")}>Amigos</button>
                        <button className={styles.selectAsideButtonsBegin} id="tweets" onClick={() => changeAsideComponent("tweets")}>Tweets</button>
                    </div>
                    {showFriendComponent && (
                        <div className={styles.asideSelectedItem}>
                            <ShowAsideFriend />
                        </div>
                    )}
                    {showTweetsComponent && (
                        <div className={styles.asideSelectedItem}>
                            <ShowAsideTweets />
                        </div>
                    )}
                </div>
                <div className={styles.mainContent}>

                </div>
            </div>

            <div className={styles.footer}>

            </div>
        </div>
    )
}