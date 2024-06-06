import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login'
import Menu from './components/root-comp/menu';
import { setAuthorizationToken } from './interceptor/axiosInterceptor';
import { BrowserRouter, createBrowserRouter, Route, Router, RouterProvider, Routes, useLocation } from 'react-router-dom';
import Users from './components/pages/Users';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setLoggedUser } from './store/slices/userSlice';
import Topbar from './components/root-comp/topbar';
import UserDetails from './components/pages/UserDetails';
import Posts from './components/pages/Posts';
import Albums from './components/pages/Albums';


function App() {


  const dispatchLoggedUser = useDispatch()



  const [logged, setLogged] = useState(false);



  useEffect(() => {
    console.log('initial effect')
    const currentToken = (localStorage.getItem('current_token'));
    if (currentToken) {
      setAuthorizationToken(currentToken);
      setLogged(true);
      storeUser();
    }
  }, []);




  const storeUser = () => {

    axios.get('cope/COPE/odl/getUser')
      .then((response) => {
        dispatchLoggedUser(setLoggedUser(response.data));
      })
      .catch((error) => {
        alert('Errore durante la chiamata HTTP:', error);
      });



  }



  const updateLogin = (value) => {
    setLogged(value);
    if (value) {
      storeUser();
    }
  }


  if (logged === false) {
    return (
      <Login updateLogin={updateLogin} />
    )
  } else {
    return (
      <BrowserRouter>
        <div className='app-container'>
          <Topbar updateLogin={updateLogin} />
          <div className='custom-container'>
            <Menu    />
            <div className='common-container' >
              <Routes>
                <Route path='/' element={<h1>home</h1>} />
                <Route path='/posts' element={<Posts />} />
                <Route path='/users' element={<Users />} />
                <Route path="/user/:id" element={<UserDetails />} />
                <Route path="/albums" element={<Albums />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    )

  }
}

export default App
