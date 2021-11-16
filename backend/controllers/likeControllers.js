
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

    // RAS
    //console.log(postId);
    //console.log(userId);

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
                        if (!userLike) {
                            post.addUser(user).then( (post) => {
                                post.update({
                                    likes: post.likes + 1,
                                }).then(response.status(200).json({ post: post, postFound: post,  user: user, userLike: userLike }))
                                  .catch(error => response.status(500).json({error : error, message : 'Erreur de maj like post'}));
                            }).catch(response.status(500).json({ 'error': 'Erreur serveur 1' }));
                        } else {
                            console.log(userLike.userId); 
                            console.log(userLike.postId); 
                            response.status(500).json({ 'error': 'Erreur serveur 2' });
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