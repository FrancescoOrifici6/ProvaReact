import React from 'react'
import { styled } from 'styled-components'
import { TbCaretDownFilled, TbCaretUpDownFilled, TbCaretUpFilled } from "react-icons/tb";
import { deepClone } from 'fast-json-patch';


const SortContainer = styled.div`
  width: 30px;
  height: 30px;
  color: #fff;
  cursor: pointer;
`



export const TableSort = ({ column, sortColumn, applySort }) => {





 



  const handleSortChange = (sortParam) => {
    const cloneCol = deepClone(column);
    cloneCol.sort = sortParam;
    applySort(cloneCol);
  }


  if (sortColumn && sortColumn.header === column.header) {


    switch (sortColumn.sort) {

      case 'asc':
        return (
          <SortContainer onClick={() => handleSortChange('desc')}>
            <TbCaretUpFilled />
          </SortContainer>
        )


      case 'desc':
        return (
          <SortContainer onClick={() => handleSortChange('asc')}>
            <TbCaretDownFilled />
          </SortContainer>
        )


      case null:
        return (
          <SortContainer onClick={() => handleSortChange('asc')}>
            <TbCaretUpDownFilled />
          </SortContainer>
        )


    }

  } else {

    return (
      <SortContainer onClick={() => handleSortChange('asc')}>
        <TbCaretUpDownFilled />
      </SortContainer>
    )

  }
}
