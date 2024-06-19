import React from 'react'
import styled from 'styled-components'

export function Breadcrumb({ serviceName }) {

    const Breadcrumb = styled.div`
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 70px;
    border-color: #eb0606;
    border-bottom: 4px solid #eb0606;
    font-size: 20px;
    `


    return (
        <Breadcrumb>
            <div>
                {serviceName}
            </div>
        </Breadcrumb>
    )
}
