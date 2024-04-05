const express = require('express');

const cors = require("cors");
const db = require('./util/database');

//const cookieSession  = require("cookie-session");

const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');
const CarRoutes = require('./routes/routes');
const sequelize = require('./util/database'); // Import Sequelize connection instance
const userRoutes = require('./routes/userRoutes');
const foldersRoutes = require('./routes/folders');
const homeRouter = require('./routes/home');


const app = express();
db.sync({alter: true}) // Set force to true to drop existing tables
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
const PORT = process.env.PORT || 3000;

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//cookies
app.get('/set-cookies', (req, res) => {
  res.setHeader('Set-Cookie', 'newUser=true');
  res.send('you got the cookies ! ')
});

// simple route
app.get('/', (req, res) => {
  res.send('Welcome to the driving school management website!');
});

app.use('/auth', authRoutes);
app.use('/Car', CarRoutes);
app.use('/User', userRoutes)
app.use('/folders', foldersRoutes)
app.use('/home', homeRouter)
app.use(errorController.get404);
app.use(errorController.get500);

sequelize.sync() // This will sync all defined models to the database
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });


//app.get('/read-cookies', (req, res) =>{})