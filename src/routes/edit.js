const express = require('express');
const router = express.Router();

const editController = require('../app/controllers/EditController');
// ROUTER
router.get('/:id', editController.index);
router.put('/:id', editController.updateTask);

module.exports = router;
