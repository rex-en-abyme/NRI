var _ = require('underscore');

/**
 * O(n)
 */
function getDistributionPerUnique(requests, data) {
  var output = {};
  var addedCount = 0;
  var iterationsLeft = requests;
  while (iterationsLeft > 0) {
    //TODO could make non-deterministic by iterating in shuffled order
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

/**
 *  O(n log n)
 */
function getIdsFor(typeIds, subtypeIds, strandId) {
  var ids = [];
  var indicesForStrand = getIndicesFor(typeIds, strandId);
  _.each(indicesForStrand, function(index) {
    ids.push(subtypeIds[index]);
  });
  return ids;
};

/**
 * O(n)
 */
function getIndicesFor(data, id) {
  var indices = [];
  _.each(data, function(item, index) {
    if(item === id) {
      indices.push(index);
    }
  });
  return indices;
};

/**
 * O(n)
 */
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
