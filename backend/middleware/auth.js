
/** ---- JS DOCUMENTATION AUTH.JS ----
 * 

 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const jwt           = require('jsonwebtoken');      // - 01 -

require('dotenv')
    .config({ path: './config/.env' }); 
/* ################################################ */



/* ############   MIDDLEWARE    ################### */
module.exports = (request, response, next) => {     // - 04 -

    try {

        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
        const userId = decodedToken.userId;


        if (request.body.userId && request.body.userId !== userId) {

            throw ' User ID non valable !';

        } else {

            next();

        };

    } catch (error) {
             
        response.status(401).json({ error: error || 'ERREUR : ECHEC Authentification '})

    };

};
/* ################################################ */