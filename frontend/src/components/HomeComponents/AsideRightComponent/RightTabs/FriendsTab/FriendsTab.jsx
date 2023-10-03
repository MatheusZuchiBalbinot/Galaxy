import {useContext, useState, useEffect } from 'react';
import { userContext } from '../../../../../context/userContext';

import {AcceptedFriendCard} from '../../../../ElementComponents/FriendCard/FriendCard'

import Chat from '../../../../ChatComponents/Chat';

import axios from 'axios';

import styles from './FriendsTab.module.css'

export default function FriendsTab () {

    const { isLogged } = useContext(userContext);
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
                setData(result.data.usersData);
            } catch(error) {
                console.log(error)
            }
        }

        GetMyFriends()
    }, [])

    const openChat = () => {
      setChatOpen(!chatOpen);
    };

    return (
        <div className={styles.mainDiv}>
            {data && (
                Object.values(data).map((item) => {
                    console.log(item)
                    const { avatar, nickName, userDescription } = item;
                    const descriptXcaracters = userDescription.slice(0, 30) + "...";
                    return <AcceptedFriendCard 
                        friendRequest={item} 
                        avatar={avatar} 
                        nickName={nickName} 
                        descriptXcaracters={descriptXcaracters} 
                        key={item._id} 
                        onClick={() => console.log(nickName)}
                        openChat={openChat}
                    />
                })
            )}
            {chatOpen && <Chat />}
        </div>
    )
}