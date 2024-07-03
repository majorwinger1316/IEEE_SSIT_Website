import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import "../styles/Login.css"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

function Login() {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const {dispatch} = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch({type:"LOGIN", payload: user})
                navigate("/")
            })
            .catch((error) => {
                setError(true)
            });
    }
  return (
    <div className='login'>
        <form onSubmit={handleLogin}>
            <p>Welcome</p>
            <input type="email" placeholder='email' onChange={e=>setEmail(e.target.value)}/>
            <input type="password" placeholder='password' onChange={e=>setPassword(e.target.value)}/>
            <button type='submit'>Login</button>
            {error && <span>Wrong Email or Password!</span>}
            <a href="/register">Create an account</a>
        </form>   
    </div>
  )
}

export default Login
