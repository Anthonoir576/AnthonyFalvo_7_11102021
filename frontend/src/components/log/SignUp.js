import React, { useState } from 'react';
import axios from 'axios';
import SignIn from './SignIn';

const SignUp = () => {

    const [username, setUsername]     = useState('');
    const [email, setEmail]           = useState('');
    const [password, setPassword]     = useState('');
    const [formSubmit, setFormSubmit] = useState(false);
 


    const formRegister = async (e) => {

        e.preventDefault();

        const errorCheck = document.getElementById('terms');
        const termsError = document.querySelector('.terms');
        const error      = document.querySelector('.errorAll');

             error.innerHTML = ('');
        termsError.innerHTML = ('');

        if (!errorCheck.checked) {
            termsError.innerHTML = ('Veuillez acceptez les conditions d\'utilisation de l\'entreprise groupomania');
        } else {

            await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
                withCredentials: true,
                data: {
                    email: email,
                    username: username,
                    password: password
                }
            }).then((result) => {

                if (result.data.message){
                    error.innerHTML = result.data.message;
                } else {
                    setFormSubmit(true);
                }
                
            })
              .catch((errors) => console.log(errors));
        }




    };


    return (

        <>
            {formSubmit ? (
                <>
                    <SignIn />
                    <span></span>
                    <h4 className='success'>Votre inscription a était validé . Veuillez-vous connecter !</h4>
                </>
            ): (
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
                        &thinsp;
                        conditions d'utilisation
                        </a>
                    </label>
                </div>

                <div className="terms error"></div>       

                <div className="errorAll error"></div>

                <button type='submit'> Vous enregistrez </button>

            </form>
            )}
        </>
    );
        
};

export default SignUp;