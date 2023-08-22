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

export default function Home() {

    const {isLogged, setIsLogged} = useContext(userContext)

    const { nickName, passwordsMatch} = isLogged

    const [showFriendComponent, setShowFriendComponent] = useState(false)
    const [showTweetsComponent, setShowTweetsComponent] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        if(passwordsMatch == false) {
            setIsLogged({passwordsMatch: false, nickName: ''})
            return navigate("/")
        }
    }, [isLogged])

    const changeAsideComponent = (to) => {
        if(to == "friends") {
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
                    <div className={styles.logoutIcon}>
                        <FiLogOut />
                    </div>
                </div>
            </div>

            <div className={styles.main}>
                <div className={styles.aside}>
                    <div className={styles.asideSelect}>
                        <button className={styles.selectAsideButtons} id="friends" onClick={() => changeAsideComponent("friends")}>Amigos</button>
                        <button className={styles.selectAsideButtons} id="tweets" onClick={() => changeAsideComponent("tweets")}>Tweets</button>
                    </div>
                    {showFriendComponent && (
                        <div className={styles.asideSelectedItem}>
                            <div className={styles.asideDiv}>
                                <div className={styles.asideIconDiv}>
                                    <FaUserFriends />
                                </div>
                                <div className={styles.asideText}>
                                    <h2>Adicionar amigo</h2>
                                </div>
                            </div>
                        </div>
                    )}
                    {showTweetsComponent && (
                        <div className={styles.asideSelectedItem}>
                            <div className={styles.asideDiv}>
                                <div className={styles.asideIconDiv}>
                                    <FaUserFriends />
                                </div>
                                <div className={styles.asideText}>
                                    <h2>Amigos</h2>
                                </div>
                            </div>
                            <div className={styles.asideDiv}>
                                <div className={styles.asideIconDiv}>
                                    <BsFilePerson />
                                </div>
                                <div className={styles.asideText}>
                                    <h2>Meus Tweets</h2>
                                </div>
                            </div>
                            <div className={styles.asideDiv}>
                                <div className={styles.asideIconDiv}>
                                    <CgRowFirst />
                                </div>
                                <div className={styles.asideText}>
                                    <h2>Mais famosos</h2>
                                </div>
                            </div>
                            <div className={styles.asideDiv}>
                                <div className={styles.asideIconDiv}>
                                    <CgRowLast />
                                </div>
                                <div className={styles.asideText}>
                                    <h2>Menos famosos</h2>
                                </div>
                            </div>
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