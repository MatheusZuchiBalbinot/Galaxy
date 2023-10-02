import { useContext, useState, useEffect } from 'react';
import { userContext } from '../../../../../context/userContext';

import axios from 'axios';
import io from 'socket.io-client';

import styles from './RequestsTab.module.css';

import { TextInput } from '../../../../ElementComponents/Input/TextInput';
import FriendCard from '../../../../ElementComponents/FriendCard/FriendCard';

import { FaUserFriends } from 'react-icons/fa';
import { AiOutlineSend, AiOutlineDelete } from 'react-icons/ai';
import {IoAddSharp} from 'react-icons/io5'
import {GoPersonAdd} from 'react-icons/go'
import {MdBlock} from 'react-icons/md'

export default function RequestsTab() {
	const { isLogged } = useContext(userContext);
	const { token } = isLogged;

	const [friendRequest, setFriendRequest] = useState('');
	const [searchFriend, setSearchFriend] = useState('');
	const [searchFriendResult, setSearchFriendResult] = useState('');
	
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

	const sendFriendRequest = async (nickName) => {
		try {
			const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
			const result = await axios.post(`http://localhost:3000/user/sendFriendRequestByNickName/${nickName}`, config)
		} catch(error) {
			console.log(error)
		}
	}

	const AcceptOrRefuseFriendRequest = async (friendRequestId, AcceptOrRefuse) => {

		console.log(friendRequestId)

		try {
			const response = await axios.patch("http://localhost:3000/user/acceptOrRefuseFriendRequest", { friendRequestId, AcceptOrRefuse });
			if(response.status === 200) {
				// Fazer lógica para o socket io emitir um evento de atualização de compoente especificamente para este usuário.
			}
		} catch(error) {
			console.log(error)
		}

		// console.log(friendRequestId)

		// const socket = io('http://localhost:3000');

		// socket.emit("acceptRequest", friendRequestId)

	}
	
	const ShowFriendRequests = () => {
		if (friendRequest && Object.keys(friendRequest).length > 0) {
			return (
				<div>
				{Object.keys(friendRequest).map((request, index) => {
					const { avatar, nickName, userDescription } = friendRequest[request];
					const descriptXcaracters = userDescription.slice(0, 30) + "...";
					return (
						<div key={index} className={styles.divGrapping}>
							<FriendCard friendRequest={friendRequest[request]} avatar={avatar} nickName={nickName} descriptXcaracters={descriptXcaracters} />
							<div className={styles.friendRequest__user__Icons}>
								<div> 
									<IoAddSharp onClick={() => AcceptOrRefuseFriendRequest(friendRequest[request].friendRequestId, "aceito")}/>
								</div>
								<div> 
									<AiOutlineDelete onClick={() => AcceptOrRefuseFriendRequest(friendRequest[request].friendRequestId, "recusado")}/>
								</div>
							</div>
						</div>
					);
				})}
				</div>
			);
		} else {
			return <h2> Não há nenhum pedido de amizade!!</h2>;
		}
	};

	const SearchUserByNickname = async () => {
		const config = {
			headers: {
			Authorization: `Bearer ${token}`,
			},
		};
		try {
			const result = await axios.post(`http://localhost:3000/user/getFriendByNickname${searchFriend}`, config)
			console.log(result.data)
			setSearchFriendResult(result.data)
		} catch(error) {
			console.log(error)
		}
	}

	const GenerateSearchedUsers = () => {
		if (searchFriendResult && searchFriendResult.users.length > 0) {
			return (
				<div className={styles.searchFriend__result}>
					{searchFriendResult.users.map((friend, index) => {
						const { avatar, nickName, userDescription } = friend;
						const descriptXcaracters = userDescription.slice(0, 30) + "...";
						return (
							<div key={index} className={styles.divGrapping}>
								<FriendCard friendRequest={friend} avatar={avatar} nickName={nickName} descriptXcaracters={descriptXcaracters} />
								<div className={styles.friendRequest__user__Icons}>
									<div className={styles.searchFriendResult__icons}>
										<GoPersonAdd onClick={() => sendFriendRequest(nickName)} />
									</div>
									<div className={styles.searchFriendResult__icons}>
										<MdBlock/>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			);
		} else {
			return (
				<div className={styles.withoutRequest}>
					<h2> Sem usuários... </h2>
				</div>
			);
		}
	}

	return (
		<div className={styles.FriendTab__main}>
		<div className={styles.searchFriend}>
			<div className={styles.createComment__div}>
			<TextInput
				type="text"
				id={"SearchUser"}
				maxLength={280}
				onInput={(e) => setSearchFriend(e.target.value)}
				placeholder="Procure por um usuário: "
			/>
			<div className={styles.createComment__div__icon} onClick={() => SearchUserByNickname(searchFriend)}>
				<AiOutlineSend />
			</div>
			</div>

			{GenerateSearchedUsers()}

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
