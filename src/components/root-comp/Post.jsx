import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetData } from '../../hooks/useGetData';
import { useFetchOnEvent } from '../../hooks/useGetDataOnEvent';
import { Spinner } from 'react-bootstrap';


export const POST_COMMENT_URL = 'https://jsonplaceholder.typicode.com/comments?postId='


function Post({ postData }) {



    // custom Hook fetch on ev => valori e funzioni restituite
    const { data: comments, fetchData: fetchComments, error, loading } = useFetchOnEvent();

    // hook che gestisce apertura area commenti
    const [opened, setOpened] = useState(false)

    // hook navigatore
    const nav = useNavigate();


    useEffect(() => {

        if (comments && comments.length) {
            setOpened(true);
        }

    }, [comments])




    const Comment = styled.div`
        display: flex;
        flex-direction: column;
        padding: 10px 0;
        .comm-head{
            gap: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;

            .comm-author{
             font-size: 13px;
             font-weight: 700;
             color: #526ae5;
           }

          .comm-name{
            font-size: 16px;
            font-weight: 700;
            color: #000;
          }

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
            display: flex;
            gap: 10px;
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



    const handleCommentsOpening = () => {

        if (!comments || !comments.length) {
            fetchComments(POST_COMMENT_URL + postData.id);
        } else {
            setOpened(prev => !prev);
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

            <div className='comments-link' onClick={() => handleCommentsOpening()}>
                Comments
                {loading &&
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
            </div>



            {comments && comments.length && opened &&
                <div className='comments-section'>
                    {comments.map(comment =>
                        <Comment key={comment.id}>
                            <div className='comm-head'>
                                <div className='comm-author'> {comment.email} </div>
                                <div className='comm-name'> {comment.name} </div>
                            </div>
                            <div className='comm-body'> {comment.body} </div>
                        </Comment>)}
                </div>
            }

        </Post>
    )
}

export default Post