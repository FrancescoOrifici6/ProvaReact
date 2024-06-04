import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Post({ postData }) {



    const nav = useNavigate();


    const Post = styled.div`
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
        border-radius: 4px;
        border: 1px solid #000;
        .name{
            font-weight: bold;
            font-size: 20px;
            &:hover{
                text-decoration: underline;
                color: #526ae5;
            }
        }
        .title{
            font-size: 15px;
            text-align: start;
            color: #526ae5;
        }
        .body{
            font-size: 12px;
            text-align: start;
            color: #000;
        }

    `


    const handlePostClick = (data) => {
        console.log('data', data);
        if (data.target && data.target.id) {
            nav('/'+data.target.id);
        }
    }

    // console.log('postdata', postData);

    return (
        <Post >
            <div className='name' id={`user/${postData.userId}`} onClick={(e) => handlePostClick(e)}>
                {postData.userInfo.name}
            </div>
            <div className='title'>
                {postData.title}
            </div>
            <div className='body'>
                {postData.body}
            </div>

        </Post>
    )
}

export default Post