const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(storeController.getStores));
router.get('/add', storeController.addStore);
router.get('/stores', catchErrors(storeController.getStores));
router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);
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

module.exports = router;
