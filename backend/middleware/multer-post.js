
/** ---- JS DOCUMENTATION MULTER-POST.JS ----
 * 

 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const multer     = require('multer');              
const MIME_TYPES = {                                

    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'

};
/* ################################################ */



/* ##############   MIDDLEWARE   ################## */
const storage = multer.diskStorage({              

    destination: (request, file, callback) => {
        callback(null, 'images/posts');
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