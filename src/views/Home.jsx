import React, { useState, useEffect } from 'react';
import Post from '../components/Post';

export default function Home({loggedIn}) {
    
    const [posts, setPosts] = useState([])

    useEffect(() => {

        //get the posts dict from the back end        
        async function fetchPostData(){
            let response = await fetch('https://kekambas-blog-api.onrender.com/api/posts')
            let posts = await response.json()
            setPosts(posts);
        };
        
        fetchPostData();
    }, []);

    //An empty dependency array means it will only load when the page loads

    return (
        <div>
            <h1 className="text-center">This is the Blog</h1>
            {posts.map( post => <Post key={post.id} post={post} loggedIn = {loggedIn} />)}
        </div>
    )
}