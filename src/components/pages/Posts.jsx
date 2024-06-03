import React, { useState } from 'react'
import { useGetData } from '../../hooks/useGetData'
import styled from 'styled-components'
import Post from '../root-comp/Post'


const ALL_POST_URL = 'https://jsonplaceholder.typicode.com/posts/'
const ALL_USER_URL = 'https://jsonplaceholder.typicode.com/users/'


function Posts() {


    // component styling


    const PostContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 0 20px;
    gap: 20px;
    `



    const [data, setData] = useState([]);

    const { data: posts } = useGetData(ALL_POST_URL);
    const { data: users } = useGetData(ALL_USER_URL);




    const buildPosts = (posts, users) => {
        if (posts && posts.length) {
            for (let post of posts) {
                if (post.userId) {
                    post['userInfo'] = users.find(user => user.id === post.userId);
                }
            }
            setData(posts);
        }
    }



    if ((posts && posts.length) && (users && users.length) && !data.length) {
        const postsItem = buildPosts(posts, users);
    }




    if (data) {
        return (
            <PostContainer>
                {data && data.length && data.map(item => <Post key={item.id} postData={item} />)}
            </PostContainer>
        )
    }else{
        return (
            <div>LOADING...</div>
        )

    }
}

export default Posts