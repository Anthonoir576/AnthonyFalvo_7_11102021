
/** ---- JS DOCUMENTATION COMMENTROUTE.JS ----
 *
 */



/* ##########   MES DECLARATIONS   ################ */
const express     = require('express');                        
const router      = express.Router();                          
const commentCtrl = require('../controllers/commentControllers');   
const auth        = require('../middleware/auth');            
const multer      = require('../middleware/multer');           
/* ################################################ */



/* ##############   MES ROUTES   ################## */
router.post('/comment/:postId',  auth, commentCtrl.createComment);
router.put('/comment/:id',       auth, commentCtrl.updateComment);
router.delete('/comment/:id',    auth, commentCtrl.deleteComment);
router.get('/',                  auth, commentCtrl.getAllComments);
router.get('/:postId',           auth, commentCtrl.getAllCommentsByPost);
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = router;                                     
/* ################################################ */