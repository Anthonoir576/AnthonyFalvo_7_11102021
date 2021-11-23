
/** ---- JS DOCUMENTATION LIKEROUTE.JS ----
 * 
 */



/* ##########   MES DECLARATIONS   ################ */
const express   = require('express');                       
const router    = express.Router();                           
const likeCtrl  = require('../controllers/likeControllers');            
/* ################################################ */



/* ##############   MES ROUTES   ################## */                                                  
router.post('/like/:postId',    likeCtrl.likePost);
router.post('/dislike/:postId', likeCtrl.dislikePost);
/* ################################################ */



/* ##############    EXPORT     ################### */
module.exports = router;                                     
/* ################################################ */