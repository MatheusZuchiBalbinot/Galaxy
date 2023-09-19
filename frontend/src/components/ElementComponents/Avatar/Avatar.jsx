import styles from './Avatar.module.css'

export default function Avatar({userInfo, size}) {

    console.log(userInfo)

    const {avatar, nickName} = userInfo

    const checkAvatarSize = () => {

        switch(size) {
            case "small":
                return (
                    <div className={styles.userAvatarDiv}>
                        <img className={styles.userAvatarImg__small} id='image' src={avatar} alt={nickName} />
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