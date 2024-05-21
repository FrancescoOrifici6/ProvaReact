import React, { useState } from 'react'
import CityCard from './cityCard';
import _, { add } from 'lodash';
import AddCard from './addCard';

export default function CardWrapper() {


    // function
    const handleUpdate = (updateItem) => {
        console.log('update item', updateItem);

        // data update
        const findIndex = cities.findIndex(item => item.id === updateItem.key);
        if (findIndex !== -1) {
            const newData = _.cloneDeep(cities);
            newData[findIndex].visited = updateItem.checked;
            setCities(newData);
        }
    };



    const addCity = (addItem) => {

        addItem.id = cities.length + 1;
        const newData = _.cloneDeep(cities);
        newData.push(addItem);
        setCities(newData);

    };



    const handleRemove = (removeItem) => {

        const newData = _.cloneDeep(cities);
        const removeIndex = cities.findIndex(item => item.id === removeItem.key)
        newData.splice(removeIndex, 1);
        setCities(newData);
    }


    const [cities, setCities] = useState(
        [
            {
                id: 1, city: 'Napoli', visited: true
            },
            {
                id: 2, city: 'Roma', visited: false
            },
            {
                id: 3, city: 'Via Nova', visited: false
            },
            {
                id: 4, city: 'Oslo', visited: false
            },
            {
                id: 5, city: 'Barcellona', visited: false
            },
            {
                id: 6, city: 'Parigi', visited: false
            },
            {
                id: 7, city: 'Londra', visited: false
            }
        ]
    );



    return (
        <div className='wrapper'>
            {cities.map((item) =>
                <CityCard city={item} key={item.id} onUpdate={handleUpdate} onRemove={handleRemove} />)}
            <AddCard addCity={addCity} />
        </div>
    )
}





