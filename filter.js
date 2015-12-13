var helpers = require('./helpers');
var types = require('./types');
var _ = require('underscore');

var filter = function(type, requests, data, callback, parentId) {

  var ids = null;

  if(type === types.strandId) {
    ids = data[types.strandId];
  } else if(type === types.standardId) {
    ids = helpers.getIdsFor(data[types.strandId], data[types.standardId], parentId);
  } else if(type === types.questionId) {
    ids = helpers.getIdsFor(data[types.standardId], data[types.questionId], parentId);
  }

  var unique = helpers.getUniques(ids);
  var calls = helpers.getDistributionPerUnique(requests, unique);

  _.each(calls, function(val, id) {
    if(type === types.strandId) {
      var questionsPerStrand = calls[id];
      filter(types.standardId, questionsPerStrand, data, callback, id);
    } else if(type === types.standardId) {
      var questionsPerStandard = calls[id];
      filter(types.questionId, questionsPerStandard, data, callback, id);
    } else if(type === types.questionId) {
      _.times(calls[id], function() {
        callback(id);
      });
    }
  });

};

module.exports = filter;
