
/** ---- JS DOCUMENTATION POSTCONTROLLERS.JS ----
 * 
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const models  = require('../models');           
const fs      = require('fs');                    
const jwt     = require('jsonwebtoken');         

require('dotenv')
    .config({ path: './config/.env' }); 
/* ################################################ */

 

/* ############   CONTROLLERS   ################### */
exports.createPost = (request, response, next) => {

    let title          = request.body.title;
    let content        = request.body.content;
    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;

    if (userId) {

        // Contrôle du front
        if (title == null || content == null) {

            if (request.file !== undefined) {
                const filename = request.file.filename;
                fs.unlink(`images/posts/${filename}`,() => {
                    console.log('Fichier supprimé !');              
                });
                return response.status(400).json({ 'message': 'Paramètre manquant, le fichier à été supprimé !' }); 
            } else {
                return response.status(400).json({ 'message': 'Paramètre manquant !' });
            };

        } else if (title.length <= 5 || content.length <= 5){
            
            if (request.file !== undefined) {
                const filename = request.file.filename;
                fs.unlink(`images/posts/${filename}`,() => {
                      console.log('Fichier supprimé !');         
                });
                return response.status(400).json({  'message': ' Le titre doit contenir 5 caractères minimums ainsi que le contenu, le fichier à été supprimé !' });    
            } else {
                return response.status(400).json({ 'message': ' Le titre doit contenir 5 caractères minimums ainsi que le contenu !'});
            };

        } else if (title.length >= 200 || content.length >= 500) {

            if (request.file !== undefined) {
                const filename = request.file.filename;
                fs.unlink(`images/posts/${filename}`,() => {
                    console.log('Fichier supprimé !');             
                });
                return response.status(400).json({ 'message': 'Le titre peut avoir maximum 200 caractères, et 500 pour le contenu, le fichier à été supprimé !' });   
            } else {
                return response.status(400).json({ 'message': 'Le titre peut avoir maximum 200 caractères, et 500 pour le contenu !' });
            };            
        };
    
        models.User.findOne({
            where: { id: userId }
        }).then(user => {
            if (user) {

                const createPost = request.file ?
                {
                    title: title,
                    content: content,
                    UserId: user.id,
                    username: user.username,
                    likes: 0,
                    dislikes: 0,
                    attachment: `${request.protocol}://${request.get('host')}/images/posts/${request.file.filename}`
            
                } : { 
                    title: title,
                    content: content,
                    UserId: user.id,
                    username: user.username,
                    likes: 0,
                    dislikes: 0,
                    attachment: ''
                 };
                models.Post.create({
                    ...createPost,
                }).then( (newPost) => {
                    response.status(201).json(newPost);
                }).catch(() => response.status(400).json({ 'message': 'La publication n\'as pas été crée ! ' }));
            } else {
                return response.status(404).json({ 'message': 'Utilisateur introuvable !' });
            };
        })
        .catch(() => response.status(500).json({ 'message' : 'Erreur serveur !' }));
    } else {
        return response.status(401).json({ 'message': 'Vous n\'êtes pas authentifié !' });
    };

};
exports.updatePost = (request, response, next) => {

    let title          = request.body.title;
    let content        = request.body.content;
    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const adminId      = decodedToken.isAdmin;
    const postId       = parseInt(request.params.id);


    models.Post.findOne({
        where: { id: postId }
    }).then(post => {

        if (post && (userId == post.UserId|| adminId == true)) {


            const filename = post.attachment.split('/images/')[1];
            const updatePost = request.file ?
            {   
                title: (title ? title : post.title),
                content: (content ? content : post.content),
                attachment: `${request.protocol}://${request.get('host')}/images/posts/${request.file.filename}`       
            } : { 
                title: (title ? title : post.title),
                content: (content ? content : post.content)
             };


             if (updatePost.attachment == undefined) {

                post.update({
                    ...updatePost
                }).then( postUpdate => response.status(200).json(postUpdate)
                ).catch(() => response.status(400).json({ 'message' : 'La publication n\'as pas été mise à jour !' }));

             } else {

                fs.unlink(`images/${filename}`, () => {
                    post.update({
                        ...updatePost
                    }).then( postUpdate => response.status(200).json(postUpdate)
                    ).catch(() => response.status(400).json({ 'message' : 'La publication n\'as pas été mise à jour !' }));
                });

             };

            
        } else if (!post) {
            return response.status(404).json({ 'message': 'Publication introuvable !' });
        } else if (userId !== post.UserId|| adminId !== true) {
            return response.status(403).json({ 'message': 'Vous n\'êtes pas le propriétaire de la publication !' });
        };

    })
    .catch(() => response.status(500).json({ 'message' : 'Erreur serveur !' }));

};
exports.deletePost = (request, response, next) => {

    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const adminId      = decodedToken.isAdmin;
    const postId       = parseInt(request.params.id);

    models.Post.findOne({
        where: { id: postId }
    }).then(post => {
        if (post && (userId == post.UserId || adminId == true)) {

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
                .then(() => response.status(200).json({ 'message' : `Vous avez supprimé la publication ainsi que son contenu !` }))
                .catch(() => response.status(400).json({ 'message' : 'La publication n\'as pas été supprimée ! ' }));
            });

        } else if (!post) {
            return response.status(404).json({ 'message': 'Publication introuvable !' });
        } else {
            return response.status(403).json({ 'message': 'Vous n\'êtes pas authorisé à supprimer cette publication !'});
        };
    })
    .catch(() => response.status(500).json({ "message" : "Erreur serveur !" }));

};
exports.getAllPosts = (request, response, next) => {

    let list           = request.query.fields;
    let limit          = parseInt(request.query.limit);
    let offset         = parseInt(request.query.offset);
    let order          = request.query.order;
    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;

    if (userId) {
        models.Post.findAll({
            // Limite du nombre de publication visible
            order: [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes: (list !== '*' && list != null) ? list.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.Comment
            },{
                model: models.Like
            }]
        }).then((posts) => {
            if (posts) {
                response.status(200).json(posts);
            } else {
                response.status(404).json({ 'message' : 'Aucune publication n\'est présent dans la base de données !' });
            };
        }).catch(() => response.status(500).json({ 'message': 'Erreur serveur !' }));
    } else {
        return response.status(401).json({ 'message': 'Vous n\'êtes pas authentifié !'});
    };
};
/* ################################################ */