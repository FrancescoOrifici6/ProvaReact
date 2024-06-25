import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login'
import Menu from './components/root-comp/menu';
import { setAuthorizationToken, tokenHandling } from './interceptor/axiosInterceptor';
import { BrowserRouter, createBrowserRouter, Route, Router, RouterProvider, Routes, useLocation } from 'react-router-dom';
import Users from './components/pages/Users';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setLoggedUser } from './store/slices/userSlice';
import Topbar from './components/root-comp/topbar';
import UserDetails from './components/pages/UserDetails';
import Posts from './components/pages/Posts';
import Albums from './components/pages/Albums';
import useKeycloakAuth from './hooks/useKeycloakAuth';
import { useKeycloak } from '@react-keycloak/web';
import { Archive } from './components/cet_components/data/Archive';
import CardWrapper from './components/cardWrapper';


function App() {




  // keycloak hook
  const keycloak = useKeycloak()



  console.log('keycloak', keycloak);

  if(keycloak.keycloak.token){
    tokenHandling(keycloak.keycloak.token)
  }
  
  // if(keycloak.keycloak.authenticated){
  //   setAuthorizationToken('Bearer' + keycloak.keycloak.token)
  // }

  // const isLogged = useKeycloakAuth();

  // const dispatchLoggedUser = useDispatch()

  // const [logged, setLogged] = useState(false);



  // useEffect(() => {
  //   console.log('initial effect')
  //   const currentToken = (localStorage.getItem('current_token'));
  //   if (currentToken) {
  //     setAuthorizationToken(currentToken);
  //     setLogged(true);
  //     storeUser();
  //   }
  // }, []);




  // const storeUser = () => {

  //   axios.get('cope/COPE/odl/getUser')
  //     .then((response) => {
  //       dispatchLoggedUser(setLoggedUser(response.data));
  //     })
  //     .catch((error) => {
  //       alert('Errore durante la chiamata HTTP:', error);
  //     });



  // }



  // const updateLogin = (value) => {
  //   setLogged(value);
  //   if (value) {
  //     storeUser();
  //   }
  // }


  if (keycloak.keycloak.authenticated === false) {
    return (
      <div>NOT LOGGED</div>
    )
  } else {
    return (
      <BrowserRouter>
        <div className='app-container'>
          <Topbar />
          <div className='custom-container'>
            <Menu />
            <div className='common-container' >
              <Routes>
                <Route path='/' element={<h1>home</h1>} />
                <Route path='/difetti' element={<Archive entity="Difetto"/>} />
                <Route path='/users' element={<Users />} />
                <Route path="/user/:id" element={<UserDetails />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/cards" element={<CardWrapper />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    )

  }
}

export default App
