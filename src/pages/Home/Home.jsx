import { useContext } from 'react';
import { userContext} from '../../context/userContext'

import {BsSearch} from 'react-icons/bs'
import {AiOutlineHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsFillPersonFill} from 'react-icons/bs'

export default function Home() {

    const {isLogged} = useContext(userContext)

    console.log(isLogged)

    return (
        <div className='mainContainer'>
            <div className='header'>
                <div className='leftLogo'>
                    <AiOutlineHome />
                </div>
                <div className='midSearchBar'>
                    <div className='searchBarInput'>
                        <input type='text' className='input' placeholder='Pesquisa por um tweet.'></input>
                        <BsSearch />
                    </div>
                </div>
                <div className='rightIcons'>
                    <div className=''>
                        <BsFillPersonFill />
                        <h2></h2>
                    </div>
                    <FiLogOut />
                </div>
            </div>

            <div className='aside'>

            </div>

            <div className='main'>

            </div>

            <div className='footer'>

            </div>
        </div>
    )
}