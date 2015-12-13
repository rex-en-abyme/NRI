var _ = require('underscore');

function getDistributionPerUnique(requests, data) {
  var output = {};
  var addedCount = 0;
  var iterationsLeft = requests;
  while (iterationsLeft > 0) {
    _.each(data, function(item, id) {
      if (addedCount >= requests) {
        return output;
      }
      if(output[id]) {
        output[id] += 1;
      } else {
        output[id] = 1;
      }
      ++addedCount;
    });
    --iterationsLeft;
  }
  return output;
};

function getIdsFor(strandData, standardData, strandId) {
  var ids = [];
  var indicesForStrand = getIndicesFor(strandData, strandId);
  _.each(indicesForStrand, function(item) {
    ids.push(standardData[item]);
  });
  return ids;
};

function getIndicesFor(data, id) {
  var indices = [];
  _.each(data, function(item, index) {
    if(item === id) {
      indices.push(index);
    }
  });
  return indices;
};

function getUniques(data) {
  var output = {};
  _.each(data, function(item, index) {
    if(output[item]) {
      output[item].push(index);
    } else {
      output[item] = [index];
    }
  });
  return output;
};

module.exports = {
  getDistributionPerUnique: getDistributionPerUnique,
  getIdsFor: getIdsFor,
  getIndicesFor: getIndicesFor,
  getUniques: getUniques
};
