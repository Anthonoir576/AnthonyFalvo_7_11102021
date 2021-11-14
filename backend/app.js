
/**  ---- JS DOCUMENTATION APP.JS ----
 * 
 * 01. On importe express depuis les dépendances.
 * 
 * 02. On crée une application express.
 * 
 * 03. Importation de la dépendance Helmet.
 * 
 * 07. Path methode de node, nous donne acces au chemin de notre systeme de fichier.
 * 
 * 08. Appel de la variable d'environnement .env ( ou .env.example), nous permettant de ne pas mélangé nos informations sensible, via un dépôt tel que github. Ainsi garder certain élément "confidentiel", tel que les données de connection mongoDB admin, les mots de passes, etc.. Voir .env.example pour en savoir plus.
 * 
 * 10. Le CORS, est une sécurité qui permet d'empêcher des requêtes malveillantes d'accèder a des ressources au quelle ils n'ont pas le droit d'accèder. On rajoute donc des header pour que le navigateur sache que l'on peut utiliser l'api. Le 'Access-Control-Allow-Origin' permet de connaitre l'origine de la requête, on l'occurence on dit qu'on accepte tous le monde, via la petite * qu'on a l'habitude de voir. 'Access-Control-Allow-Headers' Permet d'autorisé certain header dans l'objet requête, on accepte donc < 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' >. On front-end on voit souvent par exemple Content-Type. Et pour finir 'Access-Control-Allow-Methods' Qui nous permet de choisir le type de requête autorisé sur l'api, exemple de verbe accepter : 'GET, POST, PUT, DELETE' qui sont necessaire au CRUD (crée, lire, mettre à jour, et supprimé).
 * 
 * 11. Helmet vous aide à protéger votre application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP. Il n’est actuellement qu’une collection de neuf fonctions middleware plus petites qui définissent des en-têtes HTTP liés à la sécurité.
 * --- EXEMPLE : ---- 
 * => csp définit l’en-tête Content-Security-Policy pour la protection contre les attaques de type cross-site scripting et autres injections intersites.
 * => hidePoweredBy supprime l’en-tête X-Powered-By.
 * => hsts définit l’en-tête Strict-Transport-Security qui impose des connexions (HTTP sur SSL/TLS) sécurisées au serveur.
 * => ieNoOpen définit X-Download-Options pour IE8+.
 * => noCache définit des en-têtes Cache-Control et Pragma pour désactiver la mise en cache côté client.
 * => noSniff définit X-Content-Type-Options pour protéger les navigateurs du reniflage du code MIME d’une réponse à partir du type de contenu déclaré.
 * => frameguard définit l’en-tête X-Frame-Options pour fournir une protection clickjacking.
 * => xssFilter définit X-XSS-Protection afin d’activer le filtre de script intersites (XSS) dans les navigateurs Web les plus récents.
 * ------------------
 * 
 * 12. Permet de convertir le corp de la requête en objet JSON exploitable. Depuis une certaine mise a jour, on utilise cette methode, avant on utilisait body-parser. Qui maintenant est inclue dans les dépendances d'express (Voir node_modules).
 * 
 * 13. MIDDLEWARE qui autorise les requêtes sur le dossier image. la methode static de express prendra comme argument le path, donc le chemin du dossier. path.join() prends en argument __dirname, donc le nom du fichier dans lequel on va ce trouver auquel on ajoute 'images'.
 * 
 * 16. Permet d'exporter app, afin de pouvoir l'utiliser via d'autre fichier 'xxx.js'.
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const express       = require('express');             // - 01 -
const app           = express();                      // - 02 -
const helmet        = require('helmet');              // - 03 -
const path          = require('path');                // - 07 -
const userRoutes    = require('./routes/userRoute');
const postRoutes    = require('./routes/postRoute');
 

require('dotenv')
    .config({ path: './config/.env' }); 
/* ################################################ */



/* ##############    CORS   ####################### */
app.use((request, response, next) => {                // - 10 -

    // autorisation à '*' donc tout le monde :
    response.setHeader('Access-Control-Allow-Origin', '*');
    // autorisation de certain en tête dans les requêtes :
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // autorisation de certaine methodes ou verbe attribué aux différentes requêtes :
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    next();

});
/* ################################################ */



/* ###########   HELMET SECURE   ################## */
app.use(helmet());                                    // - 11 -
/* ################################################ */



/* #####  CONVERTION DU CORP DE LA REQUETE   ###### */                  
app.use(express.json());                              // - 12 -   
/* ################################################ */



/* #############   MIDDLEWARE   ################### */

app.use('/images',
express.static(path.join(__dirname, 'images')));      // - 13 -

// app.use('/api/post', postRoutes);                     // - 14 - 
app.use('/api/auth', userRoutes);                     // - 15 -
app.use('/api/posts', postRoutes);                     // - 15 -
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = app;                                 // - 16 -
/* ################################################ */