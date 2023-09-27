import { useContext, useState, useEffect } from 'react';
import { userContext } from '../../../../context/userContext';

import axios from 'axios';

import styles from './FriendTab.module.css';

import { TextInput } from '../../../ElementComponents/Input/TextInput';
import Avatar from '../../../ElementComponents/Avatar/Avatar'

import { FaUserFriends } from 'react-icons/fa';
import { AiOutlineSend, AiOutlineDelete } from 'react-icons/ai';
import {IoAddSharp} from 'react-icons/io5'

export default function FriendTab() {
  const { isLogged } = useContext(userContext);
  const { token } = isLogged;

  const [friendRequest, setFriendRequest] = useState('');
  const [searchFriend, setSearchFriend] = useState('');
  
  useEffect(() => {
    const getFriendRequests = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const result = await axios.get(`http://localhost:3000/user/GetFriendRequests`, config);
        setFriendRequest(result.data.infoResults);
      } catch (error) {
        console.log(error);
      }
    };

    getFriendRequests();
  }, []);
  
  const ShowFriendRequests = () => {
    if (friendRequest && Object.keys(friendRequest).length > 0) {
      return (
        <div>
			{Object.keys(friendRequest).map((request) => {
				const {avatar, nickName, userDescription} = friendRequest[request]
				const descriptXcaracters = userDescription.slice(0, 30) + "..."
					return (
						<div key={request} className={styles.friendRequest__user__div}>
							{avatar && (
								<Avatar userInfo={friendRequest[request]} size={'small'}/>
							)}
							<div className={styles.friendRequest__user__userInfo}>
								<h2>{nickName}</h2>
								<p>{descriptXcaracters}</p>
							</div>
							<div className={styles.friendRequest__user__Icons}>
								<div> 
									<IoAddSharp />
								</div>
								<div> 
									<AiOutlineDelete />
								</div>
							</div>
						</div>
					)})}
        </div>
      );
    } else {
      return <h2> Não há nenhum pedido de amizade!!</h2>;
    }
  };

  const searchUserByNickname = async () => {
	console.log(searchFriend)
	try {
		const result = axios.get(`http://localhost:3000/user/getFriendByNickname${searchFriend}`)
		console.log(result)
	} catch(error) {
		console.log(error)
	}
  }

  return (
    <div className={styles.FriendTab__main}>
      <div className={styles.searchFriend}>
        <div className={styles.createComment__div}>
          <TextInput
            type="text"
            maxLength={280}
            onInput={(e) => setSearchFriend(e.target.value)}
            placeholder="Procure por um usuário: "
          />
          <div className={styles.createComment__div__icon} onClick={() => searchUserByNickname(searchFriend)}>
            <AiOutlineSend />
          </div>
        </div>

        <div className={styles.searchFriend__result}>
          <h2>Nenhum usuário encontrado!!</h2>
        </div>
      </div>

      <div className={styles.friendRequests}>
        <div className={styles.friendRequests__div}>
          <div className={styles.asideIconDiv}>
            <FaUserFriends />
          </div>
          <div className={styles.asideText}>
            <h2>Pedidos de Amizade</h2>
          </div>
        </div>

        <div className={styles.friendRequest__result}>
          {ShowFriendRequests()}
        </div>
      </div>
    </div>
  );
}
