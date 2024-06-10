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
        width: ;
    `


    const Thead = styled.tr`
      border: 1px solid #000;
      padding: 4px;
    `


    const Trow = styled.tr`
       display: flex;
       flex-direction: row;
       align-items: center;
    `

    const Cell = styled.tr`
     border: 1px solid #000;
      padding: 4px;
   `

    if (data && data.length && cols && cols.length) {
        return (
            <TableContainer>
                <table>
                    <thead>
                        <Thead>
                            {cols.map(col => <Column width={col.width} key={col.field}>{col.header}</Column>)}
                        </Thead>
                    </thead>
                    <tbody>
                        {data.map(row =>
                            <Trow>
                                {cols.map(item => <Cell > {row[item.field]}</Cell>)}
                            </Trow>
                        )}

                    </tbody>

                </table>

            </TableContainer>
        )
    } else {
        return (<div>NO DATA</div>)
    }

}

