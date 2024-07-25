import React, { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components';
import { ArchiveCell } from './ArchiveCell';
import { createEntity, dataPatch } from '../../../../services/patch.service';
import { TableSort } from './TableSort';


const TableContainer = styled.div`
        display: flex;
        align-items: center;
        padding: 20px;
        position: relative;
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


const AddRowButton = styled.div`
    font-weight: bold;
    cursor: pointer;
    border-radius: 50%;
    position: absolute;
    left: 5px;
    top: 0px;
    width: 30px;
    height: 30px;
    background-color: #526ae5;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 80;
    transition: all .3s;
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

export function ArchiveTable({ serviceName, handleSelection, data, selectedRow, updateItem, addRow, addingRow }) {

    const tableRef = useRef(null);
    const scrollPosition = useRef(0);



    const [sortColumn, setSortColumn] = useState();

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




    const applySort = (columnToSort) => {
        setSortColumn(columnToSort);
    }



    // Ascoltatore Eventi mouse fuori tabella
    // Primo useEffect per gestire il clic fuori dalla tabella
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tableRef.current && !tableRef.current.contains(event.target)) {
                // reset delle coordinate di modificabilità
                setTimeout(() => {
                    setEditableCoordinates({
                        row: null,
                        col: null
                    });
                }, 250);

            }
        };

        // Aggiunge l'evento di clic al documento
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // Rimuove l'evento di clic quando il componente viene smontato
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


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
        } else {
            setEditableCoordinates({ row: null, col: null });
        }

    }


    const getFirstEditableColumn = () => {

        for (let i = 0; i < data.cols.length; i++) {
            if (data.cols[i].editable) {
                return i;
            }
        }

    }




    const handleRowAdding = (e) => {
        addingRow();

        setTimeout(() => {
            setEditableCoordinates({
                row: 0,
                col: getFirstEditableColumn()
            });
        }, 250);

    }



    const sortData = () => {
        return
    }







    const handleCellUpdating = async (newRow, linkedCol) => {



        if (newRow && linkedCol) {


            // row update 
            if (newRow.id) {

                const dataRow = data.rows.find(item => item.id === newRow.id);

                if (JSON.stringify(dataRow) !== JSON.stringify(newRow)) {

                    const newValue = await dataPatch(serviceName, dataRow.id, dataRow, newRow);
                    updateItem(newValue);

                }
            } else {

                // row creation

                const newValue = await createEntity(serviceName, newRow);
                updateItem(newValue);


            }

        }



    };




    const archiveTableSort = (a, b) => {

        if (!sortColumn) {
            return 1;
        } else {
            return archiveTableSortSwitch(a, b);
        }
    }


    const archiveTableSortSwitch = (data1, data2) => {


        const order = sortColumn.sort === 'asc' ? 1 : -1;


        switch (sortColumn.type) {

            case 'number':
                const v1 = data1[sortColumn.field[sortColumn.field.length - 1]] ? data1[sortColumn.field[sortColumn.field.length - 1]] : 0;
                const v2 = data2[sortColumn.field[sortColumn.field.length - 1]] ? data2[sortColumn.field[sortColumn.field.length - 1]] : 0;
                let result = null;
                result = (v1 < v2) ? -1 : (v1 > v2) ? 1 : 0;
                return (order * result);



            case 'date':
                const d1 = data1[sortColumn.field[sortColumn.field.length - 1]] ? data1[sortColumn.field[sortColumn.field.length - 1]] : 0;
                const d2 = data2[sortColumn.field[sortColumn.field.length - 1]] ? data2[sortColumn.field[sortColumn.field.length - 1]] : 0;
                let resultd = 0;
                resultd = (d1 < d2) ? -1 : (d1 > d2) ? 1 : 0;
                return (order * resultd);




            case 'text':
                const n1 = data1[sortColumn.field[sortColumn.field.length - 1]] ? data1[sortColumn.field[sortColumn.field.length - 1]] : '';
                const n2 = data2[sortColumn.field[sortColumn.field.length - 1]] ? data2[sortColumn.field[sortColumn.field.length - 1]] : '';
                let resultn = null;
                resultn = n1.localeCompare(n2);
                return (order * resultn);



            // case 'select':
            //     const select1 = this.tableCellPipe.transform(data1, event.linkedCol)
            //     const select2 = this.tableCellPipe.transform(data2, event.linkedCol)
            //     let resultSelect = null;
            //     resultSelect = select1.localeCompare(select2);
            //     return (event.order * resultSelect);



            // case 'autocomplete':
            //   const auto1 = this.getDataFromStored.transform(data1, event.linkedCol)
            //   const auto2 = this.tableCellPipe.transform(data2, event.linkedCol)
            //   let resultSelect = null;
            //   resultSelect = select1.localeCompare(select2);
            //   return (event.order * resultSelect);


            default:
                return;
        }

    };










    if (data && data.rows && data.cols && data.cols.length && data.rows.length) {
        return (
            <TableContainer>
                {addRow &&
                    <AddRowButton onClick={handleRowAdding}>
                        +
                    </AddRowButton>
                }
                <Table>

                    <thead>
                        <Thead>
                            {data.cols.map(col =>
                                <Column width={col.width} key={col.field}>

                                    {col.header}

                                    {col.sortable && <TableSort applySort={applySort} sortColumn={sortColumn} key={col.header} column={col} />}

                                </Column>)}
                        </Thead>
                    </thead>

                    <Tbody ref={tableRef}>
                        {data.rows.sort((a, b) => archiveTableSort(a, b)).map((row, rowIndex) =>
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

