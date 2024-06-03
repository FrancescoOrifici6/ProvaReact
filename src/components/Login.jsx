import React, { useEffect, useState } from 'react'
import axios from 'axios'
import _ from 'lodash';
import qs from 'qs';
import { setAuthorizationToken } from '../interceptor/axiosInterceptor';





export default function Login( {updateLogin}  ) {



  const [loginForm, setLoginForm] = useState(
    {
      nome: '',
      password: '',
      motivo: ''
    });


  const handleSubmit = async (e) => {
    const data = {
      // Dati da inviare nel corpo della richiesta
      userid: loginForm.nome,
      password: loginForm.password,
      motivo: '.'
    };
    const requestData = qs.stringify(data);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded', // specifica il tipo di contenuto della richiesta
    };

    axios.post('cope/login', requestData, { headers })
      .then(response => {
        // Gestisci la risposta qui
        console.log(response.data);
        setAuthorizationToken(response.data.token)
        localStorage.setItem('current_token', response.data.token);
        updateLogin(response.data.token);
      })
      .catch(error => {
        // Gestisci gli errori qui
        console.error('Si è verificato un errore:', error);
      });

  };



  const handleFormChangeName = (event) => {
    const clone = _.cloneDeep(loginForm);
    clone.nome = event.target.value;
    setLoginForm(clone);
  }


  const handleFormChangePassword = (event) => {
    event.preventDefault();
    const clone = _.cloneDeep(loginForm);
    clone.password = event.target.value;
    setLoginForm(clone);
  }



  return (
    <div className='login-container'>
      <div className='login-card'>
        <h2>Login</h2>
        <input placeholder='nome' type='text' value={loginForm.nome} onChange={handleFormChangeName} name='nome' />
        <input placeholder='password' type='password' value={loginForm.password} onChange={handleFormChangePassword} name='password' />
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}
