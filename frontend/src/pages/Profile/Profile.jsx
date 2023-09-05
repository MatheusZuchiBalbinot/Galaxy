import Menu from '../../components/HomeComponents/AsideLeftComponent/Menu'

import ModalWithInput from '../../components/ElementComponents/ModalWithInput/ModalWithInput'

import styles from './Profile.module.css'
import logo from '../../assets/logo.png'

import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

import {AiOutlineEdit} from 'react-icons/ai'

import { userContext } from '../../context/userContext'
import Avatar from '../../components/ElementComponents/Avatar/Avatar';

export default function Profile() {

    const { isLogged, setIsLogged } = useContext(userContext);
    const navigate = useNavigate();

    const {nickName, passwordsMatch} = isLogged;

    const [userInfo, setUserInfo] = useState();
    const [editUserInfo, setEditUserInfo] = useState();

    useEffect(() => {
        if (passwordsMatch === false) {
            setIsLogged({ passwordsMatch: false, nickName: "" });
            return navigate("/");
        }
        getUserInfo();
    }, [isLogged, setIsLogged]);

    const getUserInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/user/profile/${nickName}`);
            setUserInfo(response.data.user)
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenModal = () => {
        setEditUserInfo(true);
      };
    
      const handleCloseModal = () => {
        setEditUserInfo(false);
      };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.asideLeft}>
                <div className={styles.appLogo}>
                    <div className={styles.leftLogo}>
                        <img src={logo} className={styles.logoImage}/>
                    </div>
                </div>
                {userInfo && (
                    <Menu userInfo={userInfo}/>
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
                                    <h2 className={styles.infoaboutUserMain__title}>{nickName}</h2>
                                    {userInfo && (
                                        <h3 className={styles.infoaboutUserMain__subtitle}> Conta criada em: {userInfo.createdInDate}</h3>
                                    )}
                                </div>
                                <div className={styles.editInfoAboutPerson}>
                                    <AiOutlineEdit onClick={handleOpenModal} />
                                    {editUserInfo && (
                                        <ModalWithInput isOpen={editUserInfo} onClose={handleCloseModal} />
                                    )}
                                </div>
                            </div>
                            <div className={styles.infoaboutUserMain__div__description}>
                                <h4>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia cupiditate quasi explicabo ducimus et magni praesentium quam eaque laborum totam unde soluta, quisquam iste, similique repudiandae sed ullam. Alias, quos!</h4>
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
                        <h1 className={styles.infoaboutUserMain__title}>Tweets de {nickName} </h1>
                    )}
                </div>
            </div>
        </div>
    )
}