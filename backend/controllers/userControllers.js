
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

require('dotenv')
    .config({ path: './config/.env' }); 
/* ################################################ */

// mettre en place crypto une fois que la visiblité des mails serra plus utile.



/* ############   CONTROLLERS   ################### */
exports.authentification = (request, response, next) => {
    
    const token = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId = decodedToken.userId;
    const userAdmin = decodedToken.isAdmin;

    if (userId == true) {
        response.status(200).json({userId: userId, isAdmin: userAdmin});
    } else {
        response.status(400).json('Token innexistant !');
    };

};
exports.signup = (request, response, next) => {    

    let email      = request.body.email.trim();
    let username   = request.body.username.trim();
    let password   = request.body.password.trim();
    
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
                    bio: '...',
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
                    return response.status(403).json({ message: 'Mot de passe et ou e-mail invalide !' });
                }
            });

        } else {
            return response.status(403).json({ message: 'Mot de passe et ou e-mail invalide !' });
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

    const bioModifier  = request.body.bio.trim();
    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const adminId      = decodedToken.isAdmin;
    const paramsUserId = request.params.id;
    
    const MIME_TYPES = {                                

        'jpg': 'jpg',
        'jpeg': 'jpg',
        'png': 'png',
        'gif': 'gif'
    
    };
    
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

                if (updateProfileUser.attachment == undefined) {
                    user.update({
                        ...updateProfileUser
                    }).then(user => response.status(201).json( user ))
                      .catch(() => response.status(500).json({ 'message': 'Erreur serveur !' }));

                } else if (updateProfileUser.attachment !== undefined) {

                    const filename = user.attachment.split('/images/users/')[1];
                    //const fileTest = filename.split('.')[1];

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
exports.deleteUser = (request, response, next) => {
    
    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const adminId      = decodedToken.isAdmin;
    const paramsUserId = request.params.id;
  
    if (userId == paramsUserId || adminId == true) {
         
        // suppression like et commentaire des autres utilisateurs associé au profile de l'utilisateur supprimé
        setTimeout(() => {
            
            models.Like.destroy({
                where: { associateId: paramsUserId }
            }).then(() => console.log('les likes des autre utilisateur associé aux publications ont été supprimé !'))
            .catch(() => response.status(400).json({ 'message': 'CODE ERREUR 01' }));
        
            models.Comment.destroy({
                where: { associateId: paramsUserId }
            }).then(() => console.log('les commentaires des autre utilisateur associé aux publications ont été supprimé !'))
            .catch(() => response.status(400).json({ 'message': 'CODE ERREUR 02' }));

        }, 1);
        
        // suppression like et commentaire de l'utilisateur supprimé
        setTimeout(() => {
            
            models.Like.destroy({
                where: { userId: paramsUserId }
            }).then(() => console.log('les likes de l\'utilisateur ont été supprimé !'))
            .catch(() => response.status(400).json({ 'message': 'CODE ERREUR 03' }));
        
            models.Comment.destroy({
                where: { userId: paramsUserId }
            }).then(() => console.log('les commentaires de l\'utilisateur ont été supprimé !'))
            .catch(() => response.status(400).json({ 'message': 'CODE ERREUR 04' }));

        }, 5);

        // suppression des images des publications de lutilisateur supprimé
        setTimeout(() => {

            models.Post.findAll({
                attributes: ['id'],
                where: {userId: paramsUserId}
            })
            .then( postFound => {

                if (postFound) {

                    let postsUser = JSON.parse(JSON.stringify(postFound));

                    for (let i = 0; i < Object.values(postsUser).length; i++) {

                        let myPost = parseInt(Object.values(postsUser[i]).join(''));

                        if (i <= Object.values(postsUser).length) {
                            models.Post.findOne({
                                where: { id: myPost }
                            }).then(post => {

                                if (post) {
                                    const filename = post.attachment.split('/images/')[1];

                                    fs.unlink(`images/${filename}`, () => {
                                    console.log('Fichier supprimé !');
                                    });
                                }; 
                            }).catch(() => response.status(404).json({ "message" : " La publication n\'est pas disponible dans la base de données !" }));
                        };
                    };
                };
            }).catch(() => { response.status(500).json({ 'message': 'Aucune publication trouvé dans la base de données !' }) });
            
        }, 10);

        // suppression des publications de lutilisateur supprimé
        setTimeout(() => {
            models.Post.destroy({
                where: { userId: paramsUserId }
            }).then(() => console.log('les publications de l\'utilisateur ont été supprimé !'))
            .catch(() => response.status(400).json({ 'message': 'CODE ERREUR 05' }));
        }, 20);

        // suppression de lutilisateur (visé à être supprimé)
        setTimeout(() => {
            
            models.User.destroy({ where: {id : paramsUserId} })
            .then(()=> {return response.status(200).json({ 'message': `L\'utilisateur à été supprimé de la base de donnée, ainsi que tout le contenu associé !` })})
            .catch(() => response.status(400).json({ 'message': 'l\'utilisateur n\'est pas supprimé !' }));

        }, 50);
            
    } else {
        return response.status(403).json({ 'message': 'Vous n\'êtes pas autorisé à supprimer cette utilisateur !' })
    };
};

/* ################################################ */
