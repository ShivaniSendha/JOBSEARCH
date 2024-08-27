/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const { Registration, GetUsers, GetUsersId, GetUsersUpdate } = require('../Controller/Registration.controller.js');

const Login = require('../Controller/Login.controller.js');

const { UserDelete, profileupdate } = require('../Controller/ProfileCRUD.js');



router.put('/updateProfile/:id',profileupdate)
router.post('/UserRegistration', Registration);
router.get("/GetUsers", GetUsers);
router.get('/GetUsers/:ID', GetUsersId);
router.get('/GetUsersUpadate/:ID', GetUsersUpdate);
router.delete('/UsersDelete/:id', UserDelete);
router.post('/login', Login);

module.exports = router;
