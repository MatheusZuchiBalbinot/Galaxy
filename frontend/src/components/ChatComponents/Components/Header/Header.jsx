import Avatar from "../../../ElementComponents/Avatar/Avatar";

import styles from './Header.module.css'

const Header = ({anotherUserInfo}) => {

	const createHeaderExibition = () => {

		if(anotherUserInfo) {

			const {nickName} = anotherUserInfo

			return (
				<div className={styles.anotherPeopleInfo__div}>
					<div>
						<Avatar userInfo={anotherUserInfo} size={'small'}/>
					</div>
					<h2 className={styles.chatTitle}>{nickName}</h2>
					<div className={styles.onlineOroffline}>
						<p className={styles.onlineOrofflineCircle}></p>
						<p className={styles.onlineOrofflineText}>Offline</p>
					</div>
				</div>
			)
		} else {
			return <h2> Carregando... </h2>
		}
	}

	return createHeaderExibition()
};

export default Header;