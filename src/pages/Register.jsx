import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/login");
            })
        .catch((error) => {
            setError(true)
        });
    }
  return (
    <div className='login'>
        <form onSubmit={handleRegister}>
            <p>Create an account</p>
            <input type="email" placeholder='email' onChange={e=>setEmail(e.target.value)}/>
            <input type="password" placeholder='password' onChange={e=>setPassword(e.target.value)}/>
            <button type='submit'>Register</button>
            {error && <span>Please Enter Valid Credentials</span>}
            <a href="/login">Have an account? Login</a>
        </form>   
    </div>
  )
}

export default Register
