import React, { useState } from 'react'


function CityCard({ onUpdate, city, onRemove }) {



    console.log('linked-prop', city);


    const handleCheckboxChange = (event) => {
        const update = {
            key: city.id,
            checked: event.currentTarget.checked
        }

        onUpdate(update)

    }


    const callRemoveItem = () => {
        const remove = {
            key: city.id,
        }

        onRemove(remove)
    }


    // const [currentCard , setCurrentCard]

    return (
        <div className='city-card'>
            <div className='card-title'>
                {city.id}
            </div>

            <div className='card-desc'>
                {city.city}
            </div>

            <input type="checkbox" id="visited" name="visited" checked={city.visited} onChange={handleCheckboxChange} />

            <div className='remove'>

                <button onClick={callRemoveItem}>
                    Clear
                </button>

            </div>

        </div>
    )
}

export default CityCard