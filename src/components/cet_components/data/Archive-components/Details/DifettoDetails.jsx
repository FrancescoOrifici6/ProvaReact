import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import _ from 'lodash';
import { dataPatch, getEntityById } from '../../../../../services/patch.service';
import ImageDisplayer from '../../../details-components/ImageDisplayer';


const FormLabel = styled.div`
color: #868aa8;
font-size: 12px;
font-weight: 700;
width: 80px;
padding-right: 10px;
`

const TextArea = styled.textarea`
  color: #3d3b56;
width: 100%;
background: #fff 0% 0% no-repeat padding-box;
border-radius: 4px;
opacity: 1;
border: 1px solid transparent;
max-width: 100%;
padding-left: 5px;

&:hover {
border: 1px solid #7caedf !important;
}

&:focus {
// border: 1px solid #7caedf !important;
box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, .25) !important;
outline: none !important;
}

&:active {
box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, .25) !important;

// border: 1px solid #7caedf !important;
outline: none !important;
}  
`


const DetailsContainer = styled.div`
     display: flex;
     width: 500px;
     align-items: center;
     height: 100%;
     padding: 20px;
`


const DetailsPanel = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    height: 100%;
    border-radius: 4px;
`


const TabContent = styled.div`
display: flex;
width: 100%;
flex-direction: column;
align-items: flex-start;
height: 100%;
border-radius: 4px;
background-color: #f2f3f8;
border: 2px solid #868aa8;
gap: 20px;
padding: 0 20px;
`


const DetailsHeader = styled.div`
background-color: #e2e6fb;
height: 60px;
display: flex;
align-items: center;
padding: 0 20px;
border-top-left-radius: 4px;
border-top-right-radius: 4px;
border-top: 1px solid #868aa8;
border-left: 1px solid #868aa8;
border-right: 1px solid #868aa8;
`



const Input = styled.input`
color: #3d3b56;
width: 100%;
background: #fff 0% 0% no-repeat padding-box;
border-radius: 4px;
opacity: 1;
border: 1px solid transparent;
max-width: 100%;
padding-left: 5px;

&:hover {
border: 1px solid #7caedf !important;
}

&:focus {
// border: 1px solid #7caedf !important;
box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, .25) !important;
outline: none !important;
}

&:active {
box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, .25) !important;

// border: 1px solid #7caedf !important;
outline: none !important;
}

`

export default function DifettoDetails({ archiveSelection, updateItem, colsData }) {

    const [currentValue, setCurrentValue] = useState(_.cloneDeep(archiveSelection));
    const [difettoImages, setDifettoImages] = useState([]);

    console.log('colsdata', colsData);

    useEffect(() => {
        initImages(archiveSelection);
        setCurrentValue(_.cloneDeep(archiveSelection));
        console.log('difettoImages', difettoImages);
    }, [archiveSelection]);



    const initImages = async (currentItem) => {
        if (currentItem && currentItem.immaginedifettosId) {
            
            const images = [];
            for (let difettoImageId of currentItem.immaginedifettosId) {
                images.push(await getEntityById('Immaginedifetto', difettoImageId))
            }

            setDifettoImages(images);
        }
    }





    const handleBlur = async (updatedValue) => {
        if (JSON.stringify(updatedValue ? updatedValue : currentValue) !== JSON.stringify(archiveSelection)) {
            const newValue = await dataPatch('Difetto', currentValue.id, archiveSelection, updatedValue ? updatedValue : currentValue);
            updateItem(newValue);
        }
    };







    // styled components definitions


    const textChange = (ev) => {

        const { name, value } = ev.target;
        setCurrentValue(prevState => ({
            ...prevState,
            [name]: value
        }));

    }



    const handleSelectChange = async (ev) => {

        const newValue = _.cloneDeep(currentValue);
        const { name, value } = ev.target;
        newValue[name] = Number(value);
        await handleBlur(newValue);
        setCurrentValue(newValue);

    }






    if (currentValue && currentValue.id) {


        return (
            <DetailsContainer>
                <DetailsPanel>

                    <Tabs style={{ width: '100%' }}
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-1"
                        fill
                    >
                        <Tab eventKey="Info" title="Info" active>
                            <DetailsHeader>
                                <div className='flex-row gap-10'>
                                    <div className='flex-row'>
                                        <FormLabel>
                                            Cod
                                        </FormLabel>
                                        <div>
                                            {currentValue.id}
                                        </div>
                                    </div>


                                    <div className='flex-row'>
                                        <FormLabel>
                                            Nome
                                        </FormLabel>
                                        <Input name="nome" type='text' onBlur={() => handleBlur()} value={currentValue.nome} onChange={textChange} id="nome-difetto-input"
                                        />
                                    </div>

                                </div>
                            </DetailsHeader>


                            <TabContent>

                                {difettoImages && difettoImages.length && <ImageDisplayer  difettoId={currentValue.id}   images={difettoImages}></ImageDisplayer>}

                                <div className='flex-row'>
                                    <FormLabel>
                                        Descrizione
                                    </FormLabel>
                                    <TextArea name="descrizione" className='' type='text' onBlur={() => handleBlur()} value={currentValue.descrizione} onChange={textChange} id="desc-difetto-input" />
                                </div>
                                {colsData && colsData[3] && colsData[3].columnData &&
                                    <div className='flex-row'>
                                        <FormLabel>
                                            Origine
                                        </FormLabel>
                                        <select name='origineId' value={currentValue.origineId} onChange={handleSelectChange}>
                                            <option value="">Seleziona un'opzione</option>
                                            {colsData[3].columnData.map((option) => (
                                                <option key={option.id} value={option.id} style={{ backgroundColor: option.color }}>
                                                    {option.codice}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                }


                                {colsData && colsData[4] && colsData[4].columnData &&
                                    <div className='flex-row'>
                                        <FormLabel>
                                            Gruppo
                                        </FormLabel>
                                        <select name='gruppoId' value={currentValue.gruppoId} onChange={handleSelectChange}>
                                            <option value="">Seleziona un'opzione</option>
                                            {colsData[4].columnData.map((option) => (
                                                <option key={option.id} value={option.id} style={{ backgroundColor: option.color }}>
                                                    {option.codice}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                }

                            </TabContent>


                        </Tab>
                        <Tab eventKey="History" title="History">

                        </Tab>

                    </Tabs>

                </DetailsPanel>
            </DetailsContainer>
        )
    } else {
        return <div>NO DATA</div>
    }
}
