const Task = require('../model/Tasks');
const {mutipleMongooseToObject} = require('../../util/mongoose');

class TrashController {
    // [GET] /trash
    async index(req, res, next) {
        let isLogin = req.user.isLogin === true; 
        const tasks = await Task.findDeleted();
        res.render('trash', {tasks: mutipleMongooseToObject(tasks), isLogin, userName: req.user.name});
    }

    // [DELETE] /trash/:id
    async deleteForce(req, res, next) {
        await Task.deleteOne({_id: req.params.id});
        res.redirect('back');
    }

    // [PATCH] /trash/:id
    async restoreTask(req, res, next) {
        await Task.restore({_id: req.params.id});
        res.redirect('/home/personal');
    }
}

module.exports = new TrashController;
