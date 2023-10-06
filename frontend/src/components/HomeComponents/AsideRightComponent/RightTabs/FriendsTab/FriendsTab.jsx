import {useContext, useState, useEffect } from 'react';
import { userContext } from '../../../../../context/userContext';

import {AcceptedFriendCard} from '../../../../ElementComponents/FriendCard/FriendCard'

import Chat from '../../../../ChatComponents/Chat';

import axios from 'axios';
import io from 'socket.io-client';

import styles from './FriendsTab.module.css'

export default function FriendsTab () {

    const { isLogged, setActualOpenedChat } = useContext(userContext);
	const { token } = isLogged;
    
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

    // useEffect(() => {
    //     const socket = io('http://localhost:3000');
    
    //     // socket.on('solicitacaoDoCliente', (message) => {
    //     //   console.log('Solicitação do cliente recebida:', message);
    //     // });

    //     socket.on('listaUsuariosConectados', (usuarios) => {
    //         console.log('Usuários conectados:', usuarios);
    //     });

    //     socket.on('change123', () => {
    //         handleTweetGet()
    //     });


    //     const sendUserData = () => {
    //         socket.emit('userId', token)
    //     };

    //     sendUserData()
    
    //     return () => {
    //       socket.disconnect();
    //     };
    //   }, []);

    const openChat = (friendshipId) => {

        const socket = io.connect('http://localhost:3000');
        
        socket.emit('user-joined', socket._id)

        setActualOpenedChat(friendshipId)
        setChatOpen(!chatOpen);
    };

    return (
        <div className={styles.mainDiv}>
            {data && (
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
            )}
            {chatOpen && <Chat />}
        </div>
    )
}