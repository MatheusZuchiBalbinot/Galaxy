import { useState, useEffect, useRef, useContext } from "react";
import { userContext} from '../../../context/userContext'
import axios from "axios";

import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, Button, ButtonGroup, Box } from "@chakra-ui/react";

import styles from './TweetPopover.module.css'

import Avatar from "../Avatar/Avatar";

import {GoPersonAdd} from 'react-icons/go'
import {MdBlock} from 'react-icons/md'

function Tweet({ nickName, tweetId }) {

	const {isLogged} = useContext(userContext)

	const {token} = isLogged

	const [popoverContent, setPopoverContent] = useState(null);
	const [succesFriendRequest, setSuccesFriendRequest] = useState(false);

	const initialFocusRef = useRef();

	// Essa consulta está extremamente mal otimizada, a query tem que ser por tweetId porém, evidentemente, se o usuário
	// em questão já tiver sido encontrado anteriormente as informações devem ser reutilizadas.

	const sendFriendRequest = async (tweetId) => {
		try {
			const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
			const result = await axios.post(`http://localhost:3000/user/friendrequest${tweetId}`, config)

			console.log(result)
			
			if(result.status == 200) {
				setSuccesFriendRequest(true)
			} else {
				setSuccesFriendRequest(false)
			}
		} catch(error) {
			console.log(error)
		}
	}

  useEffect(() => {

	async function generatePopoverContent() {
		try {
			const config = {
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			};
	
			const getTweetUser = await axios.post(`http://localhost:3000/tweet/user${tweetId}`, config);
	
			console.log(getTweetUser)
	
			if (getTweetUser != undefined) {
	
				if(getTweetUser.data.itsMe == true) {
					
					const {nickName, createdInDate, userDescription} = getTweetUser.data.user
	
					const content = (
						<PopoverContent color='white' bg='gray.900' borderColor='gray.50'>
							<PopoverHeader pt={4} fontWeight='bold' border='0' className={styles.PopoverHeader__avatar}>
								<div>
									{getTweetUser.data.user ? <Avatar userInfo={getTweetUser.data.user} size={"medium"}/> : null}
								</div>
								<div className={styles.PopoverHeader__info}>
									{nickName ? <h2>{nickName}</h2> : <h2> Carregando... </h2>}
									{createdInDate ? <h3>{createdInDate}</h3> : <h3> Carregando... </h3>}
								</div>
							</PopoverHeader>
							<PopoverArrow bg='gray.50' />
							<PopoverCloseButton />
							<PopoverBody>
								<div>
									{userDescription ? <h2> {userDescription} </h2> : <h2> Carregando... </h2>}
								</div>
								<div className={styles.PopoverBody__statistics}>
									<h2>Likes: <span className={styles.PopoverBody__statistics__number}> 172 </span> </h2>
									<h2>Amigos: <span className={styles.PopoverBody__statistics__number}> 172 </span> </h2>
									<h2>Posts: <span className={styles.PopoverBody__statistics__number}> 172 </span> </h2>
								</div>
							</PopoverBody>
						</PopoverContent>
						);
	
					setPopoverContent(content);
	
				} else {
	
					const {nickName, createdInDate, userDescription} = getTweetUser.data.user
	
					const content = (
						<PopoverContent color='white' bg='gray.900' borderColor='gray.50'>
							<PopoverHeader pt={4} fontWeight='bold' border='0' className={styles.PopoverHeader__avatar}>
								<div>
									{getTweetUser.data.user ? <Avatar userInfo={getTweetUser.data.user} size={"medium"}/> : null}
								</div>
								<div className={styles.PopoverHeader__info}>
									{nickName ? <h2>{nickName}</h2> : <h2> Carregando... </h2>}
									{createdInDate ? <h3>{createdInDate}</h3> : <h3> Carregando... </h3>}
								</div>
							</PopoverHeader>
							<PopoverArrow bg='gray.50' />
							<PopoverCloseButton />
							<PopoverBody>
								<div>
									{userDescription ? <h2> {userDescription} </h2> : <h2> Carregando... </h2>}
								</div>
								<div className={styles.PopoverBody__statistics}>
									<h2>Likes: <span className={styles.PopoverBody__statistics__number}> 172 </span> </h2>
									<h2>Amigos: <span className={styles.PopoverBody__statistics__number}> 172 </span> </h2>
									<h2>Posts: <span className={styles.PopoverBody__statistics__number}> 172 </span> </h2>
								</div>
							</PopoverBody>
							<div className={styles.PopoverFooter}>
								<Button> Mensagens </Button>
								<div className={styles.PopoverFooter__icons}>
									<div className={styles.PopoverFooter__icons__div}>
										<GoPersonAdd onClick={() => sendFriendRequest(tweetId)} />
									</div>
									<div className={styles.PopoverFooter__icons__div}>
										<MdBlock/>
									</div>
								</div>
							</div>
						</PopoverContent>
						);
	
					setPopoverContent(content);
				}
			}
		} catch (error) {
		  console.log(error);
		}
	  }

    generatePopoverContent();
  }, []);

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement='right'
      closeOnBlur={false}
    >
      <PopoverTrigger>
        {nickName ? <h2> {nickName} </h2> : <h2> Carregando... </h2>}
      </PopoverTrigger>
      {popoverContent}
    </Popover>
  );
}

export default Tweet;
