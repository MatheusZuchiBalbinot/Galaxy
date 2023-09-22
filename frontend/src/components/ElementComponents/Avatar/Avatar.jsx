import styles from './Avatar.module.css'

export default function Avatar({userInfo, size}) {

    const {avatar, nickName} = userInfo

    const checkAvatarSize = () => {

        switch(size) {
            case "small":
                return (
                    <div className={styles.userAvatarDiv}>
                        <img className={styles.userAvatarImg__small} id='image' src={avatar} alt={nickName} />
                    </div>
                )
            case "medium":
                return (
                    <div className={styles.userAvatarDiv}>
                        <img className={styles.userAvatarImg__medium} id='image' src={avatar} alt={nickName} />
                    </div>
                )
            case "big":
                return (
                    <div className={styles.userAvatarDiv}>
                        <img className={styles.userAvatarImg__big} id='image' src={avatar} alt={nickName} />
                    </div>
                )
        }
    }

    return checkAvatarSize()
}