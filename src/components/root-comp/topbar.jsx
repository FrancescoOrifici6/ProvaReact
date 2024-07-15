import React from 'react'
import { useSelector } from 'react-redux';
import User from './User';
import { AiOutlineLogout } from "react-icons/ai";
import { styled } from 'styled-components';
import { useLogout } from '../../hooks/useUserManager';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const Logout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
    height: 70px;
    svg{
        height: 70px;
        width: 30px;
    }
  `

export default function Topbar({ updateLogin }) {


    const nav = useNavigate();

    const { keycloak, initialized } = useKeycloak();

    const logout = useLogout();




    const gotoUserPage = () => {
        nav('/userDetails');
    }



    const handleLogout = () => {
        logout();
        updateLogin(false);
    }




    console.log('initial info => ', keycloak);


    // <User user={loggedUser} ></User>


    return (
        <div className='topbar'>

            {keycloak && initialized &&

                <div onClick={gotoUserPage}>
                    <User user={keycloak} loggedUser={true} ></User>
                </div>
            }

            <Logout onClick={handleLogout}>
                <AiOutlineLogout />
            </Logout>

        </div>
    )
}
