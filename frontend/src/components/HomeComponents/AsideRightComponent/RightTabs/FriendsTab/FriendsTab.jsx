import {useContext, useState, useEffect } from 'react';
import { userContext } from '../../../../../context/userContext';

import FriendCard from '../../../../ElementComponents/FriendCard/FriendCard'

import axios from 'axios';

import styles from './FriendsTab.module.css'

export default function FriendsTab () {

    const { isLogged } = useContext(userContext);
	const { token } = isLogged;

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

    return (
        <div className={styles.mainDiv}>
            {data && (
                Object.values(data).map((item) => {
                    console.log(item)
                    const { avatar, nickName, userDescription } = item;
                    const descriptXcaracters = userDescription.slice(0, 30) + "...";
                    return <FriendCard friendRequest={item} avatar={avatar} nickName={nickName} descriptXcaracters={descriptXcaracters} key={item._id} />
                })
            )}
        </div>
    )
}