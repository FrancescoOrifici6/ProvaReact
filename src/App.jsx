import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login'
import Menu from './components/root-comp/menu';
import { setAuthorizationToken } from './interceptor/axiosInterceptor';
import { BrowserRouter, createBrowserRouter, Route, Router, RouterProvider, Routes } from 'react-router-dom';
import Users from './components/pages/Users';


function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <div> AAAA </div>,
    },
    {
      path: "/users",
      element: <div> users </div>,
    },
  ]);







  const [logged, setLogged] = useState(false);



  useEffect(() => {
    const currentToken = (localStorage.getItem('current_token'));
    if (currentToken) {
      setAuthorizationToken(currentToken);
      setLogged(true);
    }
  }, []);




  const updateLogin = () => {
    setLogged(true)
  }





  if (logged === false) {
    return (
      <Login updateLogin={updateLogin} />
    )
  } else {
    return (
      <BrowserRouter>
        <div className='app-container'>
          <div className='menu'>
            <Menu />
          </div>
          <div className='container'>
            <Routes>
              <Route path='/' element={<h1>home</h1>} />
              <Route path='/1' element={<h1>1</h1>} />
              <Route path='/2' element={<h1>2</h1>} />
              <Route path='/users' element={<Users />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    )

  }
}

export default App
