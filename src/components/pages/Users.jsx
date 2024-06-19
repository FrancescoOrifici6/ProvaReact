import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import User from '../root-comp/User';



export default function Users() {

  const [users, setUsers] = useState([]);

  const [filterString, setFilterString] = useState('');

  const filterUsers = (user) => {
    if (filterString) {
      return user.nome && user.nome.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()) ? user : null;
    } else {
      return user;
    }
  }



  useEffect(() => {
    axios.get('cope/COPE/odl/getPersonale')
      .then((response) => {
        console.log('users', response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        alert('Errore durante la chiamata HTTP:', error);
      });
  }, [])





  const handleFilter = (e) => {
    setFilterString(e.target.value);
  }








  if (users && users.length) {
    return (
      <div className='page-wrapper'>
        <div className='filter-bar'>
          <input type='text' name='city' value={filterString} onChange={handleFilter} />
        </div>

        <div className='users-wrapper'>
          {users.filter(filterUsers).map(user =>
            <User key={user.codice} user={user} />
            // <div>
            //   {user.nome}
            // </div>
          )}

        </div>
      </div>
    )
  } else {
    return (
      <div>No Users</div>
    )
  }
}
