import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetData } from '../../hooks/useGetData';
import styled from 'styled-components';


export const USER_URL_INFO = 'https://jsonplaceholder.typicode.com/users/'

function UserDetails() {
  const { id } = useParams();

  const { data: userInfo } = useGetData(USER_URL_INFO + id);


  console.log('aaaa', userInfo);



  const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 10px;
    padding: 0 20px;
    .name-section{
       width: 100%;
       font-size: 20px;
       color: #000;
    } 
    .company-section{
      display: flex;
      flex-direction: row;
      align-items: center;
      .title{
       font-size:   15px;
       color: #526AE5;
       font-weight: 700; 
      }
      .label{
        font-size:   15px;
       color: #000;
       font-weight: 700;
      }
      
    }
      `



  if (userInfo && userInfo.id) {

    return (
      <UserInfoContainer >

        <div className='name-section'> {userInfo.name} </div>
        <div className='name-section'> {userInfo.email} </div>

        <div className='company-section'>
          <div className='title'>Company:</div>
          &nbsp;
          <div className='label'> {userInfo.company.name}</div>

        </div>


      </UserInfoContainer>
    )

  }else{
    return ( <div> </div>)
  }

}

export default UserDetails