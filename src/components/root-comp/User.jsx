import React from 'react'

export default function User({ user, loggedUser }) {






    if (user && !loggedUser) {


        return (

            <div className='user-container'>

                <div className='user-logo' style={{ backgroundColor: '#' + user.colore }}>
                    {user.codice}
                </div>

                <div className='user-info'>
                    <div>
                        {user.nome}
                    </div>
                    <div>
                        {user.cognome}
                    </div>

                </div>

            </div >
        )
    } else if (user && loggedUser) {
        <div className='user-container'>

            <div className='user-logo' style={{ backgroundColor: '#526ae5', color: '#fff' }}>
                {/* {user.codice} */}
            </div>

            <div className='user-info'>
                <div>
                    {user.given_name}
                </div>
                <div>
                    {user.family_name}
                </div>

            </div>

        </div >
    }
}