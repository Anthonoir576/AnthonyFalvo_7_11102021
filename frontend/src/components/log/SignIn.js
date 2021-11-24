import React, { useState } from 'react';
import axios from 'axios';

 
const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formLogin = (e) => {
        e.preventDefault();

        const emailOrPasswordError = document.querySelector('.error');

        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}api/auth/login`,
            withCredentials: true,
            data: {
                email: email,
                password: password
            }
        }).then((result) => {
            if (result.data.errors){
                emailOrPasswordError.innerHTML = (result.data.errors)
            } else {
                window.location = '/';
            }
        }).catch((errors) => {
            console.log(errors);
        })
    };

    return (
        <form action="" onSubmit={formLogin} id="sign-up-form">
            <label htmlFor="email">E-mail :</label>
            <input  type="text"
                    name="email"
                    id="email" 
                    onChange={
                       (e) => setEmail(e.target.value)
                    } 
                    value={email}/>

            <label htmlFor="password">Mot de passe :</label>
            <input  type="password" 
                    name="password" 
                    id="password" 
                    onChange={
                       (e) => setPassword(e.target.value)
                    } 
                    value={password}/>
            <div className="error"></div>        
            <button type="submit">Ce connecter</button>
        </form>
    );
};

export default SignIn;