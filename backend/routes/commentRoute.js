
/** ---- JS DOCUMENTATION COMMENTROUTE.JS ----
 *
 */



/* ##########   MES DECLARATIONS   ################ */
const express     = require('express');                        
const router      = express.Router();                          
const commentCtrl = require('../controllers/commentControllers');           
const multer      = require('../middleware/multer');           
/* ################################################ */



/* ##############   MES ROUTES   ################## */
router.post('/comment/:postId',   commentCtrl.createComment);
router.put('/comment/:id',        commentCtrl.updateComment);
router.delete('/comment/:id',     commentCtrl.deleteComment);
router.get('/',                   commentCtrl.getAllComments);
router.get('/:postId',            commentCtrl.getAllCommentsByPost);
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = router;                                     
/* ################################################ */