import React, { useEffect, useState } from 'react'
import { BsFilter } from 'react-icons/bs'
import { styled } from 'styled-components'


const FilterContainer = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.opened ? '#526ae5' : ''}; // Access to the prop */
  color: ${(props) => props.opened ? '#fff' : ''}; // Access to the prop */
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
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


const FilterBody = styled.div`
    width: 300px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 30px;
    background-color: #f2f3f8;
    display: flex;
    align-items: center;
    justify-content: center;
    div{
     width: 100%;
     padding: 10px 15px;
      input {
        width: 100%;     
      }
    }
    
  `

export const TableFilter = ({ column, applyFilter }) => {

    const [opened, setOpened] = useState(false)

    const [filterColumn, setFilterColumn] = useState(column);

    const [debouncedValue, setDebouncedValue] = useState('');



    useEffect(() => {
        // Imposta un timeout per aggiornare il valore debouncedValue dopo 500ms
        const handler = setTimeout(() => {
            setDebouncedValue(filterColumn.filterValue);
        }, 250);

        // Pulisce il timeout se l'inputValue cambia prima che il timeout finisca
        return () => {
            clearTimeout(handler);
        };
    }, [filterColumn]); // Riesegue l'effetto quando inputValue cambia





    // Effetto che si attiva quando debouncedValue cambia
    useEffect(() => {
        if (debouncedValue || debouncedValue === '') {
            applyFilter(filterColumn)
        }
    }, [debouncedValue]);




    useEffect(() => {

        if (opened) {
            // set focus on text filter
        }

    }, [opened])

    const handleOpening = (e) => {
        setOpened(prev => !prev);
    }


    const writeValue = (ev) => {


        const { name, value } = ev.target;
        setFilterColumn(prevState => ({
            ...prevState,
            [name]: value !== '' ? value : ''
        }));
    }


    const handleSelectChange = async (ev) => {

        const { name, value } = ev.target;         // deconstr oggetto event
        setFilterColumn(prevState => ({
            ...prevState,
            [name]: value !== '' ? value : ''
        }));
        applyFilter(filterColumn);
    }




    // const handleBlur = () => {
    //     applyFilter(filterColumn);
    // }



    return (
        <FilterContainer opened={opened} onClick={(e) => handleOpening(e)}>
            <BsFilter />
            {opened &&
                <FilterBody>

                    {/* filter managment section  onBlur={() => handleBlur()}*/}

                    {column.type === 'text' &&
                        <div>
                            <Input name='filterValue' type='text' onClick={(e) => e.stopPropagation()} onChange={(e) => writeValue(e)} value={filterColumn.filterValue} id="filter-table-input"></Input>
                        </div>
                    }


                    {column.type === 'select' &&
                        <div>
                            <select name='filterValue' className='common-select' value={filterColumn.filterValue} onChange={handleSelectChange}>
                                <option key={0} value={undefined}></option>
                                {column.columnData.map((option) => (
                                    <option key={option.id} value={option.codice} style={{ backgroundColor: option.color }}>
                                        {option.codice}
                                    </option>
                                ))}

                            </select>
                        </div>
                    }

                </FilterBody>
            }
        </FilterContainer>
    )
}

