var express = require('express');
var cors = require('cors');
var serviceManager = require('../services/service-manager');

module.exports = function (app) {
  var router = express.Router();
  app.use(cors());

  router.get('/:query', function (req, res, next) {
    var discovery = serviceManager.get('watson-discovery');
    
    var query = req.param('query');

    console.log(query);

    var params = {
      'natural_language_query': query,
      'environment_id': 'system',
      'collection_id': 'news-en',
      return: 'text, title'
    }

    discovery.query(params, (error, results) => {
      if (error) {
        next(error);
      } else {
        res.json(results);
      }
    });
  });

  app.use("/watson", router);
}



