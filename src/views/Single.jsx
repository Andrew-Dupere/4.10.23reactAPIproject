import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';

export default function SinglePost() {
    const params = useParams();

    const [post, setPost] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/${params.postId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPost(data);
            })
    }, [params.postId])
    
    return (
        <div>
            <Post post={post} />
        </div>
    )
}