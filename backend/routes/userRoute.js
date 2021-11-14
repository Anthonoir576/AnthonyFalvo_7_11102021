
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

// Auth fonctionne juste enlever pour faire test + vite


/* ############   CONTROLLERS   ################### */
                                                            // - 06 -
router.post('/signup', regex, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/:id', userCtrl.getUserProfile);
//router.put('/user/:id', userCtrl.getUserProfile);  ptet voir modif profile
/* ################################################ */
                                                            
                                                            
                                                            
/* ##############    EXPORT     ################### */
module.exports = router;                                    // - 07 -
/* ################################################ */