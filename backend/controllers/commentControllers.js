    
/** ---- JS DOCUMENTATION COMMENTCONTROLLERS.JS ----
 * 
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const models = require('../models');
const jwt    = require('jsonwebtoken');

require('dotenv')
    .config({ path: './config/.env' }); 
/* ################################################ */



/* ############   CONTROLLERS   ################### */
exports.createComment         = (request, response, next) => {

    let attachment     = request.body.attachment;
    let content        = request.body.content;
    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const postId       = parseInt(request.params.postId);


    if (content == null) {
        return response.status(400).json({ 'message': 'Paramètre manquant !' });
    } else if (content.length <= 2){
        return response.status(400).json({ 'message': ' Le contenu doit contenir 2 caractères minimums !' });
    } else if (content.length >= 500) {
        return response.status(400).json({ 'message': ' Le contenu peut avoir maximum 500 caractères !' });
    };

    if (userId) {
        models.User.findOne({
            where: { id: userId }
        }).then(user => {
    
            if (user) {
               models.Post.findOne({
                   where: { id: postId }
               }).then(post => {
                    if (post) {
                        models.Comment.create({
                            userId: user.id,
                            username: user.username,
                            postId: post.id,
                            associateId: post.UserId,
                            content: content,
                            attachment: (attachment ? attachment : null)
                        }).then((newComment) => { response.status(201).json(newComment) })
                        .catch(() => response.status(400).json({ 'message': 'Le commentaire n\'as pas été créer !' }));
                    } else {
                        return response.status(404).json({ 'message': 'Publication introuvable !' });
                    };
               }).catch(() => response.status(500).json({ 'message': 'Le commentaire n\'as pas été créer !' }));
            } else {
                return response.status(404).json({ 'message': 'Utilisateur introuvable !' });
            };
    
        }).catch(() => response.status(500).json({ 'message': 'Utilisateur inexistant et/ou erreur serveur !' }));
    } else {
        return response.status(401).json({ 'message': 'Vous n\'êtes pas authentifié !' });
    };
 
};
exports.updateComment         = (request, response, next) => {
    
    let attachment     = request.body.attachment;
    let content        = request.body.content;
    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const adminId      = decodedToken.isAdmin;
    const commentId    = parseInt(request.params.id);


    if (content == null) {
        return response.status(400).json({ 'message': 'Paramètre manquant !' });
    } else if (content.length <= 2){
        return response.status(400).json({ 'message': ' Le contenu doit contenir 2 caractères minimums !' });
    } else if (content.length >= 500) {
        return response.status(400).json({ 'message': ' Le contenu peut avoir maximum 500 caractères !' });
    };

    models.Comment.findOne({
        where: {id: commentId }
    }).then((comment) => {
        if (userId == comment.userId || adminId == true) {
            if (comment) {
                comment.update({
                    content: (content ? content : comment.content),
                    attachment: (attachment ? attachment : comment.attachment)
                }).then(commentUpdate => response.status(200).json(commentUpdate))
                    .catch(() => { response.status(400).json({'message': 'Votre commentaire n\'est pas mise à jour !'})});
            } else {
                return response.status(404).json({ 'message': 'Commentaire introuvable !' });
            };
        } else {
            return response.status(403).json({ 'message': 'Vous n\'êtes pas le propriétaire de ce commentaire !'});
        };
    }).catch(() => {response.status(500).json({'message': 'Erreur serveur !'})});



};
exports.deleteComment         = (request, response, next) => {

    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const adminId      = decodedToken.isAdmin;
    const commentId    = parseInt(request.params.id);
    

    models.Comment.findOne({
        where: { id: commentId }
    }).then((comment) => {

        if (userId == comment.userId || adminId == true) {
            if (comment) {
                comment.destroy()
                .then(() => response.status(200).json({'message': 'Commentaire supprimé !'}))
                .catch(() => response.status(400).json({'message' : 'Une erreur c\'est produite lors de la tentative de suppression du commentaire ...'}));
            } else {
                return response.status(404).json({ 'message': 'Ce commentaire est introuvable !'});
            };
        } else {
            return response.status(403).json({ 'message': 'Vous n\'êtes pas le propriétaire de ce commentaire !'});
        };
    }).catch(() => { response.status(500).json({ 'message': 'Erreur serveur !' })});

};
exports.getAllComments        = (request, response, next) => {

    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;


    if (userId) {
        models.Comment.findAll()
        .then((comments) =>{
            if (comments) {
                return response.status(200).json(comments);
            };
        }).catch(() => {
            response.status(404).json({'message': 'Les commentaires dans la base de données n\'ont pas été trouvés !'})
        });
    } else {
        return response.status(401).json({ 'message': 'Vous n\'êtes pas authentifié !' });
    };
};
exports.getAllCommentsByPost  = (request, response, next) => {

    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const postId = parseInt(request.params.postId);


    if (userId) {
        models.Comment.findAll({
            where: { postId: postId } 
        })
        .then((comments) => response.status(200).json(comments))
        .catch(() => { response.status(404).json({'message': 'Les commentaires dans la base de données n\'ont pas été trouvés !'})
        });
    } else {
        return response.status(401).json({ 'message': 'Vous n\'êtes pas authentifié !' });
    };
};
/* ################################################ */