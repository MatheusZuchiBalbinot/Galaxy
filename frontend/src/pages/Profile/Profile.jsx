import Menu from '../../components/HomeComponents/AsideLeftComponent/Menu'

import ModalWithInput from '../../components/ElementComponents/ModalWithInput/ModalWithInput'

import styles from './Profile.module.css'
import logo from '../../assets/logo.png'

import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import axios from 'axios'
import io from 'socket.io-client';

import {AiOutlineEdit} from 'react-icons/ai'

import { userContext } from '../../context/userContext'
import Avatar from '../../components/ElementComponents/Avatar/Avatar';

export default function Profile() {

    const { isLogged, setIsLogged } = useContext(userContext);
    const navigate = useNavigate();

    const {passwordsMatch, token} = isLogged;

    const [userInfo, setUserInfo] = useState();
    const [showEditUserInfo, setShowEditUserInfo] = useState();

    const [newUserInfo, setNewUserInfo] = useState({})

    useEffect(() => {

        // const socket = io('http://localhost:3000');

        if (passwordsMatch === false) {
            setIsLogged({ passwordsMatch: false, token: ''});
            return navigate("/");
        }

        // socket.on('change123', (data) => {
        //     console.log('Evento change123 recebido:', data);
        // });

        getUserInfo();
    }, [isLogged, setIsLogged]);

    const getUserInfo = async () => {

        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
            const response = await axios.get('http://localhost:3000/user/profile', config);
            setUserInfo(response.data.user);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleOpenModal = () => {
        setShowEditUserInfo(true);
    };
    
    const handleCloseModal = () => {
        setShowEditUserInfo(false);
    };

    const changeToHome = () => {
        return navigate("/home")
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.asideLeft}>
                <div className={styles.appLogo}>
                    <div className={styles.leftLogo} onClick={changeToHome}>
                        <img src={logo} className={styles.logoImage}/>
                    </div>
                </div>
                {userInfo && (
                    <Menu userInfo={userInfo} setUserInfo={setUserInfo}/>
                )}
            </div>

            <div className={styles.userProfileMain__div}>
                <div className={styles.infoaboutUserMain}>
                    <div className={styles.infoaboutUserMain__div}>
                        <div className={styles.infoaboutUserMain__div__image} onClick={() => console.log("asASD")}>
                            {userInfo && (
                                <Avatar userInfo={userInfo} size={'big'}/>
                            )}
                        </div>

                        <div className={styles.infoaboutUserMain__div__texts}>
                            <div className={styles.infoaboutUserMain__div__nickname}>
                                <div className={styles.infoaboutUserMain__div__nickname__info}>
                                    {userInfo && (
                                        <>
                                            <h2 className={styles.infoaboutUserMain__title}>{userInfo.nickName}</h2>
                                            <h3 className={styles.infoaboutUserMain__subtitle}> Conta criada em: {userInfo.createdInDate}</h3>
                                        </>
                                    )}
                                </div>
                                <div className={styles.editInfoAboutPerson} onClick={handleOpenModal}>
                                    <AiOutlineEdit />
                                    {showEditUserInfo && (
                                        <ModalWithInput 
                                            isOpen={showEditUserInfo} 
                                            onClose={handleCloseModal}  
                                            newUserInfo={newUserInfo}
                                            setNewUserInfo={setNewUserInfo}
                                            getUserInfo={getUserInfo}
                                            userInfo={userInfo}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className={styles.infoaboutUserMain__div__description}>
                            {userInfo && (
                                <h4 className={styles.userDescription}> {userInfo.userDescription} </h4>
                            )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.userProfileStats}>
                        <h2> Likes: 49.333 </h2>
                        <h2> Postagens: 105 </h2>
                        <h2> Comentários: 31 </h2>
                        <h2> Número de amigos: 651 </h2>
                    </div>
                </div>
                    
                <div className={styles.userInteractions}>
                    {userInfo && (
                        <h1 className={styles.infoaboutUserMain__title}>Tweets de {userInfo.nickName} </h1>
                    )}
                </div>
            </div>
        </div>
    )
}