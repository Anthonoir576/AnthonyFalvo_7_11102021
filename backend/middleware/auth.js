
/** ---- JS DOCUMENTATION AUTH.JS ----
 * 

 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const jwt           = require('jsonwebtoken');     
const models        = require('../models');

require('dotenv')
    .config({ path: './config/.env' }); 
/* ################################################ */



/* ############   MIDDLEWARE    ################### */
module.exports = (request, response, next) => {     

    try {

        const token = request.cookies.jwt;

        if (token) {

            const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
            const userId = decodedToken.userId;

            if (userId){
                models.User.findOne({
                    where: { id : userId }})
                .then(userFound => { response.locals.user = userFound;})
                .catch(() => { response.status(404).json({ 'message': 'Utilisateur introuvable' })});
                next();

            } else if (!userId || userId == null || userId == undefined || userId == false) {
                response.locals.user = null;
                response.cookie('jwt', '', { maxAge: 1 });
                throw 'error';
            };
        } else {
            response.locals.user = null;
            throw 'error';
        };

    } catch (error) {             
        response.status(401).json({ error: 'ERREUR : ECHEC Authentification '})
    };

};
/* ################################################ */