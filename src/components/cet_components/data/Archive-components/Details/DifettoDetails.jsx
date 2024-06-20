import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import _ from 'lodash';

export default function DifettoDetails({ archiveSelection }) {

    const [currentValue, setCurrentValue] = useState(archiveSelection);


    useEffect(() => {
        setCurrentValue(archiveSelection);
    }, [archiveSelection]);

    // styled components definitions

    const FormLabel = styled.div`
    color: #868aa8;
    font-size: 12px;
    font-weight: 700;
    width: 80px;
    padding-right: 10px;
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
    align-items: center;
    height: 100%;
    border-radius: 4px;
    background-color: #f2f3f8;
    border: 2px solid #868aa8;
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




    const textChange = (ev) => {
        const { name, value } = ev.target;
        setCurrentValue({
            ...currentValue,
            [name]: value
        });
    }




    console.log('props', archiveSelection);

    if (archiveSelection && archiveSelection.id) {


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
                                        <Input name="nome" type='text' value={currentValue.nome} onChange={textChange} id="nome-difetto-input"
                                        />
                                    </div>

                                </div>


                            </DetailsHeader>


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
