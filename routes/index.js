const router = require('express').Router();
const apiRoutes = require('./api');

// middleware callback function
router.use('/api', apiRoutes);


router.use((req, res) => {
    res.status(404).send(`<h1> Route not Found! </h1>`);
});

module.exports = router;