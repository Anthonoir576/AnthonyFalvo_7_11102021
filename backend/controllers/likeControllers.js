
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
    }).then(post => {
        if (post) {
            models.User.findOne({
                where: { id: userId }
            }).then( user => {
                response.status(200).json({ post: post, user : user })
            }).catch( error => response.status(500).json({ error: error }));
        } else {
            response.status(404).json({ 'error': 'Le post à déjà été aimer' });
        };
    }).catch(error => response.status(500).json({ error: error }));

};


exports.dislikePost = (request, response, next) => {



};
/* ################################################ */