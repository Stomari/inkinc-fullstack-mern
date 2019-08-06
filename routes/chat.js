const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const User = require('../models/User');
const Tattoo = require('../models/Tattoo');
const Folder = require('../models/Folder');
const uploader = require('../configs/cloudinary-setup');



module.exports = router;
