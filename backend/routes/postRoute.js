
/** ---- JS DOCUMENTATION POSTROUTE.JS ----
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const express   = require('express');                         // - 01 -
const router    = express.Router();                           // - 02 -
const postCtrl  = require('../controllers/postControllers');   // - 03 -
const auth      = require('../middleware/auth');              // - 04 -
const multer    = require('../middleware/multer');     // - 05 -
/* ################################################ */



/* ##############   MES ROUTES   ################## */
                                                              // - 06 -
router.post('/post/new',   auth, postCtrl.createPost);
router.put('/post/:id',    auth, postCtrl.updatePost);
router.delete('/post/:id', auth, postCtrl.deletePost);
router.get('/',            auth, postCtrl.getAllPosts);
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = router;                                      // - 07 -
/* ################################################ */