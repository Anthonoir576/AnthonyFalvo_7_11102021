
/** ---- JS DOCUMENTATION POSTROUTE.JS ----
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const express   = require('express');                        
const router    = express.Router();                          
const postCtrl  = require('../controllers/postControllers');  
const auth      = require('../middleware/auth');              
const multer    = require('../middleware/multer');   
/* ################################################ */



/* ##############   MES ROUTES   ################## */
                                                             
router.post('/post/new',   auth, postCtrl.createPost);
router.put('/post/:id',    auth, postCtrl.updatePost);
router.delete('/post/:id', auth, postCtrl.deletePost);
router.get('/',            auth, postCtrl.getAllPosts);
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = router;                                     
/* ################################################ */