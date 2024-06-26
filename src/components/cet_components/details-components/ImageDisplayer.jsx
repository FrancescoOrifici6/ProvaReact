import React, { useState } from 'react'
import { styled } from 'styled-components';



const ImageDisplayerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`


const ImagePreview = styled.div`
    display: flex;
    align-items: center;
    height: 100px;
    width: 100px;
    img{
        width: 100%;
        height: 100%;    
    }
    `




const ImageDisplayerCommonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`


const Image = styled.div`
    border: 1px solid #868aa8;
    width: 30px;
    height: 30px;
    img{
        width: 100%;
        height: 100%;    
    }
`




function ImageDisplayer({ images }) {


    const [selected, setSelected] = useState(null);

    console.log('immagini', images);



    const selectImage = (selectedImage) => {
        setSelected(selectedImage);
    }



    return (
        <ImageDisplayerCommonContainer>
            {selected && selected.id && <ImagePreview>
                <img src={selected.immagine}></img>
            </ImagePreview>}
            <ImageDisplayerContainer>
                {images.map(item =>
                    <Image onClick={() => selectImage(item)}>
                        <img src={item.immagine}></img>
                    </Image>
                )}
            </ImageDisplayerContainer>
        </ImageDisplayerCommonContainer>
    )
}

export default ImageDisplayer