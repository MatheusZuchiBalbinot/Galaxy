import styles from './FriendTweetsTab.module.css'

import {FaUserFriends} from 'react-icons/fa'
import {BsFilePerson} from 'react-icons/bs'
import {CgRowFirst, CgRowLast} from 'react-icons/cg'
import {MdOutlineWhatshot} from 'react-icons/md'
import {AiFillLike} from 'react-icons/ai'


export default function TweetsTab() {
    return (
        <>
            <div className={styles.asideDiv}>
                <div className={styles.asideIconDiv}>
                    <FaUserFriends />
                </div>
                <div className={styles.asideText}>
                    <h2>Tweets Amigos</h2>
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
            <div className={styles.asideDiv}>
                <div className={styles.asideIconDiv}>
                    <MdOutlineWhatshot />
                </div>
                <div className={styles.asideText}>
                    <h2>Recentes</h2>
                </div>
            </div>
            <div className={styles.asideDiv}>
                <div className={styles.asideIconDiv}>
                    <AiFillLike />
                </div>
                <div className={styles.asideText}>
                    <h2>Curtidos</h2>
                </div>
            </div>
        </>
    )
}