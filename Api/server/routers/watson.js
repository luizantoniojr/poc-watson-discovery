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
      'environment_id': 'bc95484a-1f3d-41af-944e-30c3fdc7bb13',
      'collection_id': '498694b7-9194-4b44-ae65-c4e5d473ebeb',
      return: 'titulo, descricao, link'
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



