import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, Button, ButtonGroup, Box } from "@chakra-ui/react";

import styles from './TweetPopover.module.css'

import Avatar from "../Avatar/Avatar";

import {GoPersonAdd} from 'react-icons/go'
import {MdBlock} from 'react-icons/md'

function Tweet({ nickName, tweetId }) {

  const [popoverContent, setPopoverContent] = useState(null);

  const initialFocusRef = useRef();

  const sendFriendRequest = async (tweetId) => {
    try {
      const result = await axios.post(`http://localhost:3000/user/friend${tweetId}`)
      console.log(result)
    } catch(error) {
      console.log(error)
    }
  }

  async function generatePopoverContent() {
	try {
		const getTweetUser = await axios.get(`http://localhost:3000/tweet/user${tweetId}`);

		if (getTweetUser != undefined) {
		
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
							<GoPersonAdd onClick={() => sendFriendRequest(tweetId)} />
							<MdBlock />
						</div>
					</div>
				</PopoverContent>
				);
			setPopoverContent(content);
		}
	} catch (error) {
	  console.log(error);
	}
  }

  useEffect(() => {
    generatePopoverContent();
  }, [tweetId]);

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
