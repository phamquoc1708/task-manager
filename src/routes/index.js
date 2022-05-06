const homeRouter = require('./home')
const trashRouter = require('./trash')
const editRouter = require('./edit')
const authRouter = require('./auth')

const authenticationRouter = require('../app/middleware/authentication')

function router(app) {
    app.use('/home', authenticationRouter,homeRouter);
    app.use('/trash', authenticationRouter, trashRouter);
    app.use('/edit', authenticationRouter, editRouter);
    app.use('/users', authRouter);
}

module.exports = router;
