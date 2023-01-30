const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');
const checkWork = require('../middlewares/checkWork');
const workCtrl = require('../controllers/works.controller');

router.post('/', auth, multer, checkWork, workCtrl.create);
router.get('/', workCtrl.findAll);
router.delete('/:id', auth, workCtrl.delete);

module.exports = router;

const gallery = document.getElementsByClassName(gallery);
let works = document.createElement(figure);
gallery.appendChild(projects);

works = await fetch("http://localhost:5678/api/works").then(works => works.json());

console.log(works, gallery);