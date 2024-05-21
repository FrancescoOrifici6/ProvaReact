import React from 'react';
import { Link } from 'react-router-dom';

function Restaurant({ restaurant }) {

  console.log('restaurant', restaurant);




  


  return (
    
    <div className='ristorante'>
      <Link className='title' to={`/rest/${restaurant.id}`}> {restaurant.name}  </Link>
      {/* <span className='title'>  </span> */}
      
      
  
      </div>
  )
}

export default Restaurant