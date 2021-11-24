import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');

    const formRegister = async (e) => {

    };

    return (
        <form action="" onSubmit={formRegister} id='sign-up-form'>

            <label htmlFor="name">Votre Nom / Prénom :</label>
            <input type="text" 
                   id="name"
                   name="name"
                   value={username}
                   onChange={(e) => {
                       setUsername(e.target.value)
                   }}
            />

            <label htmlFor="email">Votre E-mail :</label>
            <input type="email" 
                   id="email"
                   name="email"
                   value={email}
                   onChange={(e) => {
                       setEmail(e.target.value)
                   }}
            />

            <label htmlFor="password">Votre Mot de passe :</label>
            <input type="password" 
                   id="password"
                   name="password"
                   value={password}
                   onChange={(e) => {
                       setPassword(e.target.value)
                   }}
            />

            <div className="conditionUse">
                <input type="checkbox" id="terms" />
                <label htmlFor='terms'>
                    J'accepte les 
                    <a href="/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    &nbsp;    
                    condition d'utilisation
                    </a>
                </label>
            </div>
            <div className="error">Votre contenu comporte une erreur</div>

            <button type='submit'> Vous enregistrez </button>
        </form>
    );
};

export default SignUp;