var express = require('express'),
  router = express.Router();

    router.get('/quizPartial', function(request, response) {
        response.render('partials/quizPartial');
    });

module.exports = router;