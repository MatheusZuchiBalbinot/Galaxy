import {IoMdNotificationsOutline} from 'react-icons/io'
import {CgProfile} from 'react-icons/cg'
import {TiMessages} from 'react-icons/ti'
import {BsFillPersonFill} from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'

import { useContext } from 'react'
import { userContext} from '../../../context/userContext'

import styles from './Menu.module.css'

export default function Menu() {

    const {isLogged, setIsLogged} = useContext(userContext)

    const {nickName} = isLogged

    const handleLogout = () => {
        setIsLogged({passwordsMatch: false, nickName: ''})
    }

    return (
        <>
            <div className={styles.menu}>
                <div className={styles.menuNavigation}>

                    <div className={styles.menuDiv}>
                        <div className={styles.menuIconDiv}>
                            <BsFillPersonFill />
                        </div>
                        <div className={styles.menuIconText}>
                            <h2 className={styles.nickNameTitle}> {nickName} </h2>
                        </div>
                    </div>

                    <div className={styles.menuDiv}>
                        <div className={styles.menuIconDiv} onClick={handleLogout}>
                            <FiLogOut />
                        </div>
                        <div className={styles.menuIconText} onClick={handleLogout}>
                            <h2 className={styles.nickNameTitle}> Logout </h2>
                        </div>
                    </div>

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
            </div>
        </>
    )
}