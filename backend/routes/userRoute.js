
/** ---- JS DOCUMENTATION USERROUTE.JS ----
 * 

 */



/* ##########   MES DECLARATIONS   ################ */
const express  = require('express');                        
const router   = express.Router();                         
const regex    = require('../middleware/regex');
const auth     = require('../middleware/auth');
const userCtrl = require('../controllers/userControllers'); 
/* ################################################ */

// Auth FINI/et controle CTRL mise en place +cas crypté mail


/* ############   CONTROLLERS   ################### */
                                                            
router.post('/signup',    regex, userCtrl.signup);
router.post('/login',            userCtrl.login);
router.get ('/logout',     auth, userCtrl.logout);
router.get('/user/:id',    auth, userCtrl.getUserProfile);
router.get('/users',       auth, userCtrl.getAllUsers);
router.put('/user/:id',    auth, userCtrl.updateUserProfile);
router.delete('/user/:id', auth, userCtrl.deleteUser);
/* ################################################ */
                                                            
                                                            
                                                            
/* ##############    EXPORT     ################### */
module.exports = router;                                 
/* ################################################ */