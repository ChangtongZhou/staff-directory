const express = require('express');
const router = express.Router();

const staff_controller = require('../controllers/staff.controller');

router.get('/staffs', staff_controller.getAll);
router.get('/staff/:id', staff_controller.getOneById);
router.post('/addStaff', staff_controller.addStaff);
router.put('/staff/:id', staff_controller.editStaff);
router.delete('/staff/:id', staff_controller.deleteStaff);


module.exports = router;