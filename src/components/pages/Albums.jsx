import React from 'react'
import { useGetData } from '../../hooks/useGetData';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import Album from '../root-comp/Album';


export const ALBUM_URL = 'https://jsonplaceholder.typicode.com/albums';




function Albums() {



    const SpinnerContainer = styled.div`
       display: flex;
       width: 100%;
       height: 100%;
       align-items: center;
       justify-content: center;
`


    const AlbumsWrapper = styled.div`
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     width: 100%;
     height: 100%;
     overflow: auto;
     gap: 20px;
`

    const AlbumItem = styled.div`
      width: 200px;
      height: 100px;
      border-radius: 4px;
      border: 1px solid #000;
      justify-content: center;
      align-items: center;
      color: #526ae5;
      font-size: 20px;
      overflow: hidden;
      cursor: pointer;
      &:hover{
        border: 1px solid #526ae5;
        color: #000;
      }
`

    const { data: albums } = useGetData(ALBUM_URL);


    if (albums && albums.length) {
        return (
            <AlbumsWrapper>
                {albums.map(item =>
                    <AlbumItem key={item.id}>
                        {item.title}
                    </AlbumItem>)}
            </AlbumsWrapper>

        )
    } else {
        return (
            <SpinnerContainer>
                <Spinner animation="border" variant="primary" />
            </SpinnerContainer>
        )
    }

}

export default Albums