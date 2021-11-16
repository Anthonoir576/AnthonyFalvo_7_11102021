
/** ---- JS DOCUMENTATION LIKECONTROLLERS.JS ----
 * 
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const models = require('../models');
const jwt    = require('jsonwebtoken');

/* ################################################ */




/* ############   CONTROLLERS   ################### */
exports.likePost = (request, response, next) => {

    const token        = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const postId       = parseInt(request.params.postId);

    if (postId <= 0) {
        return response.status(400).json({ 'error': 'paramètre invalide' });
    };

    models.Post.findOne({
        where: { id : postId }
    }).then( (post) => {

        if (post) {
            models.Like.findOne({
                where : { userId: userId, postId: postId }
            }).then((like) => {

                if (!like) {
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
                    

                } else if (like && like.like == 1) {
                    like.update({
                        like: 0
                    }).then(() => {
                        post.update({
                            likes: post.likes - 1
                        }).then(() => response.status(200).json({ 'message': 'Le like est retiré de la publication [code:02]' }))
                          .catch(() => response.status(400).json({ 'message': 'Le like n\'est pas retiré de la publication [code:02]'}));
                    })
                    .catch(() => response.status(400).json({ 'message': 'Le retrait du like ne fonctionne pas [code:02]'})); 
                    

                } else if (like && like.dislike == 0 && like.like == 0) {
                    like.update({
                        like: 1
                    }).then(() => {
                        post.update({
                            likes: post.likes + 1
                        }).then(() => response.status(200).json({ 'message': 'Le like est ajouté à la publication [code:03]' }))
                          .catch(() => response.status(400).json({ 'message': 'Le like n\'est pas ajouté la publication [code:03]'}));
                    })
                    .catch(() => response.status(400).json({ 'message': 'Le like ne fonctionne pas [code:03]'}));  
                      

                } else if (like && like.dislike != 0) {
                    return response.status(400).json({ 'message': 'Vous avez déjà disliker cette publication [code:04]' });
                };

                // faudra aussi mettre a jour le compteur sur post 
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
            return response.status(404).json({ 'error': 'Aucune publication trouvé ! [code:06]' })
        };
    }).catch(() => response.status(500).json({ 'error': 'Erreur serveur ! [code:07]' }));

};

exports.dislikePost = (request, response, next) => {

    const token        = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId       = decodedToken.userId;
    const postId       = parseInt(request.params.postId);

    if (postId <= 0) {
        return response.status(400).json({ 'error': 'paramètre invalide' });
    };

    models.Post.findOne({
        where: { id : postId }
    }).then(post => {
        if (post) {
            models.User.findOne({
                where: { id: userId }
            }).then( user => {
                if (user) {
                    models.Like.findOne({
                        where: {
                            userId : userId,
                            postId: postId
                        }
                    }).then((userLike) => {
                        if (userLike) {
                            post.destroy().then( postFound => {
                                postFound.update({
                                    likes: postFound.likes --,
                                }).then(response.status(200).json({ post: post, postFound: postFound,  user: user, userLike: userLike }))
                                  .catch(error => response.status(500).json({error : error, message : 'Erreur de maj like post'}));
                            }).catch(response.status(500).json({ 'error': 'Erreur serveur' }));
                        } else { 
                            response.status(500).json({ 'error': 'Erreur serveur' })
                        };
                    }).catch( error => response.status(403).json({ Message: error }));
                };
                //response.status(200).json({ post: post, user : user });
            }).catch( error => response.status(500).json({ error: error }));
        } else {
            response.status(404).json({ 'error': 'Le post à déjà été aimer' });
        };
    }).catch(error => response.status(500).json({ error: error }));

};

/* ################################################ */