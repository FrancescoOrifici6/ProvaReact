import React from 'react'

export default function User({ user }) {






    if (user)
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
}
