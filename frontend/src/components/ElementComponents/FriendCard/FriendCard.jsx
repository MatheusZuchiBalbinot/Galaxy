import Avatar from '../Avatar/Avatar';
import styles from './FriendCard.module.css';

function FriendCard({ friendRequest, avatar, nickName, descriptXcaracters }) {
  return (
    <div className={styles.friendRequest__user__div}>
      {avatar && <Avatar userInfo={friendRequest} size={'small'} />}
      <div className={styles.friendRequest__user__userInfo}>
        <h2>{nickName} </h2>
        <p>{descriptXcaracters}</p>
      </div>
    </div>
  );
}

export default FriendCard;
