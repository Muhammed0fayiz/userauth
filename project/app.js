const express = require('express');
const app = express();
const path = require('path');
const adminrouter = require('./routes/admin');
const userrouter = require('./routes/user');
const bodyparser = require('body-parser');
//session
const session=require('express-session')
const port = 3000;

app.set('view engine', 'ejs');

// express.json and express.urlencoded middleware
app.use( session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true
  })
);

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Load static assets
app.use(express.static(path.join(__dirname, 'public')));

// Routes


app.use('/', adminrouter);
app.use('/', userrouter);





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
