
/**  ---- JS DOCUMENTATION USERCONTROLLERS.JS ----
 * 

 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const crypto = require('crypto-js');
const models = require('../models');

require('dotenv')
    .config({ path: './config/.env' }); 
/* ################################################ */




/* ############   CONTROLLERS   ################### */
exports.signup = (request, response, next) => {     // - 06 -

    let email    = request.body.email.trim();
    let username = request.body.username.trim();
    let password = request.body.password.trim();
    let bio      = request.body.bio.trim();


    if (email == null || username == null || password == null) {
        return response.status(400).json({ 'error': 'Paramètre manquant' });
    };

    models.User.findOne({
        attributes: ['email'],
        where: { email: email }
    })
    .then((userFound) => {
        if(!userFound) {
            bcrypt.hash(password, 10, (err, hash) => {
                let newUser = models.User.create({
                    email: email,
                    username: username,
                    password: hash,
                    bio: bio,
                    isAdmin: 0
                }).then((newUser) => { return response.status(201).json({ 'userId': newUser.id });
                }).catch((error)  => { return response.status(500).json({ 'error': 'Impossible de s\'enregistrer ' }) });
            });

        } else {
            return response.status(400).json({ 'error': 'Utilisateur déjà existant' });
        };
    })
    .catch((error) => { response.status(500).json({ 'error': 'erreur serveur' })});

    
};

exports.login  = (request, response, next) => {     // - 07 -

    let email    = request.body.email;
    let password = request.body.password;

    if (email == null || password == null) {
        return response.status(400).json({ 'error': 'Paramètre manquant' });
    };

    models.User.findOne({
        where: { email: email }
    })
    .then((userFound) => {
        if(userFound) {
            bcrypt.compare(password, userFound.password, (errorBcrypt, responseBcrypt) => {
                if (responseBcrypt){
                    return response.status(200).json({
                        // a verif sur userId si correspond
                        userId: userFound.id,
                        token: jwt.sign(
                            { userId: userFound.id,
                              isAdmin: userFound.isAdmin},
                            `${process.env.TOKEN_KEY}`,
                            { expiresIn: '12h'}
                        )
                    });
                } else {
                    return response.status(403).json({ 'error': 'Mot de passe et ou e-mail invalide' });
                }
            });

        } else {
            return response.status(403).json({ 'error': 'Mot de passe et ou e-mail invalide' });
        };
    })
    .catch((error) => { response.status(500).json({ 'error': 'erreur serveur' })});

};
/* ################################################ */