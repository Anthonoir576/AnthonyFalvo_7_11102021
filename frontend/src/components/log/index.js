import React, { useState } from 'react';
import SignUp  from './SignUp';
import SignIn from './SignIn';


const Log = ( props ) => {

    const [signUp, setSignUp] = useState(props.signUp);
    const [signIn, setSignIn] = useState(props.signIn);

    // Visuel enregistrer / login au clique
    const formFonction = (e) => {
        if (e.target.id === "register") {
            setSignUp(true);
            setSignIn(false);
        } else if (e.target.id === "login") {
            setSignUp(false);
            setSignIn(true);
        };
    };
 
    return (
       <div className="connection-form">
           <div className="form-container">
               <ul>
                   <li onClick={formFonction} id="register" className={signUp ? "active-btn" : null}>Vous Inscrire</li>
                   <li onClick={formFonction} id="login" className={signIn ? "active-btn" : null}>Vous Connectez</li>
               </ul>
               {signUp && <SignUp />}
               {signIn && <SignIn />}
           </div>
       </div>
    );
};

export default Log;