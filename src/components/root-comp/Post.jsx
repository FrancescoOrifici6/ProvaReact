import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetData } from '../../hooks/useGetData';
import { useFetchOnEvent } from '../../hooks/useGetDataOnEvent';


export const POST_COMMENT_URL = 'https://jsonplaceholder.typicode.com/comments?postId='


function Post({ postData }) {


    const { data: comments, fetchData, error, loading } = useFetchOnEvent();

    const nav = useNavigate();



    const Comment = styled.div`
        display: flex;
        flex-direction: column;
        padding: 10px 0;
        .comm-name{
            font-size: 16px;
            font-weight: 700;
            color: #000;
        }

        .comm-body{
            font-size: 14px;
            font-weight: normal;
            color: #526ae5;
        }
    `




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
        .comments-link{
            cursor: pointer;
            font-weight: bold;
            font-size: 20px;
            &:hover{
                text-decoration: underline;
                color: #526ae5;
            }
        }
        .comments-section{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }

    `


    const handlePostClick = (data) => {
        console.log('data', data);
        if (data.target && data.target.id) {
            nav('/' + data.target.id);
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

            <div className='comments-link' onClick={() => fetchData(POST_COMMENT_URL + postData.id)}>
                Comments
            </div>

            {comments && comments.length &&
                <div className='comments-section'>
                    {comments.map(comment =>
                        <Comment key={comment.id}>
                            <div className='comm-name'> {comment.name} </div>
                            <div className='comm-body'> {comment.body} </div>
                        </Comment>)}
                </div>
            }

        </Post>
    )
}

export default Post