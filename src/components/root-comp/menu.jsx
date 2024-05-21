import React, { useEffect, useState } from 'react'
import { getMenu } from '../../services/menu.service';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
          <div className='menu-item' key={index}>
            <Link  to={`/${menuItem.route}`}> {menuItem.descrizione} {menuItem.root}</Link>
          </div>)}
      </div>
    )
  } else {
    return (
      <div>menu NO</div>
    )
  }
}
