import React from 'react'
import { useGetData } from '../../../hooks/useGetData'
import { useGetArchiveData } from '../../../hooks/useGetArchiveData'
import styled from 'styled-components';
import { Breadcrumb } from './Archive-components/Breadcrumb';
import { ArchiveTable } from './Archive-components/ArchiveTable';







export function Archive({ entity }) {


  const ArchiveContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  `



  

  return (
    <ArchiveContainer>
      <Breadcrumb serviceName={entity}></Breadcrumb>
      <ArchiveTable serviceName={entity}></ArchiveTable>
    </ArchiveContainer>


  )
}
