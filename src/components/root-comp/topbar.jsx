import React from 'react'
import { useSelector } from 'react-redux';
import User from './User';

export default function Topbar() {


    const loggedUser = useSelector((state) => state.logged.value)



    console.log('userLogged', loggedUser);

    return (
        <div className='topbar'>
            {loggedUser && loggedUser.codice && <div>
                <User user={loggedUser} ></User>
            </div>}
        </div>
    )
}
