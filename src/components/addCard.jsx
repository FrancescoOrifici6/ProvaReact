import React, { useState } from 'react'

export default function AddCard({ addCity }) {


    const [newCity, updateCity] = useState({ id: null, city: '', visited: false });




    const handleInput = (e) => {
        updateCity({ ...newCity, city: e.target.value });
    }



    const handleCheck = (e) => {
        // updateCity(newCity);
    }



    const addToCities = () => {
        if (newCity && newCity.city) {
            addCity(newCity);
            updateCity({ id: null, city: '', visited: false });
        }
    }





    return (
        <div className='form-card form-layout'>

            <div>
                <label htmlFor='city' >Nome</label>
                <input type='text' name='city' value={newCity.city} onChange={handleInput} />
            </div>

            <div>
                <label htmlFor='name' >Checked</label>
                <input type='checkbox' name='name' value={newCity.visited} onChange={handleCheck} />
            </div>


            <div>
                <button onClick={addToCities}   >
                    Invia
                </button>
            </div>



        </div>
    )
}
