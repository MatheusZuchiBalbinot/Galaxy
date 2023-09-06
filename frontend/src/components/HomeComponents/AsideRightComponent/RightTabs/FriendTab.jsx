import styles from './FriendTweetsTab.module.css'

import {FaUserFriends} from 'react-icons/fa'

export default function FriendTab() {
    return (
        <>
            <div className={styles.asideDiv}>
                <div className={styles.asideIconDiv}>
                    <FaUserFriends />
                </div>
                <div className={styles.asideText}>
                    <h2>Adicionar amigo</h2>
                </div>
            </div>
        </>
    )
}