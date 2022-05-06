const User = require('../model/User');
const { BadRequestError, UnauthenticatedError } = require('../../errors');

class AuthController {
    // [GET] /users/login
    async indexLogin(req, res, next) {
        res.render('login');
    }

    // [GET] /users/register
    async indexRegister(req, res, next) {
        res.render('register');
    }

    // [POST] /users/login
    async login(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BadRequestError('Please provide a valid email and password');
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            res.render('login', {msg: 'Invalid password'});
        } else {
            const isPasswordCorrect = user.comparePassword(password);
            isPasswordCorrect
                .then(function (result) {
                    if (result) {
                        const token = user.createJWT();
                        req.session.Token = 'Bearer ' + token;
                        res.redirect('/home');
                    } else {
                        res.render('login', {msg: 'Invalid password'});
                    }
                })
        }

    }

    // [GET] /users/logout
    async logout(req, res, next) {
        req.session.destroy();
        res.redirect('/home');
    }

    // [POST] /users/register
    async register(req, res, next) {
        const tempUser = await User.findOne({email: req.body.email});
        if (tempUser) {
            res.render('register', {msg: 'Email already exists'});
        } else {
            const user = await User.create({ ...req.body });
            const token = await user.createJWT();
            req.session.Token = 'Bearer ' + token;
            res.redirect('/home');
        }

    }
}

module.exports = new AuthController;
