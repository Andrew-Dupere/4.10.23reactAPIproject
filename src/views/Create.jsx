import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Create({loggedIn, flashMessage}) {

    const navigate = useNavigate({ loggedIn, flashMessage});

    useEffect (() => {
        if (!loggedIn){
            flashMessage('You are not logged in','danger')
            navigate('/login')

        }
    })

    async function handleSubmit(event){
        event.preventDefault();

        let title = event.target.title.value;
        let content = event.target.body.value;

        let token = localStorage.getItem('token');

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);
        
        let rBody = JSON.stringify({ title, content})

        //this is where the app makes a POST request to the backend api route
        let res = await fetch ('https://kekambas-blog-api.onrender.com/api/posts',{
            method: 'POST',
            headers: myHeaders,
            body: rBody
        })
        let data = await res.json();
        
        if (data.error){
            flashMessage(data.error, 'danger')
        } else {
            flashMessage(`${data.title} is your new post`, 'success')
            navigate('/')
        }
    }


  return (
    <>
    <h3 className="text-center">Create A Post!</h3>
    <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
            <input type="text" name="title" className="form-control my-3" placeholder='Enter Title' />
            <textarea name="body" className="form-control my-3" placeholder='Enter Body' />
            <input type="submit" value="Create Post" className='btn btn-success w-100' />
        </div>
    </form>
    </>
  )
}
