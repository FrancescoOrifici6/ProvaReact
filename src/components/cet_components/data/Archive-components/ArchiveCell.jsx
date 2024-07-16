import { format } from 'date-fns';
import { deepClone } from 'fast-json-patch';
import React, { useState } from 'react'
import { cloneElement } from 'react';

export function ArchiveCell({ colIndex, rowIndex, column, row, onEditing, updateCellValue }) {

    console.log('after setting coord', onEditing);

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








    if (!onEditing) {
        return (
            <div>{renderValue(row, column)}</div>
        )
    } else {

        switch (column.type) {
            case 'text':
                return (

                    // 
                    // onChange={textChange}
                    <div>
                        <input name={column['field'][column.field.length - 1]} type='text' onBlur={() => handleBlur()} onChange={(e) => writeValue(e)} value={archiveCellValues} id="cell-difetto-input"></input>
                    </div>
                )



            case 'select':
                return (
                    <div>select</div>
                )


            default:
                break;
        }
    }

}
