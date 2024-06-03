import React, { useEffect, useState } from 'react'
import { getMenu } from '../../services/menu.service';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";


export default function Menu({ setToggler, togglerState }) {


  const [menu, setMenu] = useState([]);





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
      width: 100%;
    }
    a:hover {
      background-color: #fff;
      font-size: 15px;
      font-weight: bold;
      color: #526ae5;
    }
`;


  const ToggleBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 70px;
  svg{
    width: 70px;
    height: 70px;
  }  
`








  const others = [
    {
      'codice': "",
      'descrizione': "Home",
      route: "",
      sequenza: 5,
    },
    {
      'codice': "",
      'descrizione': "Utenti",
      route: "users",
      sequenza: 4,
    },
    {
      'codice': "",
      'descrizione': "Posts",
      route: "posts",
      sequenza: 5,
    },
    
  ]



  const handleOpening = () => {
    setToggler();
  }





  useEffect(() => {
    setMenu(others);
    // axios.get('cope/COPE/odl/menu')
    //   .then((response) => {
    //     const menu = response.data.concat(others);
    //     setMenu(menu);

    //   })
    //   .catch((error) => {
    //     alert('Errore durante la chiamata HTTP:', error);
    //   });



  }, []);



  if (menu && menu.length && menu.length > 0) {
    return (
      <div className='menu-container'>
        <ToggleBar onClick={handleOpening}>
          {togglerState && <BsChevronDoubleLeft />}
          {!togglerState && <BsChevronDoubleRight />}

        </ToggleBar>
        {menu.map((menuItem, index) =>
          <MenuItem key={index}>
            { togglerState && <Link to={`/${menuItem.route}`}> {menuItem.descrizione} {menuItem.root}</Link>}
          </MenuItem>
        )
        }
      </div>
    )
  }





}
