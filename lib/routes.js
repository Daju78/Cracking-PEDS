var express = require('express'),
router = express.Router();

router.get("/", function(req, res) {
  res.render('index');
});

router.use('/users', require('./routes/users'));

router.use('/Questions', require('./routes/Questions'));

router.use('/partials', require('./routes/partials'));

module.exports = router;
