import { useContext, useState, useEffect } from 'react';
import { userContext } from '../../../../../context/userContext';

import axios from 'axios';

import styles from './RequestsTab.module.css';

import { TextInput } from '../../../../ElementComponents/Input/TextInput/TextInput';
import {FriendCard} from '../../../../ElementComponents/FriendCard/FriendCard';

import { FaUserFriends } from 'react-icons/fa';
import { AiOutlineSend, AiOutlineDelete } from 'react-icons/ai';
import {IoAddSharp} from 'react-icons/io5'
import {GoPersonAdd} from 'react-icons/go'
import {MdBlock} from 'react-icons/md'

export default function RequestsTab() {
	
	const { token } = useContext(userContext);

	const [friendRequest, setFriendRequest] = useState('');
	const [searchFriend, setSearchFriend] = useState('');
	const [searchFriendResult, setSearchFriendResult] = useState('');

	const getFriendRequests = async () => {
		const config = {
			headers: {
			Authorization: `Bearer ${token}`,
			},
		};

		try {
			const result = await axios.get(`http://localhost:3000/v1/user/GetFriendRequests`, config);
			setFriendRequest(result.data.infoResults);
		} catch (error) {
			console.log(error);
		}
	};
	
	useEffect(() => {
		getFriendRequests();
	}, []);

	const sendFriendRequest = async (nickName) => {
		try {
			const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
			const result = await axios.post(`http://localhost:3000/v1/user/sendFriendRequestByNickName/${nickName}`, config)
		} catch(error) {
			console.log(error)
		}

		SearchUserByNickname()
	}

	const AcceptOrRefuseFriendRequest = async (friendRequestId, AcceptOrRefuse) => {

		console.log(friendRequestId)

		try {
			const response = await axios.patch("http://localhost:3000/v1/user/acceptOrRefuseFriendRequest", { friendRequestId, AcceptOrRefuse });
		} catch(error) {
			console.log(error)
		}

		getFriendRequests()

	}
	
	const ShowFriendRequests = () => {

		if (friendRequest && Object.keys(friendRequest).length > 0) {
			return (
				<div className={styles.friendResult__margin}>
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
			const result = await axios.post(`http://localhost:3000/v1/user/getFriendByNickname/${searchFriend}`, config)
			setSearchFriendResult(result.data)
		} catch(error) {
			console.log(error)
			setSearchFriendResult("none")
		}
	}

	const GenerateSearchedUsers = () => {

		if(searchFriendResult == "none") {
			return (
				<div className={styles.withoutRequest}>
					<h2> Nenhum usuário encontrado... </h2>
				</div>
			);
		}
		else if (searchFriendResult && searchFriendResult.users.length > 0) {
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
