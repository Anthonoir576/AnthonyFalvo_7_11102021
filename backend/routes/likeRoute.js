
/** ---- JS DOCUMENTATION LIKEROUTE.JS ----
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const express   = require('express');                         // - 01 -
const router    = express.Router();                           // - 02 -
const likeCtrl  = require('../controllers/likeControllers');   // - 03 -
const auth      = require('../middleware/auth');              // - 04 -
/* ################################################ */



/* ##############   MES ROUTES   ################## */
                                                              // - 06 -
router.post('/like/:postId',    auth, likeCtrl.likePost);
router.post('/dislike/:postId', auth, likeCtrl.dislikePost);

/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = router;                                      // - 07 -
/* ################################################ */