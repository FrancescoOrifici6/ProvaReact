import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function RestInfo() {


    const currentId = useParams();
    console.log('currentId', currentId)


    useEffect(() => {
        getMenu();
    }, []);


    const [menu, setMenu] = useState([]);



    const getMenu = (e) => {

        e?.preventDefault();

        axios.get(`https://private-anon-18d8d985a2-pizzaapp.apiary-mock.com/restaurants/${currentId.restId}/menu`)
            .then(response => {
                // Gestisci la risposta qui
                setMenu(response.data);
                // setAnime(response.data.data);
            })
            .catch(error => {
                // Gestisci gli errori qui
                console.error('Si è verificato un errore:', error);
            });
    }



    //




    return (
        <div className='menu'>
            <div>Info Ristorante</div>
            <div >
                Menu:
                {
                    menu.map(item =>
                        <div className='menu-item'>
                            <div>{item.name}</div>
                            :
                            <div>{item.price}</div>

                        </div>
                    )
                }
            </div>
        </div>)
}

export default RestInfo