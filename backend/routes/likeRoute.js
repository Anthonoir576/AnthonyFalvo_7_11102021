
/** ---- JS DOCUMENTATION LIKEROUTE.JS ----
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const express   = require('express');                       
const router    = express.Router();                           
const likeCtrl  = require('../controllers/likeControllers');   
const auth      = require('../middleware/auth');             
/* ################################################ */



/* ##############   MES ROUTES   ################## */
                                                              
router.post('/like/:postId',    auth, likeCtrl.likePost);
router.post('/dislike/:postId', auth, likeCtrl.dislikePost);

/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = router;                                     
/* ################################################ */