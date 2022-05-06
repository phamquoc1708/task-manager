const Task = require('../model/Tasks');
const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose');

class HomeController {
    // [GET] /home
    async index(req, res, next) {
        let isLogin = req.user.isLogin === true; 
        const task = await Task.find({createdBy: req.user.userId});
        res.render('home', {task: mutipleMongooseToObject(task), isLogin, userName: req.user.name});
    }

    // [POST] /home
    async addTask(req, res, next) {
        req.body.createdBy = req.user.userId;
        req.body.complete = "processing";
        await Task.create({...req.body});
        res.redirect('/home/personal');
    }

    //  [DELETE] /home/:id
    async deleteTask(req, res, next) {
        const id = req.params.id;
        await Task.delete({_id: id, createdBy: req.user.userId});
        res.redirect('back');
    }

    // [GET] /home/personal
    async personal(req, res, next) {
        let isLogin = req.user.isLogin === true; 
        let tempTask = Task.find({createdBy: req.user.userId});
        // sort
        const {sort} = req.query;
        if (sort) {
            const sortList = sort.split(',').join(' ');
            tempTask = tempTask.sort(sortList);
        } else {
            tempTask = tempTask.sort('-createdAt');
        }
        const task = await tempTask;
        res.render('personal', {task: mutipleMongooseToObject(task), isLogin, userName: req.user.name});
    }
    // [GET] /home/personal/filter-date
    async filterDate(req, res, next) {
        let isLogin = req.user.isLogin === true; 
        let task  = await Task.find({createdBy: req.user.userId, date: req.body.date});
        res.render('personal', {task: mutipleMongooseToObject(task), isLogin,userName: req.user.name});
    }
}

module.exports = new HomeController;
