import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ flashMessage, logUserIn}) {
    const navigate = useNavigate();

    async function handleLogin(event){
        event.preventDefault()
        

        let username = event.target.username.value
        let password = event.target.password.value
        let loginCredentials = `${username}:${password}`

        let myHeaders = new Headers();

        //package the username and password to be sent to the backend api
        myHeaders.append('Authorization', `Basic ${btoa(loginCredentials)}`);

        //request a valid token from the api using the login credentials 
        let res = await fetch('https://kekambas-blog-api.onrender.com/api/token', {
            headers: myHeaders,
            method: 'POST'
        })

        let data = await res.json()

        if (data.error){
            flashMessage(data.error, 'danger')
        } else {

            let token = data.token
            let expiration = data.token_exp

            
            localStorage.setItem('token', token)
            localStorage.setItem('tokenExp', expiration)


            logUserIn(true)

            flashMessage('You have successully logged in', 'success')
            navigate('/')
        }

    }

  return (
    <>
    <h3 className="text-center">Log In to the Blog</h3>
    <form action="" onSubmit={handleLogin}>
        <div className="form-group">
            <input type="text" name="username" className="form-control my-3" placeholder='Enter Username' />
            <input type="password" name="password" className="form-control my-3" placeholder='Enter Password' />
            <input type="submit" value="Log In" className='btn btn-success w-100' />
        </div>
    </form>
</>
  )
}
