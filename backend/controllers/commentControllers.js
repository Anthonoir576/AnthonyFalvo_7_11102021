    
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
// AUTH uniquement sur la route
exports.createComment         = (request, response, next) => {

    let attachment     = request.body.attachment;
    let content        = request.body.content;
    const token        = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const postId       = parseInt(request.params.postId);

    if (content == null) {
        return response.status(400).json({ 'error': 'Paramètre manquant' });
    } else if (content.length <= 2){
        return response.status(400).json({ 'error': ' Le contenu doit contenir 2 caractères minimums !' });
    } else if (content.length >= 500) {
        return response.status(400).json({ 'error': ' Le contenu peut avoir maximum 500 caractères !' });
    };

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
                        postId: post.id,
                        content: content,
                        attachment: (attachment ? attachment : null)
                    }).then((newComment) => { response.status(201).json(newComment) })
                    .catch(() => response.status(400).json({ 'message': 'Le commentaire n\'as pas été créer !' }));
                } else {
                    return response.status(404).json({ 'error': 'Publication introuvable ' });
                };
           }).catch(() => response.status(500).json({ 'message': 'Le commentaire n\'as pas été créer !' }));
        } else {
            return response.status(404).json({ 'error': 'Utilisateur introuvable ' });
        };

    }).catch(() => response.status(500).json({ 'message': 'Utilisateur inexistant et/ou erreur serveur ' }));

};
// AUTH + CONTROLE SECURITE A REFAIRE EN PLUS APRES LE FRONT !!!!
exports.updateComment         = (request, response, next) => {
    
    let attachment     = request.body.attachment;
    let content        = request.body.content;
    const token        = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const commentId       = parseInt(request.params.id);

    
    if (content == null) {
        return response.status(400).json({ 'error': 'Paramètre manquant' });
    } else if (content.length <= 2){
        return response.status(400).json({ 'error': ' Le contenu doit contenir 2 caractères minimums !' });
    } else if (content.length >= 500) {
        return response.status(400).json({ 'error': ' Le contenu peut avoir maximum 500 caractères !' });
    };

    models.Comment.findOne({
        where: {id: commentId }
    }).then((comment) => {

        if (userId == comment.userId) {

            if (comment) {
                comment.update({
                    content: (content ? content : comment.content),
                    attachment: (attachment ? attachment : comment.attachment)
                }).then(commentUpdate => response.status(200).json(commentUpdate))
                    .catch(() => { response.status(400).json({'message': 'Votre commentaire n\'est pas mise à jour !'})});
            } else {
                return response.status(404).json({ 'error': 'Commentaire introuvable ' });
            };

        } else {
            return response.status(403).json({ 'message': 'Vous n\'êtes pas le propriétaire de ce commentaire'});
        };

    }).catch(() => {response.status(500).json({'erreur': 'Erreur serveur'})});



};
// AUTH + CONTROLE SECURITE A REFAIRE EN PLUS APRES LE FRONT !!!!
exports.deleteComment         = (request, response, next) => {

    const token        = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const commentId       = parseInt(request.params.id);

    console.log('----------');
    console.log(commentId);
    console.log('----------');

    models.Comment.findOne({
        where: { id: commentId }
    }).then((comment) => {

        console.log('----------');
        console.log(comment);
        console.log('----------');

        if (userId == comment.userId) {

            if (comment) {

                console.log('----------');
                console.log(comment == true);
                console.log('----------');

                comment.destroy()
                .then(() => response.status(200).json({'message': 'Commentaire supprimé !'}))
                .catch(() => response.status(400).json({'message' : 'Une erreur c\'est produite lors de la tentative de suppression du commentaire ...'}));
            } else {
                return response.status(404).json({ 'message': 'Ce commentaire est introuvable !'});
            };

        } else {
            return response.status(403).json({ 'message': 'Vous n\'êtes pas le propriétaire de ce commentaire'});
        };

    }).catch(() => { response.status(500).json({ 'message': 'Erreur serveur' })});

};
// AUTH uniquement sur la route
exports.getAllComments        = (request, response, next) => {

    models.Comment.findAll()
    .then((comments) =>{
        if (comments) {
            return response.status(200).json(comments);
        };
    }).catch(() => {
        response.status(404).json({'message': 'Les commentaires dans la base de données n\'ont pas été trouvés !'})
    });

};
// AUTH uniquement sur la route
exports.getAllCommentsByPost  = (request, response, next) => {

    const postId = parseInt(request.params.postId);

    models.Comment.findAll({
        where: { postId: postId } 
    })
    .then((comments) => response.status(200).json(comments))
    .catch(() => { response.status(404).json({'message': 'Les commentaires dans la base de données n\'ont pas été trouvés !'})
    });
    


};
/* ################################################ */