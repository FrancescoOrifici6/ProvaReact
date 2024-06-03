import React from 'react'
import styled from 'styled-components';

function Post({ postData }) {


    const Post = styled.div`
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #000;
        width: 350px;
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


    console.log('postdata', postData);
    return (
        <Post >
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