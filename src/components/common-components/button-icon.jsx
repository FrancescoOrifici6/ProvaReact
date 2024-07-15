import React from 'react'
import { styled } from 'styled-components'


const Icon = styled.div`
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #526ae5;
    color: #fff;
     svg{
        width: 2em;
     }

`



function CommonButtonIcon({ icon, actionToCall }) {

    return (
        <Icon onClick={actionToCall}   >
            {icon}
        </Icon>
    )
}

export default CommonButtonIcon;