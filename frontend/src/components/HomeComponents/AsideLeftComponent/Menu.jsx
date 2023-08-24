import {IoMdNotificationsOutline} from 'react-icons/io'
import {CgProfile} from 'react-icons/cg'
import {TiMessages} from 'react-icons/ti'

import styles from './Menu.module.css'

export default function Menu() {
    return (
        <>
            <div className={styles.menuNavigation}>
                <div className={styles.menuDiv}>
                    <div className={styles.menuIconDiv}>
                        <TiMessages />
                    </div>
                    <div className={styles.menuIconText}>
                        <h2>Mensagens</h2>
                    </div>
                </div>
                <div className={styles.menuDiv}>
                    <div className={styles.menuIconDiv}>
                        <IoMdNotificationsOutline />
                    </div>
                    <div className={styles.menuIconText}>
                        <h2>Notificações</h2>
                    </div>
                </div>
                <div className={styles.menuDiv}>
                    <div className={styles.menuIconDiv}>
                        <CgProfile />
                    </div>
                    <div className={styles.menuIconText}>
                        <h2>Perfil</h2>
                    </div>
                </div>
            </div>
        </>
    )
}