import React, { useState } from 'react';
import ShowAsideRequests from '../RightTabs/RequestsTab';
import ShowAsideTweets from '../RightTabs/TweetsTab';
import ShowAsideFriends from '../RightTabs/FriendsTab';
import styles from './UserRightComponent.module.css';

export default function UserRightComponents() {
    const [selectedTab, setSelectedTab] = useState('tweets');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const getTabStyle = (tab) => {
        return selectedTab === tab ? '3px solid green' : '3px solid white';
    };

    return (
        <>
            <div className={styles.asideSelect}>
                <button
                    className={styles.selectAsideButtons}
                    id="friends"
                    style={{ borderBottom: getTabStyle('friends') }}
                    onClick={() => handleTabClick('friends')}
                >
                    Amigos
                </button>
                <button
                    className={styles.selectAsideButtons}
                    id="requests"
                    style={{ borderBottom: getTabStyle('requests') }}
                    onClick={() => handleTabClick('requests')}
                >
                    Solicitações
                </button>
                <button
                    className={styles.selectAsideButtonsBegin}
                    id="tweets"
                    style={{ borderBottom: getTabStyle('tweets') }}
                    onClick={() => handleTabClick('tweets')}
                >
                    Tweets
                </button>
            </div>
            <div className={styles.asideSelectedItem}>
                {selectedTab === 'friends' && <ShowAsideFriends />}
                {selectedTab === 'requests' && <ShowAsideRequests />}
                {selectedTab === 'tweets' && <ShowAsideTweets />}
            </div>
        </>
    );
}
