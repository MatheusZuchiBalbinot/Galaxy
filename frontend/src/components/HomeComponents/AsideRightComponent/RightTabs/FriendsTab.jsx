import {useContext, useState, useEffect } from 'react';
import { userContext } from '../../../../context/userContext';

import axios from 'axios';

export default function FriendsTab () {

    const { isLogged } = useContext(userContext);
	const { token } = isLogged;

    useEffect(() => {
        const GetMyFriends = async () => {
            try {

            } catch(error) {
                console.log(error)
            }
        }

        GetMyFriends()
    }, [])

    return (
        <h2>É US GURI</h2>
    )
}