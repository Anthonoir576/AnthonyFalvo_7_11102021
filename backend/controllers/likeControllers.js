
/** ---- JS DOCUMENTATION LIKECONTROLLERS.JS ----
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
exports.likePost = (request, response, next) => {

    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const postId       = parseInt(request.params.postId);

    if (postId <= 0) {
        return response.status(400).json({ 'message': 'paramètre invalide' });
    };

    if (userId) {
        models.Post.findOne({
            where: { id : postId }
        }).then( (post) => {
    
            if (post) {
                models.Like.findOne({
                    where : { userId: userId, postId: postId }
                }).then((tableauLike) => {
    
                    if (!tableauLike) {
                        models.Like.create({
                            userId: userId,
                            postId: postId,
                            like: 1,
                            dislike: 0
                        }).then(() => {
                            post.update({
                                likes: post.likes + 1
                            }).then(() => response.status(200).json({ 'message': 'Le like est ajouté à la publication [code:01]' }))
                              .catch(() => response.status(400).json({ 'message': 'Le like n\'est pas ajouté à la publication [code:01]'}));
                        })
                        .catch(() => response.status(400).json({ 'message': 'Le like ne fonctionne pas [code:01]'})); 
                        
                        
                    } else if (tableauLike && tableauLike.like == 1) {
                        tableauLike.destroy().then(() => {
                            post.update({
                                likes: post.likes - 1
                            }).then(() => response.status(200).json({ 'message': 'Le like est retiré de la publication [code:02]' }))
                              .catch(() => response.status(400).json({ 'message': 'Le like n\'est pas retiré de la publication [code:02]'}));
                        })
                        .catch(() => response.status(400).json({ 'message': 'Le retrait du like ne fonctionne pas [code:02]'})); 
                        
                    // On peut plus etre a zero vu que ta destroy si 0 sur les deux    
                    } else if (tableauLike && tableauLike.dislike == 0 && tableauLike.like == 0) {
                        tableauLike.update({
                            like: 1
                        }).then(() => {
                            post.update({
                                likes: post.likes + 1
                            }).then(() => response.status(200).json({ 'message': 'Le like est ajouté à la publication [code:03]' }))
                              .catch(() => response.status(400).json({ 'message': 'Le like n\'est pas ajouté la publication [code:03]'}));
                        })
                        .catch(() => response.status(400).json({ 'message': 'Le like ne fonctionne pas [code:03]'}));  
                          
    
                    } else if (tableauLike && tableauLike.dislike != 0) {
                        return response.status(400).json({ 'message': 'Vous avez déjà disliker cette publication [code:04]' });
                    };

                }).catch(() => {
                    models.Like.create({
                        userId: userId,
                        postId: postId,
                        like: 1,
                        dislike: 0
                    }).then(() => {
                        post.update({
                            likes: post.likes + 1
                        }).then(() => response.status(200).json({ 'message': 'Le like est ajouté à la publication [code:05]' }))
                          .catch(() => response.status(400).json({ 'message': 'Le like n\'est pas ajouté à la publication [code:05]'}));
                    })
                      .catch(() => response.status(400).json({ 'message': 'Le like ne fonctionne pas [code:05]'}));
                });
            } else {
                return response.status(404).json({ 'message': 'Aucune publication trouvé ! [code:06]' });
            };
        }).catch(() => response.status(500).json({ 'message': 'Erreur serveur ! [code:07]' }));
    } else {
        return response.status(401).json({ 'message': 'Vous n\'êtes pas authentifié !' });
    };

};
exports.dislikePost = (request, response, next) => {

    const token        = request.cookies.jwt;
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const postId       = parseInt(request.params.postId);

    if (postId <= 0) {
        return response.status(400).json({ 'message': 'paramètre invalide' });
    };

    if (userId) {
        models.Post.findOne({
            where: { id : postId }
        }).then( (post) => {
    
            if (post) {
                models.Like.findOne({
                    where : { userId: userId, postId: postId }
                }).then((tableauLike) => {
    
                    if (!tableauLike) {
                        models.Like.create({
                            userId: userId,
                            postId: postId,
                            like: 0,
                            dislike: 1
                        }).then(() => {
                            post.update({
                                dislikes: post.dislikes + 1
                            }).then(() => response.status(200).json({ 'message': 'Le dislike est ajouté à la publication [code:01]' }))
                              .catch(() => response.status(400).json({ 'message': 'Le dislike n\'est pas ajouté à la publication [code:01]'}));
                        })
                        .catch(() => response.status(400).json({ 'message': 'Le dislike ne fonctionne pas [code:01]'})); 
                        
    
                    } else if (tableauLike && tableauLike.dislike == 1) {
                        tableauLike.destroy().then(() => {
                            post.update({
                                dislikes: post.dislikes - 1
                            }).then(() => response.status(200).json({ 'message': 'Le dislike est retiré de la publication [code:02]' }))
                              .catch(() => response.status(400).json({ 'message': 'Le dislike n\'est pas retiré de la publication [code:02]'}));
                        })
                        .catch(() => response.status(400).json({ 'message': 'Le retrait du dislike ne fonctionne pas [code:02]'})); 
                        
                    // On peut plus etre a zero vu que ta destroy si 0 sur les deux      
                    } else if (tableauLike && tableauLike.dislike == 0 && tableauLike.like == 0) {
                        tableauLike.update({
                            dislike: 1
                        }).then(() => {
                            post.update({
                                dislikes: post.dislikes + 1
                            }).then(() => response.status(200).json({ 'message': 'Le dislike est ajouté à la publication [code:03]' }))
                              .catch(() => response.status(400).json({ 'message': 'Le dislike n\'est pas ajouté la publication [code:03]'}));
                        })
                        .catch(() => response.status(400).json({ 'message': 'Le dislike ne fonctionne pas [code:03]'}));  
                          
    
                    } else if (tableauLike && tableauLike.like != 0) {
                        return response.status(400).json({ 'message': 'Vous avez déjà liker cette publication [code:04]' });
                    };
    
                }).catch(() => {
                    models.Like.create({
                        userId: userId,
                        postId: postId,
                        like: 0,
                        dislike: 1
                    }).then(() => {
                        post.update({
                            dislikes: post.dislikes + 1
                        }).then(() => response.status(200).json({ 'message': 'Le dislike est ajouté à la publication [code:05]' }))
                          .catch(() => response.status(400).json({ 'message': 'Le dislike n\'est pas ajouté à la publication [code:05]'}));
                    })
                      .catch(() => response.status(400).json({ 'message': 'Le dislike ne fonctionne pas [code:05]'}));
                });
            } else {
                return response.status(404).json({ 'message': 'Aucune publication trouvé ! [code:06]' })
            };
        }).catch(() => response.status(500).json({ 'message': 'Erreur serveur ! [code:07]' }));    
    } else {
        return response.status(401).json({ 'message': 'Vous n\'êtes pas authentifié !' });
    };
};
/* ################################################ */