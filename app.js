const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./src/routes');
const sequelize = require('./config/connection');
const helpers = require('./src/utils/helpers');
const mysql2 = require('mysql2');

const app = express();
const PORT = process.env.PORT || 8080;

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const hbs = exphbs.create({helpers});
app.engine('handlebar', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({force:false}).then(()=> {
    app.listen(PORT, ()=> {
        console.log(`App listening on port ${PORT}`);
    })
}).catch(err => console.log(err));