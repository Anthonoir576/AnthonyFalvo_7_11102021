
/** ---- JS DOCUMENTATION POSTROUTE.JS ----
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const express   = require('express');                         // - 01 -
const router    = express.Router();                           // - 02 -
const postCtrl = require('../controllers/postControllers');   // - 03 -
const auth      = require('../middleware/auth');              // - 04 -
const multer    = require('../middleware/multer');     // - 05 -
/* ################################################ */



/* ##############   MES ROUTES   ################## */
                                                              // - 06 -
router.post('/post/new', postCtrl.createPost);
//router.put('/post/:id', postCtrl.updatePost);
//router.delete('/post/:id', postCtrl.deletePost);
router.get('/', postCtrl.getAllPosts);
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = router;                                      // - 07 -
/* ################################################ */