const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(storeController.getStores));
router.get('/add', authController.isLoggedIn, storeController.addStore);
router.get('/stores', catchErrors(storeController.getStores));
router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);
router.get('/logout', authController.logout);
router.get('/account', authController.isLoggedIn, userController.account);
router.get('/account/reset/:token', catchErrors(authController.reset));
router.get('/map', storeController.mapPage);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/login', authController.login);
router.post('/add', 
  storeController.upload, 
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
);

router.post('/add/:id', 
  storeController.upload, 
  catchErrors(storeController.resize),
  catchErrors(storeController.updateStore)
);

router.post('/register', 
  userController.validateRegister,
  userController.register,
  authController.login
);

router.post('/account/forgot', catchErrors(authController.forgot))
router.post('/account/reset/:token', 
  authController.confirmedPasswords,
  catchErrors(authController.update)
);

router.get('/hearts', authController.isLoggedIn, catchErrors(storeController.getHearts));


// API

router.get('/api/search', catchErrors(storeController.searchStores));
router.get('/api/stores/near', catchErrors(storeController.mapStores));
router.post('/api/stores/:id/heart', catchErrors(storeController.heartStore));


module.exports = router;
