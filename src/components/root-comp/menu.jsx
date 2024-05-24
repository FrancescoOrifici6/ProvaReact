import React, { useEffect, useState } from 'react'
import { getMenu } from '../../services/menu.service';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Menu() {


  const [menu, setMenu] = useState([]);



  // const fetchDataAsync = async () => {
  //   try {
  //     const result = await getMenu();
  //     console.log('res', result);
  //     // setData(result);
  //   } catch (error) {
  //     // Gestisci l'errore qui
  //   }
  // }



  const ChildWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `


  const MenuItem = styled.div`
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    cursor: pointer;
    color: #fff;
    a{
      font-size: 15px;
    font-weight: bold;
      color: #fff;
    }
    a:hover {
      background-color: #fff;
      font-size: 15px;
      font-weight: bold;
      color: #526ae5;
    }
`;








  const others = [
    {
      'codice': "",
      'descrizione': "Utenti",
      route: "users",
      sequenza: 4,
    }
  ]




  // const addOthersRoutes = (data) => {
  //   return array1.concat(data, others);
  // };


  useEffect(() => {

    axios.get('cope/COPE/odl/menu')
      .then((response) => {
        const menu = response.data.concat(others);
        setMenu(menu);

      })
      .catch((error) => {
        alert('Errore durante la chiamata HTTP:', error);
      });



  }, []);



  if (menu && menu.length && menu.length > 1) {
    return (

      <div className='menu-container'>
        {menu.map((menuItem, index) =>
          <MenuItem key={index}>

            {menuItem.children && menuItem.children.length === 0 && <Link to={`/${menuItem.route}`}> {menuItem.descrizione} {menuItem.root}</Link>}

            {menuItem.children && menuItem.children.length > 1 &&
              <ChildWrapper >
                {menuItem.children.map(((childMenuItem, childIndex) => <Link key={childIndex} to={`/${childMenuItem.route}`}> {childMenuItem.descrizione} {childMenuItem.root}</Link>))}
              </ChildWrapper>}

          </MenuItem>)}
      </div>
    )
  } else {
    return (
      <div>menu NO</div>
    )
  }





}
