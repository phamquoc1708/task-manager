const express = require('express');
const router = express.Router();

const trashController = require('../app/controllers/TrashController')
// ROUTER
router.get('/', trashController.index);
router.route('/:id').delete(trashController.deleteForce).patch(trashController.restoreTask)

module.exports = router;