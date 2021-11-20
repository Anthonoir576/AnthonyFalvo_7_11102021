
/** ---- JS DOCUMENTATION COMMENTROUTE.JS ----
 *
 */



/* ##########   MES DECLARATIONS   ################ */
const express     = require('express');                         // - 01 -
const router      = express.Router();                           // - 02 -
const commentCtrl = require('../controllers/commentControllers');   // - 03 -
const auth        = require('../middleware/auth');              // - 04 -
const multer      = require('../middleware/multer');            // - 05 -
/* ################################################ */



/* ##############   MES ROUTES   ################## */
router.post('/comment/:postId',  auth, commentCtrl.createComment);
router.put('/comment/:id',       auth, commentCtrl.updateComment);
router.delete('/comment/:id',    auth, commentCtrl.deleteComment);
router.get('/',                  auth, commentCtrl.getAllComments);
router.get('/:postId',           auth, commentCtrl.getAllCommentsByPost);
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = router;                                      // - 07 -
/* ################################################ */