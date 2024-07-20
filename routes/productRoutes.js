const express = require('express');
const { create, getAll, getOne, update, remove } = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', auth, create);
router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

module.exports = router;
