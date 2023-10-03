import Avatar from '../Avatar/Avatar';
import styles from './FriendCard.module.css';

import {AiOutlineMessage, AiOutlineUserDelete} from 'react-icons/ai'

function FriendCard({ friendRequest, avatar, nickName, descriptXcaracters, onClick }) {
  return (
    <div className={styles.friendRequest__user__div} onClick={onClick}>
      {avatar && <Avatar userInfo={friendRequest} size={'small'} />}
      <div className={styles.friendRequest__user__userInfo}>
        <h2>{nickName} </h2>
        <p>{descriptXcaracters}</p>
      </div>
    </div>
  );
}

function AcceptedFriendCard({ friendRequest, avatar, nickName, descriptXcaracters, onClick, openChat }) {
  return (
    <div className={styles.friendRequest__user__div}>
      {avatar && <Avatar userInfo={friendRequest} size={'small'} />}
      <div className={styles.friendRequest__user__userInfo} onClick={onClick}>
        <h2>{nickName} </h2>
        <p>{descriptXcaracters}</p>
      </div>
      <div className={styles.acceptOrblockDiv}>
        <AiOutlineMessage onClick={openChat}/>
        <AiOutlineUserDelete />
      </div>
    </div>
  );
}

export { FriendCard, AcceptedFriendCard }; 
