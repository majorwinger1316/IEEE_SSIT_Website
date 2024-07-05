import React, { useState } from 'react';
import "../styles/Register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore"; 

function Register() {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save additional user details in Firestore
            await setDoc(doc(db, "users", user.uid), {
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email
            });

            navigate("/login");
        } catch (error) {
            console.error('Error during registration:', error);
            setError(true);
        }
    }

    return (
        <div className='register'>
            <form onSubmit={handleRegister}>
                <p>Create an account</p>
                <input type="text" placeholder='Username' onChange={e => setUsername(e.target.value)} required/>
                <input type="text" placeholder='First Name' onChange={e => setFirstName(e.target.value)} required/>
                <input type="text" placeholder='Last Name' onChange={e => setLastName(e.target.value)} required/>
                <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} required/>
                <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} required/>
                <button type='submit'>Register</button>
                {error && <span>Please Enter Valid Credentials</span>}
                <a href="/login">Have an account? Login</a>
            </form>   
        </div>
    );
}

export default Register;
