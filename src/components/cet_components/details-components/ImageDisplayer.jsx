import React, { useState } from 'react'
import { styled } from 'styled-components';
import { createEntity } from '../../../services/patch.service';




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
    position: relative;
    width: 100%;
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


const AdderContainer = styled.div`
    height: 30px;
    width: 30px;
`


const AddButton = styled.div`
    background-color: #526ae5;
    color: #fff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    .div{
        font-size: 20px;
        font-weight: 600;
    }
    
`

function ImageDisplayer({ images, difettoId , updateImage }) {

    const [selected, setSelected] = useState(null);


    const selectImage = (selectedImage) => {
        setSelected(selectedImage);
    }




    const fileLoading = async (file) => {
        console.log('file loaded => ', file.target.files[0]);


        var myReader = new FileReader();


        myReader.onloadend = async (e) => {

            const immagineDifetto = {
                'difettoId': difettoId,
                'immagine': myReader.result
            };

            const newValue = await createEntity('Immaginedifetto', immagineDifetto);
            
    


        }


        myReader.readAsDataURL(file.target.files[0]);





    }



    return (
        <ImageDisplayerCommonContainer>

            <AdderContainer>
                <AddButton>
                    <div>
                        <label>
                            <input type="file" id="all-odl" accept="image/png, image/gif, image/jpeg"
                                onChange={fileLoading} />
                            +
                        </label>
                    </div>
                </AddButton>
            </AdderContainer>


            <ImagePreview>
                {selected && selected.id && <img src={selected.immagine}></img>}
            </ImagePreview>


            <ImageDisplayerContainer>
                {images.map(item =>
                    <Image key={item.id} onClick={() => selectImage(item)}>
                        <img src={item.immagine}></img>
                    </Image>
                )}
            </ImageDisplayerContainer>

        </ImageDisplayerCommonContainer >
    )
}

export default ImageDisplayer