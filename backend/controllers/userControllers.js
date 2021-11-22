
/**  ---- JS DOCUMENTATION USERCONTROLLERS.JS ----
 * 

 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const crypto = require('crypto-js');
const models = require('../models');
const fs     = require('fs');
const { request } = require('http');
const post = require('../models/post');

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
    let pixDefault = `${request.protocol}://${request.get('host')}/images/defaults/default.png`;

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
            attributes: ['id', 'username', 'bio', 'attachment', 'createdAt', 'updatedAt'],
            where: { id: userId }
        }).then(user => {
            if (user) {

                const filename = user.attachment.split('/images/users/')[1];

                if (updateProfileUser.attachment == undefined) {
                    user.update({
                        ...updateProfileUser
                    }).then(user => response.status(201).json( user ))
                      .catch(() => response.status(500).json({ 'message': 'Erreur serveur !' }));
                } else {
                    fs.unlink(`images/users/${filename}`, () => {
                        user.update({
                            ...updateProfileUser
                        }).then(user => response.status(201).json( user ))
                          .catch(() => response.status(500).json({ 'message': 'Erreur serveur !' }));
                    });
                };

            } else {
                response.status(404).json({ 'message': 'Utilisateur inexistant !' });
            };

        }).catch(() => response.status(500).json({ 'message' : 'Erreur serveur !' }));
    } else {
        response.status(403).json({ 'message': 'Vous n\'êtes pas l\'utilisateur de ce profil !' });
    };
};
exports.deleteFeed = (request, response, next) => {
    
    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const adminId      = decodedToken.isAdmin;
    const paramsUserId = request.params.id;
    
    setTimeout(() => {
        
        models.Like.destroy({
            where: { associateId: paramsUserId }
        }).then(() => console.log('les likes des autre utilisateur associé aux publications ont été supprimé !'))
          .catch(() => response.status(400).json({ 'message': 'ERREUR 03' }));
    
          models.Comment.destroy({
            where: { associateId: paramsUserId }
        }).then(() => console.log('les commentaires des autre utilisateur associé aux publications ont été supprimé !'))
          .catch(() => response.status(400).json({ 'message': 'ERREUR 04' }));

    }, 50);
    
    setTimeout(() => {
        
        models.Like.destroy({
            where: { userId: paramsUserId }
        }).then(() => console.log('les likes de l\'utilisateur ont été supprimé !'))
          .catch(() => response.status(400).json({ 'message': 'ERREUR 01' }));
    
          models.Comment.destroy({
            where: { userId: paramsUserId }
        }).then(() => console.log('les commentaires de l\'utilisateur ont été supprimé !'))
          .catch(() => response.status(400).json({ 'message': 'ERREUR 02' }));

    }, 100);


    setTimeout(() => {

        const filename = post.attachment.split('/images/')[1];

        fs.unlink(`images/${filename}`, () => {
            models.Post.destroy({
                where: { userId: paramsUserId }
            }).then(() => console.log('les publications de l\'utilisateur ont été supprimé !'))
              .catch(() => response.status(400).json({ 'message': 'ERREUR 05' }));
        });

        
    }, 200);

    setTimeout(() => {
        
        models.User.destroy({ where: {id : paramsUserId} })
        .then(()=> {return response.status(200).json({ 'message': `L\'utilisateur à été supprimé de la base de donnée, ainsi que tout le contenu associé !` })})
        .catch(() => response.status(400).json({ 'message': 'l\'utilisateur n\'est pas supprimé !' }));

    }, 350);
        
};

/* ################################################ */

/*
        models.User.findOne({
            where: { id : paramsUserId }
        }).then((userFound) => {

            if (userFound && (userId == paramsUserId || adminId == true)) {

                // recuperer tous les posts
                models.Post.findAll({
                    attributes: ['id'],
                    where: {userId: userFound.id}
                })
                .then( postFound => {
  
                    if (postFound) {

                        let postsUser = JSON.parse(JSON.stringify(postFound));

                        // pour chaque post trouvé
                        for (let i = 0; i < Object.values(postsUser).length; i++) {

                            let myPost = parseInt(Object.values(postsUser[i]).join(''));

                            if (i <= Object.values(postsUser).length) {
                                models.Post.findOne({
                                    where: { id: myPost }
                                }).then(post => {

                                    if (post) {

                                        const filename = post.attachment.split('/images/')[1];

                                        fs.unlink(`images/${filename}`, () => {
                                            models.Comment.destroy({
                                                where: {postId : post.id}
                                            }).then(() => console.log('Les likes/dislike associé à la publication à été supprimés avec succès !'))
                                                .catch(() => response.status(400).json({ 'message' : `Vous n\'avez pas supprimé les commentaires !` }));
                                            models.Like.destroy({
                                                where: { postId: post.id }
                                            }).then(() => console.log('Les commentaires associé à la publication à été supprimés avec succès !'))
                                                .catch(() => response.status(400).json({ 'message' : `Vous n\'avez pas supprimé les likes !` }));
                                            post.destroy()
                                            .then(() => console.log('Les publications associé à l\'utilisateur à été supprimés avec succès !'))
                                            .catch(() => response.status(400).json({ 'message' : 'La publication n\'as pas été supprimée ! ' }));
                                        });
                                    }; 
                                    
                                    if (i == Object.values(postsUser).length - 1) { 
                                        return next();
                                    };

                                }).catch(() => response.status(500).json({ "message" : "Erreur serveur !" }));

                            }
                        };
                    };

                }).catch(() => { 
                    return next()
                    response.status(400).json({ 'message': 'Erreur poste introuvable !' }) });
                    
            } else {
                return response.status(403).json({ 'message': 'Vous n\'êtes pas le propriétaire de ce profil ! ' });
            };
        })
        .catch(() => response.status(404).json({ 'message' : 'Utilisateur inexistant !' }));

*/