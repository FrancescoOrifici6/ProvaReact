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
import styled from 'styled-components';
import Posts from './components/pages/Posts';


function App() {


  const dispatchLoggedUser = useDispatch()



  const [logged, setLogged] = useState(false);

  const [opened, setOpened] = useState(false);


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



  const MenuContainer = styled.div`
  width: ${props => (props.opened ? '300px' : '70px')};
  transition: 0.3s all ease;
  height: 100%;
  background-color: #526ae5;
  color: #fff;
  `




  const updateLogin = (value) => {
    setLogged(value);
    if (value) {
      storeUser();
    }
  }



  const handleOpening = () => {
    setOpened(prev => !prev);
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
            <MenuContainer opened={opened}>
              <Menu setToggler={handleOpening}   togglerState={opened}/>
            </MenuContainer>
            <div className='container'>
              <Routes>
                <Route path='/' element={<h1>home</h1>} />
                <Route path='/1' element={<h1>1</h1>} />
                <Route path='/posts' element={<Posts/>} />
                <Route path='/users' element={<Users />} />
                <Route path="/userDetails" element={<UserDetails />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    )

  }
}

export default App
