import { useContext, useEffect } from 'react'

import styles from './FriendTweetsTab.module.css'

import {FaUserFriends} from 'react-icons/fa'
import {BsFilePerson} from 'react-icons/bs'
import {CgRowFirst, CgRowLast} from 'react-icons/cg'
import {MdOutlineWhatshot} from 'react-icons/md'
import {AiFillLike} from 'react-icons/ai'

import { userContext } from '../../../../context/userContext'

export default function TweetsTab() {

    const {actualTweetSeletor, setActualTweetSeletor} = useContext(userContext)

    const selectorData = [
        "orderByFriendsTweets", "orderByMyTweets", "orderByMostRelevant", "orderByLessRelevant", "orderByRecent", "orderByLiked"
    ]

    useEffect(() => {
        selectorData.map((item) => {
            if(item == actualTweetSeletor.actualSeletor) {
                document.getElementById(item).style.backgroundColor = "gray"
            } else {
                document.getElementById(item).style.backgroundColor = "transparent"
            }
        })
    }, [actualTweetSeletor])

    return (
        <>

            <div className={styles.asideDiv} id="orderByRecent" onClick={() => setActualTweetSeletor({actualSeletor: "orderByRecent"})}>
                <div className={styles.asideIconDiv}>
                    <MdOutlineWhatshot />
                </div>
                <div className={styles.asideText__div}>
                    <h2 className={styles.asideText__text}>Recentes</h2>
                </div>
            </div>
            <div className={styles.asideDiv} id="orderByFriendsTweets" onClick={() => setActualTweetSeletor({actualSeletor: "orderByFriendsTweets"})}>
                <div className={styles.asideIconDiv}>
                    <FaUserFriends />
                </div>
                <div className={styles.asideText}>
                    <h2 className={styles.asideText__text}>Tweets Amigos</h2>
                </div>
            </div>
            <div className={styles.asideDiv} id="orderByMyTweets" onClick={() => setActualTweetSeletor({actualSeletor: "orderByMyTweets"})}>
                <div className={styles.asideIconDiv}>
                    <BsFilePerson />
                </div>
                <div className={styles.asideText__div}>
                    <h2 className={styles.asideText__text}>Meus Tweets</h2>
                </div>
            </div>
            <div className={styles.asideDiv} id="orderByMostRelevant" onClick={() => setActualTweetSeletor({actualSeletor: "orderByMostRelevant"})}>
                <div className={styles.asideIconDiv}>
                    <CgRowFirst />
                </div>
                <div className={styles.asideText__div}>
                    <h2 className={styles.asideText__text}>Mais famosos</h2>
                </div>
            </div>
            <div className={styles.asideDiv} id="orderByLessRelevant" onClick={() => setActualTweetSeletor({actualSeletor: "orderByLessRelevant"})}>
                <div className={styles.asideIconDiv}>
                    <CgRowLast />
                </div>
                <div className={styles.asideText__div}>
                    <h2 className={styles.asideText__text}>Menos famosos</h2>
                </div>
            </div>
            <div className={styles.asideDiv} id="orderByLiked" onClick={() => setActualTweetSeletor({actualSeletor: "orderByLiked"})}>
                <div className={styles.asideIconDiv}>
                    <AiFillLike />
                </div>
                <div className={styles.asideText__div}>
                    <h2 className={styles.asideText__text}>Curtidos</h2>
                </div>
            </div>
        </>
    )
}