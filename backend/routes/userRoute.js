
/** ---- JS DOCUMENTATION USERROUTE.JS ----
 * 

 */



/* ##########   MES DECLARATIONS   ################ */
const express  = require('express');                        // - 01 -
const router   = express.Router();                          // - 02 -
const regex    = require('../middleware/regex');
const auth     = require('../middleware/auth');
const userCtrl = require('../controllers/userControllers'); // - 05 -
/* ################################################ */



/* ############   CONTROLLERS   ################### */
                                                            // - 06 -
router.post('/signup', regex, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/:id', userCtrl.getUserProfile);
/* ################################################ */
                                                            
                                                            
                                                            
/* ##############    EXPORT     ################### */
module.exports = router;                                    // - 07 -
/* ################################################ */