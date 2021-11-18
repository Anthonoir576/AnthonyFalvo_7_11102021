
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

// mettre en place crypto une fois que la visiblité des mails serra plus utile.


/* ############   CONTROLLERS   ################### */
exports.signup = (request, response, next) => {     // - 06 -

    let email      = request.body.email.trim();
    let username   = request.body.username.trim();
    let password   = request.body.password.trim();
    let bio        = request.body.bio.trim();
    let pixDefault = './images/users/default.jpg'; // A RAJOUTER PLUS TARD EXEMPLE fictif

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
                    attachment: pixDefault,
                    bio: bio,
                    isAdmin: 0
                }).then((newUser) => { return response.status(201).json({ 'userId': newUser.id });
                }).catch(()  => { return response.status(500).json({ 'error': 'Impossible de s\'enregistrer ' }) });
            });

        } else {
            return response.status(400).json({ 'error': 'Utilisateur déjà existant' });
        };
    })
    .catch(() => { response.status(500).json({ 'error': 'erreur serveur' })});

    
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
    .catch(() => { response.status(500).json({ 'error': 'erreur serveur' })});

};

exports.getUserProfile = (request, response, next) => {

    models.User.findOne({
        attributes: ['id', 'email', 'username', 'bio', 'createdAt'], 
        where: { id: request.params.id } 
    })
    .then(user => {
        if (user) {
            response.status(200).json(user);
        } else {
            response.status(404).json({'error': 'Utilisateur introuvable '});
        }
    })  
    .catch(() => response.status(500).json({ 'error' : 'Erreur serveur' }));

};

exports.updateUserProfile = (request, response, next) => {

    const attachment   = request.body.attachment;
    const bioModifier  = request.body.bio;
    const token        = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;

    if (request.body.id == userId) {

        models.User.findOne({
            attributes: ['id', 'bio'],
            where: { id: userId }
        }).then(user => {
    
            if (user) {
                user.update({
                    bio: (bioModifier ? bioModifier : user.bio),
                    attachment: (attachment ? attachment : user.attachment)
                }).then(user=> response.status(201).json( user ))
                  .catch(error => response.status(500).json({ error: error }));
            } else {
                response.status(404).json({ 'error': 'Utilisateur inexistant' });
            };

        }).catch(() => response.status(500).json({ 'error' : 'Erreur serveur' }));

    } else {
        response.status(403).json({ 'error': 'Vous n\'êtes pas l\'utilisateur de ce profil' });
    };

};

exports.deleteUser = (request, response, next) => {
    
    const token        = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const paramsUserId = request.params.id;

    models.User.findOne({
        where: { id: userId, isAdmin: (true || 1) }
    }).then((userAdmin) => {

        if (userAdmin) { 

            models.User.findOne({
                where: { id : paramsUserId }
            }).then((userFound) => {

                if (userFound) {
                    userFound.destroy()
                             .then(userFound => response.status(200).json('Utilisateur supprimé !' + userFound))
                             .catch(() => response.status(400).json({ 'message': 'l\'utilisateur n\'est pas supprimé !' }));
                }
            })
              .catch(() => response.status(404).json({ 'message' : 'Utilisateur inexistant !' }));

        } else {
            return response.status(403).json({ 'message' : 'Vous n\'êtes pas administrateur ! ' });
        };

    }).catch(() => response.status(500).json({ 'message' : 'Erreur serveur !' }));

};
/* ################################################ */