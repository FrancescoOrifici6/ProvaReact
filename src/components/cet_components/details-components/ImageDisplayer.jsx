import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import { createEntity } from '../../../services/patch.service';
import { Spinner } from 'react-bootstrap';
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import CommonButtonIcon from "../../common-components/button-icon"






const ImageDisplayerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`


const ImagePreview = styled.div`
    display: flex;
    align-items: center;
    height: 100px;
    width: 100%;

    img{
        width:calc(100%  - 280px);
        height: 100px;    
    }
    `




const ImageDisplayerCommonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: relative;
    width: 100%;
    padding: 20px 0;
`


const Image = styled.div`

    border:  ${props => (props?.selected?.id === props?.key ? '3px solid #526ae5' : '1px solid #868aa8')};  
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

function ImageDisplayer({ images, difettoId, updateImage, loader }) {

    const [selected, setSelected] = useState(null);



    useEffect(() => {

        if (images && images.length) {
            setSelected(images[0]);
        } else {
            setSelected(null);
        }

    }, [images])



    const selectImage = (selectedImage) => {
        setSelected(selectedImage);
    }



    const imageNavigation = (navigationFlag) => {

        const currentIndex = images.findIndex(item => item.id === selected.id)

        switch (navigationFlag) {

            case 'left':
                if (currentIndex >= 0) {
                    const newIndex = currentIndex - 1;
                    setSelected(images[newIndex]);
                }
                break;


            case 'right':
                if (currentIndex < (images.length - 1)) {
                    const newIndex = currentIndex + 1;
                    setSelected(images[newIndex]);
                }
                break;
        }
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

            updateImage(newValue);

        }


        myReader.readAsDataURL(file.target.files[0]);





    }



    if (loader) {

        return (
            <div className='flexed-center'>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>)



    } else {

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
                    {selected && selected.id &&
                        <div className='flexed-horizon' style={{width: '100%', justifyContent: 'center', gap: '20px'}}>
                            <CommonButtonIcon icon={<GoChevronLeft width={'2em'} />} actionToCall={() => imageNavigation('left')} > </CommonButtonIcon>
                            <img src={selected.immagine}></img>
                            <CommonButtonIcon icon={<GoChevronRight width={'2em'} />} actionToCall={() => imageNavigation('right')}> </CommonButtonIcon>
                        </div>

                    }
                </ImagePreview>



                <ImageDisplayerContainer>
                    {images && images.length &&
                        images.map(item =>
                            <Image selected={selected}  key={item.id} onClick={() => selectImage(item)}>
                                <img src={item.immagine}></img>
                            </Image>
                        )
                    }
                </ImageDisplayerContainer>


                {!images || images.length <= 0 &&
                    <div> </div>
                }



            </ImageDisplayerCommonContainer >
        )
    }
}

export default ImageDisplayer