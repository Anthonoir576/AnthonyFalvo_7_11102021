
/** ---- JS DOCUMENTATION LIKEROUTE.JS ----
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const express   = require('express');                         // - 01 -
const router    = express.Router();                           // - 02 -
const likeCtrl = require('../controllers/likeControllers');   // - 03 -
const auth      = require('../middleware/auth');              // - 04 -
const multer    = require('../middleware/multer');            // - 05 -
/* ################################################ */



/* ##############   MES ROUTES   ################## */
                                                              // - 06 -
router.post('/like/:postId', likeCtrl.likePost);
router.post('/dislike/:postId', likeCtrl.dislikePost);

/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = router;                                      // - 07 -
/* ################################################ */