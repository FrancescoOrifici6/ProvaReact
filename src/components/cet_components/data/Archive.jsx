import React, { useCallback, useState } from 'react'
import { useGetData } from '../../../hooks/useGetData'
import { useGetArchiveData } from '../../../hooks/useGetArchiveData'
import styled from 'styled-components';
import { Breadcrumb } from './Archive-components/Breadcrumb';
import { ArchiveTable } from './Archive-components/ArchiveTable';
import ArchiveDetails from './Archive-components/ArchiveDetails';
import _ from 'lodash';







export function Archive({ entity }) {


  const ArchiveContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  `



  const PageContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    `



  const [selectedRowItem, setSelectedRowItem] = useState(null)



  const { data } = useGetArchiveData(entity);




  const handleRowSelection = useCallback((row) => {
    setSelectedRowItem(_.cloneDeep(row));
  }, []);




  return (
    <ArchiveContainer>
      <Breadcrumb serviceName={entity}></Breadcrumb>
      <PageContainer>

        <MemoizedArchiveTable
          serviceName={entity}
          selectedRow={selectedRowItem}
          handleSelection={handleRowSelection}
          data={data}
        />

        <ArchiveDetails archiveSelection={selectedRowItem} service={entity}></ArchiveDetails>

      </PageContainer>
    </ArchiveContainer>
    // </ArchiveContainer>


  )
}



const MemoizedArchiveTable = React.memo(ArchiveTable);
