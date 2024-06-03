import React from 'react'
import { useSelector } from 'react-redux';
import User from './User';
import { AiOutlineLogout } from "react-icons/ai";
import styled from 'styled-components';
import { useLogout } from '../../hooks/useUserManager';
import { useNavigate } from 'react-router-dom';


export default function Topbar() {


    const nav = useNavigate();


    const logout = useLogout();

    const Logout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
  `


    const gotoUserPage = () => {
        nav('/userDetails');
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

            <Logout onClick={logout}>
                <AiOutlineLogout />
            </Logout>

        </div>
    )
}
