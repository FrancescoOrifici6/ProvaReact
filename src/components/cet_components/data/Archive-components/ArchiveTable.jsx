import React, { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components';
import { ArchiveCell } from './ArchiveCell';
import { deepClone } from 'fast-json-patch';
import { dataPatch } from '../../../../services/patch.service';


const TableContainer = styled.div`
        display: flex;
        align-items: center;
        padding: 20px;
    `

const Column = styled.th`
    text-align: center;
    color: #fff;
    background: #868aa8;
    border: 1px solid #dddde5;
    border-bottom: 4px solid #f0c949;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: ${(props) => props.width}; // Access to the prop
    `


const Thead = styled.tr`
      display: flex;
      align-items: center;
      width: ${(props) => props.width}; // Access to the prop
    `


const Trow = styled.tr`
       cursor: pointer;
       height: 40px;
       display: flex;
       color: #3d3b56;
       box-shadow: ${(props) => props.id === props.selectedid ? 'inset 0 0 0 4px #526ae5' : ''};

       &:nth-child(odd) {
        background-color: #eaebf5;
        color: #3d3b56;
       }
    `

const Table = styled.table`
        height: calc(100vh - 160px);
        display: flex;
        flex-direction: column;
    `

const Tbody = styled.tbody`
    overflow:auto;
    `

const Cell = styled.td`
      border: 1px solid #ddd;
      padding: 4px;
      width: ${(props) => props.width}; // Access to the prop
   `

export function ArchiveTable({ serviceName, handleSelection, data, selectedRow, updateItem }) {

    const tableRef = useRef(null);
    const scrollPosition = useRef(0);


    const [editableCoordinates, setEditableCoordinates] =
        useState({
            row: null,
            col: null
        });


    console.log('difetti , entity', data, tableRef, selectedRow);

    // const handleRow = (currentRow) => {
    //     setSelectedRow(currentRow.id);
    //     // handleSelection(currentRow);
    // }


    useEffect(() => {
        console.log('use effect')
        if (tableRef && selectedRow) {
            tableRef.current.scrollTop = selectedRow.scrollPosition;
        }
    }, [selectedRow]);





    const handleRow = useCallback((row) => {
        scrollPosition.current = tableRef.current.scrollTop;
        // setSelectedRow(row.id);
        const rowSelection = row;
        rowSelection.scrollPosition = tableRef.current.scrollTop;
        handleSelection(rowSelection);

    }, [selectedRow]);






    const handleCellClick = (rowIndex, colIndex, currentColumn) => {

        if (currentColumn && currentColumn.editable) {
            setEditableCoordinates({ row: rowIndex, col: colIndex });
        }

    }



    const handleCellUpdating = async (newRow, linkedCol) => {



        if (newRow && linkedCol) {

            const dataRow = data.rows.find(item => item.id === newRow.id);

            if (JSON.stringify(dataRow) !== JSON.stringify(newRow)) {

                const newValue = await dataPatch(serviceName, dataRow.id, dataRow, newRow);
                updateItem(newValue);

            }

        }



    };










    if (data && data.rows && data.cols && data.cols.length && data.rows.length) {
        return (
            <TableContainer>
                <Table>

                    <thead>
                        <Thead>
                            {data.cols.map(col => <Column width={col.width} key={col.field}>{col.header}</Column>)}
                        </Thead>
                    </thead>

                    <Tbody ref={tableRef}>
                        {data.rows.map((row, rowIndex) =>
                            <Trow onClick={() => handleRow(row)} id={row.id} key={row.id} selectedid={selectedRow?.id}>
                                {data.cols.map((col, colIndex) =>

                                    <Cell width={col.width} key={`${col.header}_${row.id}`} onClick={() => handleCellClick(rowIndex, colIndex, col)}>

                                        <ArchiveCell colIndex={colIndex} onEditing={editableCoordinates.col === colIndex && editableCoordinates.row === rowIndex ? true : false}
                                            row={row} column={col} rowIndex={rowIndex} updateCellValue={handleCellUpdating} />

                                    </Cell>

                                )}
                            </Trow>
                        )}
                    </Tbody>

                </Table>
            </TableContainer>
        )
    } else {
        return (<div>NO DATA</div>)
    }

}

