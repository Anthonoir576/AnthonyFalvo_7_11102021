
/** ---- JS DOCUMENTATION SERVER.JS ----
 * 
 * 01. Importation du package HTTP de node.js, on aura accès a l'objet http qui nous permet notamment de créer un serveur
 * 
 * 02. Constante fessant appel a app.js.
 * 
 * 03. Appel de la variable d'environnement .env ( ou .env.example), nous permettant de ne pas mélangé nos informations sensible, via un dépôt tel que github. Ainsi garder certain élément "confidentiel", tel que les données de connection mongoDB admin, les mots de passes, etc.. Voir .env.example pour en savoir plus.
 * 
 * 04. On donne a Express comme indication sur quel port il doit tourner. On lui donne donc, les mêmes paramètres.
 * 
 * 05. Appel de la méthode createServer() du package HTTP, on place comme argument, la fonction qui serra appelée a chaque requete sur le serveur. On ferra donc appel a "app.js", qui regroupe
 * 
 * 06. La méthode listen permet d'écouter les requetes envoyés au serveur. Un peu comme un 'xxx.addEventListener()' en javaScript. Prenant comme argument le port a écouter, on peut aussi mettre un port par defaut, et une fonction une fois celui remplie. Dans notre cas on affiche un message de confirmation du port utilisé. 
 * 
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const http          = require('http');               // - 01 -
const app           = require('./app');              // - 02 -

require('dotenv')
    .config({ path: './config/.env' });              // - 03 - 

/* ################################################ */



/* ################  SERVEUR  ##################### */
app.set('port', process.env.PORT || 3000);           // - 04 -

const server = http.createServer(app);               // - 05 -
server.listen(process.env.PORT || 3000, () => {      // - 06 -

    console.log(`Le serveur fonctionne sur le port ${process.env.PORT}`);

});
/* ################################################ */