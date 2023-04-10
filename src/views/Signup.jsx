import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup({ flashMessage}) {

    const navigate = useNavigate();

    const handleRegister = event => {
        event.preventDefault();
        
        let password = event.target.password.value;
        let confirmPass = event.target.confirmPass.value;
        if (password !== confirmPass){
            flashMessage('passwords do not match', 'warning');
        } else{
                        
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            // myHeaders.append('Access-Control-Allow-Origin', '*')
            // myHeaders.append('mode', 'no-cors')

            let formData = JSON.stringify({

                email: event.target.email.value,
                username: event.target.username.value,
                password
            })
            
            //send the post request to the back end with the new user information
            fetch('https://kekambas-blog-api.onrender.com/api/users', {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        flashMessage(data.error, 'danger');
                    } else {
                        flashMessage(`${data.username} has been registered`, 'success');
                        navigate('/');
                    }
                })
        }
    }




  return (
    <>
    <h3 className="text-center">Sign Up</h3>
    <form action="" onSubmit={handleRegister}>
        <div className="form-group">
            <input type="text" name="firstName" className="form-control my-3" placeholder='Enter First Name' />
            <input type="text" name="lastName" className="form-control my-3" placeholder='Enter Last Name' />
            <input type="text" name="email" className="form-control my-3" placeholder='Enter Email' />
            <input type="text" name="username" className="form-control my-3" placeholder='Enter Username' />
            <input type="password" name="password" className="form-control my-3" placeholder='Enter Password' />
            <input type="password" name="confirmPass" className="form-control my-3" placeholder='Confirm Password' />
            <input type="submit" value="Sign Up" className='btn btn-success w-100' />
        </div>
    </form>
    </>
  )
}
