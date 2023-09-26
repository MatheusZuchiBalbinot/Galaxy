import { useState } from 'react'

import styles from './FriendTab.module.css'

import { TextInput } from '../../../ElementComponents/Input/TextInput'

import {FaUserFriends} from 'react-icons/fa'
import {AiOutlineSend} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'

export default function FriendTab() {

    const [searchFriend, setSearchFriend] = useState('')

    return (
            <div className={styles.FriendTab__main}>

                <div className={styles.searchFriend}>
                    <div className={styles.createComment__div}> 
                        <TextInput 
                            type={"text"} 
                            maxLength={280} 
                            onChange={(e) =>  setSearchFriend(e.target.value)}
                            placeholder="Procure por um amigo: "
                        />
                        <div className={styles.createComment__div__icon} onClick={() => handleTweetResponses(item)}>
                            <AiOutlineSend />
                        </div>
                    </div>

                    <div className={styles.searchFriend__result}>
                        <h2>Nenhum amigo encontrado!! </h2>
                    </div>
                </div>

                <div className={styles.friendRequests}>
                    <div className={styles.friendRequests__div}>
                        <div className={styles.asideIconDiv}>
                            <FaUserFriends />
                        </div>
                        <div className={styles.asideText}>
                            <h2> Pedidos de Amizade </h2>
                        </div>
                    </div>

                    <div className={styles.friendRequest__result}>
                        <h2>Nenhum pedido encontrado!! </h2>
                    </div>
                </div>

            </div>
    )
}