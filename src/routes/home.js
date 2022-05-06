const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController')
// ROUTER
router.route('/').get(homeController.index).post(homeController.addTask);
router.route('/:id').delete(homeController.deleteTask);
router.route('/personal').get(homeController.personal);
router.route('/personal/filter-date').post(homeController.filterDate);

module.exports = router;
