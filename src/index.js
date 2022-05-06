const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, './.env')});

const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const session = require('express-session')

const router = require('./routes'); 
const db = require('./config/db');
const errorMiddleware = require('./app/middleware/error-handler');
const notFoundMiddleware = require('./app/middleware/not-found');
// session
app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: 'somesecret', 
}));
// connect to db
db.connect();
// Static File
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Override method hbs
app.use(methodOverride('_method'));

// HTTP logger
app.use(morgan('combined'));

// Template Engine (handlebars)
var hbs = exphbs.create({
  extname: '.hbs',
  helpers: {
    // index of task
    sum: (a, b) => a + b,
    isComplete: (complete, name) => {
      if (complete == "completed") {
        return `<h6 style="width: 40%; word-wrap: break-word; margin-bottom: 0">
          <i class="fa-solid fa-circle-check" style="margin-right: 8px; color: #1fe286"></i> ${name}
        </h6>`
      } else if (complete == "processing") {
        return `<h6 style="width: 40%; word-wrap: break-word; margin-bottom: 0">
          <i class="fa-solid fa-person-running" style="margin-right: 8px; color: #42b7f5cc"></i> ${name}
        </h6>`
      } else {
        return `<h6 style="width: 40%; word-wrap: break-word; margin-bottom: 0; text-decoration: line-through;">
          <i class="fa-solid fa-circle-xmark" style="margin-right: 8px; color: #e90f22"></i> ${name}
        </h6>`
      }
    }
  }
});
// <i class="fa-solid fa-backpack"></i>
// <i class="fa-solid fa-circle-exclamation"></i>
// <i class="fa-solid fa-bug"></i>
// <i class="fa-solid fa-circle-xmark"></i>
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Route 
router(app);

// error
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Example app listening on port ${port}`)})