/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const {Registration,GetUsers, GetUsersId,GetUsersUpdate,GetUsersDelete}= require('../Controller/Registration.controller.js');
const Login = require('../Controller/Login.controller.js');
const profileupdate = require('../Controller/UpdateProfile.js');
router.put('/updateProfile/:id',profileupdate)
router.post('/', Registration);
router.get("/GetUsers", GetUsers);
router.get('/GetUsers/:ID', GetUsersId);
router.get('/GetUsersUpadate/:ID', GetUsersUpdate);
router.get('/GetUsersDelete/:ID', GetUsersDelete);
router.post('/login', Login);

module.exports = router;
