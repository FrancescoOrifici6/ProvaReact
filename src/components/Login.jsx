import axios from 'axios';
import React, { useState } from 'react'

export default function Login() {


  const [formData, setFormData] = useState({
    user: '',
    password: '',
    motivo: '.'
  })


  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': '*',
    'item': 'a'
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch('cope/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nella richiesta');
        }
        return response.json();
      })
      .then(data => {
        console.log('Risposta:', data);
      })
      .catch(error => {
        console.error('Si è verificato un errore:', error);
      });
  };




  const handleTyping = (e) => {

    const update = e.target.name;
    setFormData({ ...formData, [update]: e.target.value });

  }



  return (
    <div className='login-card'>
      <h1>Login</h1>
      <form>
        <div className='flexed-vert'>
          <input type="text" name='user' value={formData.user} onChange={handleTyping} />
          <input type="password" name='password' value={formData.password} onChange={handleTyping} />
          <button onClick={handleSubmit}> Login </button>
        </div>
      </form>
    </div>
  )
}
