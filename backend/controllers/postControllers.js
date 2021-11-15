
/** ---- JS DOCUMENTATION POSTCONTROLLERS.JS ----
 * 
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const models  = require('../models');             // - 01 -
const fs      = require('fs');                    // - 02 -
const jwt     = require('jsonwebtoken');          // - 03 -

/* ################################################ */

// a test avec token 

/* ############   CONTROLLERS   ################### */
exports.createPost = (request, response, next) => {

    let title   = request.body.title;
    let content = request.body.content;
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId = decodedToken.userId;


    if (title == null || content == null) {
        return response.status(400).json({ 'error': 'Paramètre manquant' });
    } else if (title.length <= 5 || content.length <= 5){
        return response.status(400).json({ 'error': 'Contenu / titre ne respecte pas le minimum de caractère !' });
    };

    models.User.findOne({
        where: { id: userId }
    }).then(user =>{

        if (user) {
            models.Post.create({
                UserId: user.id,
                title: title,
                content: content,
                likes: 0
            }).then( (newPost) => {
                response.status(201).json(newPost);
            }).catch(error => response.status(400).json({ error: error }));
        } else {
            return response.status(404).json({ 'error': 'Utilisateur introuvable ' })
        }

    })
      .catch(error => response.status(500).json({ error : error }));

};

exports.updatePost = (request, response, next) => {



};

exports.deletePost = (request, response, next) => {

    

};

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
            model: models.User,
            attributes: [ 'username' ]
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