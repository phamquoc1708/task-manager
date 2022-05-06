const Task = require('../model/Tasks');
const {mongooseToObject} = require('../../util/mongoose');

class EditController {
    // [GET] /edit/:id
    async index(req, res, next) {
        let isLogin = req.user.isLogin === true; 
        const task = await Task.findById(req.params.id);
        res.render('edit', {task: mongooseToObject(task), isLogin, userName: req.user.name});
    }
    
    // [PUT] /edit/:id
    async updateTask(req, res) {
        await Task.updateOne({ _id: req.params.id }, req.body);
        res.redirect('/home/personal');
    }
}

module.exports = new EditController;
