
/** ---- JS DOCUMENTATION MULTER-USERS.JS ----
 * 

 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const multer     = require('multer');              
const MIME_TYPES = {                                

    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'

};
/* ################################################ */



/* ##############   MIDDLEWARE   ################## */
const storage = multer.diskStorage({              

    destination: (request, file, callback) => {
        callback(null, 'images/users');
    },
    filename: (request, file, callback) => {

        const name = (Math.floor((Math.random() * 19423798) * Date.now()));
        const extension = MIME_TYPES[file.mimetype];

        callback(null, name + '.' + extension);

    }
});
/* ################################################ */



/* ##############   EXPORT   ###################### */
module.exports = multer({storage: storage}).single('image');
/* ################################################ */