
/** ---- JS DOCUMENTATION USERROUTE.JS ----
 * 

 */



/* ##########   MES DECLARATIONS   ################ */
const express  = require('express');                        // - 01 -
const router   = express.Router();                          // - 02 -
const userCtrl = require('../controllers/userControllers'); // - 05 -
/* ################################################ */



/* ############   CONTROLLERS   ################### */
                                                            // - 06 -
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
/* ################################################ */
                                                            
                                                            
                                                            
/* ##############    EXPORT     ################### */
module.exports = router;                                    // - 07 -
/* ################################################ */