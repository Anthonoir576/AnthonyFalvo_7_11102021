
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
router.post('/signup',    regex, userCtrl.signup);
router.post('/login',            userCtrl.login);
router.get ('/logout',     auth, userCtrl.logout);
router.get('/user/:id',    auth, userCtrl.getUserProfile);
router.get('/users',       auth, userCtrl.getAllUsers);
router.put('/user/:id',    auth, userCtrl.updateUserProfile);
router.delete('/user/:id', auth, userCtrl.deleteUser);
/* ################################################ */
                                                            
                                                            
                                                            
/* ##############    EXPORT     ################### */
module.exports = router;                                    // - 07 -
/* ################################################ */