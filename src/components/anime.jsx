import React from 'react'

export default function Anime({ anime }) {



    return (
        <div className='anime'>
            <img src={anime.images.jpg.image_url} ></img>

            <div className='anime-title'>{anime.title} </div>
        </div>
    )
}
