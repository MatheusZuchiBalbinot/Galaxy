import {useContext, useState, useEffect, useRef } from 'react';
import { userContext } from '../../../../../context/userContext';

import {AcceptedFriendCard} from '../../../../ElementComponents/FriendCard/FriendCard'

import Chat from '../../../../ChatComponents/Chat';

import axios from 'axios';

import { useSocket } from '../../../../../context/socketContext';

import styles from './FriendsTab.module.css'

export default function FriendsTab () {

    const socket = useSocket();

    const { token, setActualOpenedChat } = useContext(userContext);
    
    const [chatOpen, setChatOpen] = useState(false);

    const [data, setData] = useState(false)

    useEffect(() => {
        const GetMyFriends = async () => {

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            try {
                const result = await axios.get('http://localhost:3000/v1/friends/getAccepted/', config)
                // console.log(result.data.usersData)
                setData(result.data.usersData);
            } catch(error) {
                console.log(error)
            }
        }

        GetMyFriends()
    }, [])

    const openChat = (friendshipId) => {

        const sendUserData = () => {
            socket.emit('userId', token)
        };

        sendUserData()

        socket.emit('join-room', friendshipId);

        socket.on('user-joined', (id) => {
            console.log(`O usuário com ID ${id} entrou na sala CARALHO.`);
        });

        setActualOpenedChat(friendshipId);
        setChatOpen(!chatOpen);
    };

    return (
        <div className={styles.mainDiv}>
            {data 
            ? (
                Object.values(data).map((item) => {
                    const { avatar, nickName, userDescription, friendshipId } = item;
                    const descriptXcaracters = userDescription.slice(0, 30) + "...";
                    return <AcceptedFriendCard 
                        friendRequest={item} 
                        avatar={avatar} 
                        nickName={nickName} 
                        descriptXcaracters={descriptXcaracters} 
                        key={item._id} 
                        onClick={() => console.log(nickName)}
                        openChat={() => openChat(friendshipId)}
                    />
                })
            )
        : (
            <h2 className={styles.userWithoutFriends}> Você ainda não possui amigos ;)</h2>
        )}
            {chatOpen && <Chat />}
        </div>
    )
}