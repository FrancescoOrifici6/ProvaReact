import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { format } from 'date-fns';

export function ArchiveTable({ serviceName, handleSelection, data , selectedRow}) {

    const tableRef = useRef(null);
    const scrollPosition = useRef(0);


    console.log('difetti , entity', data, tableRef ,  selectedRow);

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



    if (data && data.rows && data.cols && data.cols.length && data.rows.length) {
        return (
            <TableContainer>
                <Table  >

                    <thead>
                        <Thead>
                            {data.cols.map(col => <Column width={col.width} key={col.field}>{col.header}</Column>)}
                        </Thead>
                    </thead>

                    <Tbody ref={tableRef}>
                        {data.rows.map(row =>
                            <Trow onClick={() => handleRow(row)} id={row.id} key={row.id} selectedid={selectedRow?.id}>
                                {data.cols.map(col => <Cell width={col.width} key={`${col.header}_${row.id}`}> {renderValue(row, col)}</Cell>)}
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

