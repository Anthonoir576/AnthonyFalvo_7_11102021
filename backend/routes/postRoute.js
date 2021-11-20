
/** ---- JS DOCUMENTATION POSTROUTE.JS ----
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const express   = require('express');                        
const router    = express.Router();                          
const postCtrl  = require('../controllers/postControllers');             
const multer    = require('../middleware/multer');   
/* ################################################ */



/* ##############   MES ROUTES   ################## */
                                                             
router.post('/post/new',    postCtrl.createPost);
router.put('/post/:id',     postCtrl.updatePost);
router.delete('/post/:id',  postCtrl.deletePost);
router.get('/',             postCtrl.getAllPosts);
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = router;                                     
/* ################################################ */