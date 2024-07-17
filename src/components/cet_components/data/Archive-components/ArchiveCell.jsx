import { format } from 'date-fns';
import { deepClone } from 'fast-json-patch';
import React, { useState } from 'react'
import { styled } from 'styled-components';


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

export function ArchiveCell({ colIndex, rowIndex, column, row, onEditing, updateCellValue }) {


    const renderValue = (currentRow, currentCol) => {

        const deepEntityRendering = currentCol.field.length;
        let value = '';

        switch (deepEntityRendering) {

            case 1:
                value = currentRow[currentCol.field[deepEntityRendering - 1]];
                break;

            case 2:
                const currentVal = currentCol.columnData.find(item => item.id === currentRow[currentCol.field[0]]);
                value = currentVal && currentVal[currentCol.field[deepEntityRendering - 1]] ? currentVal[currentCol.field[deepEntityRendering - 1]] : '';


            default:
                break;


        }


        if (value && currentCol.format) {
            return format(new Date(value), 'dd/MM/yyyy');
        } else {
            return value;
        }

    };

    const [archiveCellValues, setArchiveCellValues] = useState(renderValue(row, column));




    const writeValue = (ev) => {

        const value = ev.target.value;
        setArchiveCellValues(value);

    }



    const handleBlur = () => {
        const updatedRow = deepClone(row);
        updatedRow[column.field[column.field.length - 1]] = archiveCellValues;
        updateCellValue(updatedRow, column);
    }


    const handleSelectChange = async (ev) => {

        const { name, value } = ev.target;         // deconstr oggetto event
        const valueId = column.columnData.find(opt => opt.codice === value) // trovo chiave corrispondente
        setArchiveCellValues(value); // setto state con valore da leggere aggiornato

        const updatedRow = deepClone(row);    // clono riga tabella old
        updatedRow[name] = valueId.id;        // settaggio chiave nuova 
        updateCellValue(updatedRow, column);  // salvo riga nuova
    }


    const setFocusOn = (elementId) => {

        if (elementId) {

            setTimeout(() => {
                const elem = document.getElementById(elementId);
                if (elem) {
                    elem.focus();
                }
            }, 250);

        }
    };


    if (!onEditing) {
        return (
            <div>{renderValue(row, column)}</div>
        )
    } else {

        switch (column.type) {
            case 'text':
                setFocusOn('cell-table-input');
                return (
                    <div>
                        <Input name={column['field'][column.field.length - 1]} type='text' onBlur={() => handleBlur()} onChange={(e) => writeValue(e)} value={archiveCellValues} id="cell-table-input"></Input>
                    </div>
                )



            case 'select':
                return (
                    <select name={column.field[column.field.length - 2]} className='common-select' value={archiveCellValues} onChange={handleSelectChange}>
                        <option value={undefined}></option>
                        {column.columnData.map((option) => (
                            <option key={option.id} value={option.codice} style={{ backgroundColor: option.color }}>
                                {option.codice}
                            </option>
                        ))}
                    </select>
                )


            default:
                break;
        }
    }

}
