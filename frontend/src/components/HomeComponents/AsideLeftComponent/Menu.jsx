import {IoMdNotificationsOutline} from 'react-icons/io'
import {CgProfile} from 'react-icons/cg'
import {TiMessages} from 'react-icons/ti'
import {BsFillPersonFill} from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'

import { useContext } from 'react'
import { userContext} from '../../../context/userContext'

import styles from './Menu.module.css'

import { useNavigate } from 'react-router-dom';

export default function Menu() {

    const navigate = useNavigate()

    const changePage = () => {
        return navigate("/user/profile")
    }

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
                        <div className={styles.menuIconText__div}>
                            <h2 className={styles.menuIconText__text}> {nickName} </h2>
                        </div>
                    </div>

                    <div className={styles.menuDiv}>
                        <div className={styles.menuIconDiv} onClick={handleLogout}>
                            <FiLogOut />
                        </div>
                        <div className={styles.menuIconText__div} onClick={handleLogout}>
                            <h2 className={styles.menuIconText__text}> Logout </h2>
                        </div>
                    </div>

                    <div className={styles.menuDiv}>
                        <div className={styles.menuIconDiv}>
                            <TiMessages />
                        </div>
                        <div className={styles.menuIconText__div}>
                            <h2 className={styles.menuIconText__text}>Mensagens</h2>
                        </div>
                    </div>
                    <div className={styles.menuDiv}>
                        <div className={styles.menuIconDiv}>
                            <IoMdNotificationsOutline />
                        </div>
                        <div className={styles.menuIconText__div}>
                            <h2 className={styles.menuIconText__text}>Notificações</h2>
                        </div>
                    </div>
                    <div className={styles.menuDiv} onClick={changePage}>
                        <div className={styles.menuIconDiv}>
                            <CgProfile />
                        </div>
                        <div className={styles.menuIconText__div}>
                            <h2 className={styles.menuIconText__text}>Perfil</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}