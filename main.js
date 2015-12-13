var filter = require('./filter');
var types = require('./types');
var csv = require('fast-csv');
var _ = require('underscore');

/**
 * Prompt user for number of questions to answer.
 */
(function() {
  var userInput = process.argv[2];
  if( userInput === void 0 || isNaN(userInput) || userInput === '0') {
    console.log( 'Please enter an integer value greater than zero and try again!' );
    return;
  }
  var questionCountRequested = parseInt(userInput),
      questions = {}, header = true;

  csv.fromPath("questions.csv").on("data", function(data){
    if(header) {
      questions['headersIndices'] = {};
      _.each(data, function(item, idx) {
        questions[item] = [];
        questions['headersIndices'][idx] = item;
      });
      header = false;
    } else {
      _.each(data, function(item, idx) {
        var key = questions['headersIndices'][idx];
        questions[key].push(item);
      });
    }
  }).on("end", function(){
    var questionIds = (function() {
      var resultSet = [];
      function tallyResults(questionId) {
        resultSet.push(questionId);
      }
      filter(types.strandId, questionCountRequested, questions, tallyResults);
      return resultSet;
    })();
    console.log('final output', questionIds);
  });
})();

/**
 * Final thoughts:
 * 1. Is deterministic in sequential progression -> Add some randomness?
 * 2. Keep in mind performance: get rid of nested loops when possible
 */