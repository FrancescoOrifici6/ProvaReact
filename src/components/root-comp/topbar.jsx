import React from 'react'
import { useSelector } from 'react-redux';
import User from './User';
import { AiOutlineLogout } from "react-icons/ai";
import styled from 'styled-components';
import { useLogout } from '../../hooks/useUserManager';
import { useNavigate } from 'react-router-dom';


export default function Topbar({ updateLogin }) {


    const nav = useNavigate();


    const logout = useLogout();

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


    const gotoUserPage = () => {
        nav('/userDetails');
    }



    const handleLogout = () => {
        logout();
        updateLogin(false);
    }




    const loggedUser = useSelector((state) => state.logged.value)



    console.log('userLogged', loggedUser);

    return (
        <div className='topbar'>

            {loggedUser && loggedUser.codice &&

                <div onClick={gotoUserPage}>
                    <User user={loggedUser} ></User>
                </div>
            }

            <Logout onClick={handleLogout}>
                <AiOutlineLogout />
            </Logout>

        </div>
    )
}
