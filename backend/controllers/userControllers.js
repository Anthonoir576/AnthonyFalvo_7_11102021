
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
exports.signup = (request, response, next) => {    

    let email      = request.body.email.trim();
    let username   = request.body.username.trim();
    let password   = request.body.password.trim();
    let bio        = request.body.bio.trim();
    let pixDefault = `${request.protocol}://${request.get('host')}/images/users/default.jpg`;

    if (email == null || username == null || password == null) {
        return response.status(400).json({ 'message': 'Paramètre manquant !' });
    };

    models.User.findOne({
        attributes: ['email'],
        where: { email: email }
    })
    .then((userFound) => {
        if(!userFound) {
            console.log(pixDefault);
            bcrypt.hash(password, 10, (err, hash) => {
                let newUser = models.User.create({
                    email: email,
                    username: username,
                    password: hash,
                    attachment: pixDefault,
                    bio: bio,
                    isAdmin: 0
                }).then((newUser) => { return response.status(201).json({ 'userId': newUser.id });
                }).catch(()  => { return response.status(500).json({ 'message': 'Impossible de s\'enregistrer !' }) });
            });

        } else {
            return response.status(400).json({ 'message': 'Utilisateur déjà existant !' });
        };
    })
    .catch(() => { response.status(500).json({ 'message': 'erreur serveur !' })});

    
};
exports.login  = (request, response, next) => { 

    let email    = request.body.email;
    let password = request.body.password;

    if (email == null || password == null) {
        return response.status(400).json({ 'message': 'Paramètre manquant !' });
    };

    models.User.findOne({
        where: { email: email }
    })
    .then((userFound) => {
        if(userFound) {

            const tokenExpires = 43200000; //12h
            const token = jwt.sign(
              { userId: userFound.id, isAdmin: userFound.isAdmin },
              `${process.env.TOKEN_KEY}`,
              {
                expiresIn: tokenExpires,
              }
            );

            bcrypt.compare(password, userFound.password, (errorBcrypt, responseBcrypt) => {
                if (responseBcrypt){

                    response.cookie('jwt', token, {httpOnly: true, maxAge: tokenExpires});
                    response.status(200).json({ userId: userFound.id });
                    
                } else {
                    return response.status(403).json({ 'message': 'Mot de passe et ou e-mail invalide !' });
                }
            });

        } else {
            return response.status(403).json({ 'message': 'Mot de passe et ou e-mail invalide !' });
        };
    })
    .catch(() => { response.status(500).json({ 'message': 'erreur serveur !' })});

};
exports.logout = (request, response, next) => {

    const token = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId = decodedToken.userId;

    if (userId) {
        response.cookie('jwt', '', { maxAge: 1 });
        response.redirect('/');
    } else {
        return response.status(403).json({ 'message': 'Vous n\'êtes pas authentifié !' });
    };
};
exports.getUserProfile = (request, response, next) => {

    const token = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId = decodedToken.userId;

    if (userId) {
        models.User.findOne({
            attributes: ['id', 'email', 'username', 'bio', 'attachment', 'createdAt', 'updatedAt'], 
            where: { id: request.params.id } 
        })
        .then(user => {
            if (user) {
                response.status(200).json(user);
            } else {
                response.status(404).json({'message': 'Utilisateur introuvable !'});
            };
        })  
        .catch(() => response.status(500).json({ 'message' : 'Erreur serveur !' }));
    } else {
        return response.status(403).json({ 'message': 'Vous n\'êtes pas authentifié !' });
    };

};
exports.getAllUsers = (request, response, next) => {

    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;

    if (userId) {
        models.User.findAll({
            attributes: ['username', 'id', 'attachment', 'createdAt', 'updatedAt']
        })
        .then((users) => {
            if (users) {
            response.status(200).json(users);
            } else {
                return response.status(404).json({ 'message' : 'Aucun utilisateur trouvé !' })
            };
        })
        .catch(() => { response.status(404).json({ 'message' : 'Les utilisateurs ne sont pas disponible !' })});
    } else {
        return response.status(401).json({ 'message': 'Vous n\'êtes pas authentifié !' });
    };
};
exports.updateUserProfile = (request, response, next) => {

    const bioModifier  = request.body.bio;
    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const adminId      = decodedToken.isAdmin;
    const paramsUserId = request.params.id;
    
    const updateProfileUser = request.file ?
    {
        bio : bioModifier,
        attachment: `${request.protocol}://${request.get('host')}/images/users/${request.file.filename}`

    } : { ...request.body };

    if (paramsUserId == userId || adminId == true) {
        models.User.findOne({
            attributes: ['id', 'bio'],
            where: { id: userId }
        }).then(user => {
            if (user) {
                user.update({
                    ...updateProfileUser
                }).then(user => response.status(201).json( user ))
                  .catch(() => response.status(500).json({ 'message': 'Erreur serveur !' }));
            } else {
                response.status(404).json({ 'message': 'Utilisateur inexistant !' });
            };

        }).catch(() => response.status(500).json({ 'message' : 'Erreur serveur !' }));
    } else {
        response.status(403).json({ 'message': 'Vous n\'êtes pas l\'utilisateur de ce profil !' });
    };
};
exports.deleteUser = (request, response, next) => {
    
    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const adminId      = decodedToken.isAdmin;
    const paramsUserId = request.params.id;

    if (userId == paramsUserId || adminId == true) {
        models.User.findOne({
            where: { id : paramsUserId }
        }).then((userFound) => {
            if (userFound) {
                userFound.destroy()
                         .then(userFound => response.status(200).json({ 'message': `${userFound.username} à été supprimé de la base de donnée !` }))
                         .catch(() => response.status(400).json({ 'message': 'l\'utilisateur n\'est pas supprimé !' }));
            };
        })
          .catch(() => response.status(404).json({ 'message' : 'Utilisateur inexistant !' }));
    } else {
        return response.status(403).json({ 'message': 'Vous n\'êtes pas le propriétaire de ce profil ! ' });
    };
};
/* ################################################ */