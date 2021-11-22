
/** ---- JS DOCUMENTATION USERROUTE.JS ----
 * 

 */



/* ##########   MES DECLARATIONS   ################ */
const express       = require('express');                        
const router        = express.Router();                         
const regex         = require('../middleware/regex');
const auth          = require('../middleware/auth');
const userCtrl      = require('../controllers/userControllers');
const multerUsers   = require('../middleware/multer-users');
/* ################################################ */

// Auth FINI/et controle CTRL mise en place +cas crypté mail
// sur postman pour test multer du front key image value le fichier sur la route put user avc id

/* ############   CONTROLLERS   ################### */
                                                            
router.post('/signup',    regex,              userCtrl.signup);
router.post('/login',                         userCtrl.login);
router.get ('/logout',     auth,              userCtrl.logout);
router.get('/user/:id',    auth,              userCtrl.getUserProfile);
router.get('/users',       auth,              userCtrl.getAllUsers);
router.put('/user/:id',    auth, multerUsers, userCtrl.updateUserProfile);
router.delete('/user/:id', auth,              userCtrl.deleteFeed, userCtrl.deleteUser);
/* ################################################ */
                                                            
                                                            
                                                            
/* ##############    EXPORT     ################### */
module.exports = router;                                 
/* ################################################ */