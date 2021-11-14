
/** ---- JS DOCUMENTATION REGEX.JS ----
 * 
 * 
 */



/* ##############    EXPORT     ################### */
module.exports = (request, response, next) => {     // - 02 -

    let email = new RegExp('^[a-zA-Z0-9._-]+[@]+[a-zA-Z0-9.-_]+[.]+[a-z]{2,5}[ ]{0,2}$', 'g');
    let testEmail = email.test(request.body.email.trim());

    let username = new RegExp("^[a-zA-Z ,.'-]{5,20}$", 'g');
    let testUsername = username.test(request.body.username.trim());

    let password = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){4,16}$/gm);
    let testPassword = password.test(request.body.password.trim());

    try {
        
        if (testEmail && testUsername && testPassword) {

            next();

        } else if (!testEmail) {

            response.status(403).json({ message : 'ERREUR : l\'adresse e-mail n\'est pas conforme !'});

        } else if (!testPassword) {

            response.status(403).json({ message : 'ERREUR : Le mot de passe doit contenir au minimum 4 caractères, maximum 16 caractères, une majuscule, une minuscule, et un caractère spéciaux'});

        } else if (!testUsername) {

            response.status(403).json({ message : 'ERREUR : Votre nom d\'utilisateur peut contenir : 5 caractères minimum, 20 maximum et comporté que les caractères suivant : [a-z , . \' -]'});

        };

    } catch (error) {                
       
        return error; 

    };

};
/* ################################################ */