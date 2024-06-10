import React from 'react'
import { useGetArchiveData } from '../../../../hooks/useGetArchiveData';
import styled from 'styled-components';

export function ArchiveTable({ serviceName }) {

    const { data, cols } = useGetArchiveData(serviceName);
    console.log('difetti , entity', data, cols);



    const TableContainer = styled.div`
        display: flex;
        align-items: center;
    `

    const Column = styled.th`
        border: 1px solid #000;
        padding: 4px;
        width: ${(props) => props.width}; // Access to the prop
    `


    const Thead = styled.tr`
      display: flex;
      align-items: center;
      width: ${(props) => props.width}; // Access to the prop
    `


    const Trow = styled.tr`
       height: 40px;
       display: flex;
    `

    const Table = styled.table`
        height: calc(100vh - 140px);
        display: flex;
        flex-direction: column;
    `

    const Tbody = styled.tbody`
    overflow:auto;
    `

    const Cell = styled.td`
     border: 1px solid #000;
      padding: 4px;
      width: ${(props) => props.width}; // Access to the prop
   `

    if (data && data.length && cols && cols.length) {
        return (
            <TableContainer>
                <Table>
                    <thead>
                        <Thead>
                            {cols.map(col => <Column width={col.width} key={col.field}>{col.header}</Column>)}
                        </Thead>
                    </thead>
                    <Tbody>
                        {data.map(row =>
                            <Trow>
                                {cols.map(item => <Cell width={item.width}> {row[item.field]}</Cell>)}
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

