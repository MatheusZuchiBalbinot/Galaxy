import { useContext, useState } from 'react'

import { userContext} from '../../../../context/userContext'

import {BsFillPersonFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import ShowAsideFriend from '../RightTabs/FriendTab'
import ShowAsideTweets from '../RightTabs/TweetsTab'

import styles from './UserRightComponent.module.css'

export default function UserRightComponents() {

    const {isLogged, setIsLogged} = useContext(userContext)

    const {nickName, passwordsMatch} = isLogged

    const [showFriendComponent, setShowFriendComponent] = useState(false)
    const [showTweetsComponent, setShowTweetsComponent] = useState(true)

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

    return (
        <>
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
        </>
    )
}