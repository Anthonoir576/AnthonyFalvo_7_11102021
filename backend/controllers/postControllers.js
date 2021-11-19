
/** ---- JS DOCUMENTATION POSTCONTROLLERS.JS ----
 * 
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const models  = require('../models');             // - 01 -
const fs      = require('fs');                    // - 02 -
const jwt     = require('jsonwebtoken');          // - 03 -
const { mode } = require('crypto-js');

require('dotenv')
    .config({ path: './config/.env' }); 
/* ################################################ */

 

/* ############   CONTROLLERS   ################### */

// AUTH uniquement sur la route
exports.createPost = (request, response, next) => {

    let title          = request.body.title;
    let content        = request.body.content;
    const token        = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;


    if (title == null || content == null) {
        return response.status(400).json({ 'error': 'Paramètre manquant' });
    } else if (title.length <= 5 || content.length <= 5){
        return response.status(400).json({ 'error': ' Le titre doit contenir 5 caractères minimums ainsi que le contenu !' });
    } else if (title.length >= 200 || content.length >= 500) {
        return response.status(400).json({ 'error': 'Le titre peut avoir maximum 200 caractères, et 500 pour le contenu !' });
    };

    models.User.findOne({
        where: { id: userId }
    }).then(user =>{

        if (user) {
            models.Post.create({
                UserId: user.id,
                title: title,
                content: content,
                username: user.username,
                likes: 0,
                dislikes: 0
            }).then( (newPost) => {
                response.status(201).json(newPost);
            }).catch(error => response.status(400).json({ error: error }));
        } else {
            return response.status(404).json({ 'error': 'Utilisateur introuvable ' });
        };

    })
    .catch(error => response.status(500).json({ error : error }));

};

// AUTH + CONTROLE SECURITE A REFAIRE EN PLUS APRES LE FRONT !!!!
exports.updatePost = (request, response, next) => {

    let title          = request.body.title;
    let content        = request.body.content;
    const token        = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const postId       = parseInt(request.params.id);



    if (title == null || content == null) {
        return response.status(400).json({ 'error': 'Paramètre manquant' });
    } else if (title.length <= 5 || content.length <= 5){
        return response.status(400).json({ 'error': ' Le titre doit contenir 5 caractères minimums ainsi que le contenu !' });
    } else if (title.length >= 200 || content.length >= 500) {
        return response.status(400).json({ 'error': 'Le titre peut avoir maximum 200 caractères, et 500 pour le contenu !' });
    };

    models.Post.findOne({
        where: { id: postId }
    }).then(post => {
        if (post) {
            post.update({
                title: (title ? title : post.title),
                content: (content ? content : post.content)
            }).then( postUpdate => response.status(200).json(postUpdate)
            ).catch(error => response.status(400).json({ error : error }));
        } else {
            return response.status(404).json({ 'error': 'Publication introuvable ' });
        };

    })
    .catch(error => response.status(500).json({ error : error }));


};

// AUTH + CONTROLE SECURITE A REFAIRE EN PLUS APRES LE FRONT !!!!
exports.deletePost = (request, response, next) => {

    const token        = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const postId       = parseInt(request.params.id);


    models.Post.findOne({
        where: { id: postId }
    }).then(post => {
        if (post) {
            post.destroy()
            .then( postDelete => response.status(200).json({ postDelete : postDelete }))
            .catch(error => response.status(400).json({ error : error }));
        } else {
            return response.status(404).json({ 'error': 'Publication introuvable ' });
        };
    })
    .catch(( )=> response.status(500).json({ "error" : "Erreur serveur" }));


};

// AUTH uniquement sur la route
exports.getAllPosts = (request, response, next) => {

    let list      = request.query.fields;
    let limit     = parseInt(request.query.limit);
    let offset    = parseInt(request.query.offset);
    let order     = request.query.order;


    models.Post.findAll({

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
            response.status(404).json({ 'error' : 'Aucun post n\'est présent dans la base de données' });
        };
    }).catch(error => response.status(500).json({ error: error }));


};

/* ################################################ */