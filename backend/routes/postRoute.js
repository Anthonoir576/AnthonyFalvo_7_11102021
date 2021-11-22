
/** ---- JS DOCUMENTATION POSTROUTE.JS ----
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const express      = require('express');                        
const router       = express.Router();                          
const postCtrl     = require('../controllers/postControllers');

const multerPost   = require('../middleware/multer-post');
/* ################################################ */



/* ##############   MES ROUTES   ################## */
                                                             
router.post('/post/new',    multerPost, postCtrl.createPost);
router.put('/post/:id',     multerPost, postCtrl.updatePost);
router.delete('/post/:id',              postCtrl.deletePost);
router.get('/',                         postCtrl.getAllPosts);
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = router;                                     
/* ################################################ */