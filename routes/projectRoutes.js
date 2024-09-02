const express = require('express');
const upload = require('../config/multerConfig');
const { addProject, getProjects } = require('../controllers/projectController');

const router = express.Router();

router.post('/project', upload.array('imageUrl', 10), addProject);
router.get('/project', getProjects);
// router.get('/')

module.exports = router;
