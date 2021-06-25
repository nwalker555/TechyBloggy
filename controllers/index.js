const router = require('express').Router();
const sequelize = require('../config/connection');

router.use('/', async (req, res) => {
    res.render('homepage')
})

module.exports = router;