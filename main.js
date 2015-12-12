/**
 * Created by airrex on 12/11/15.
 */

var csv = require('fast-csv');
var _ = require('underscore');

// The `questions.csv` file contains a mini-taxonomy.
// This taxonomy consists of __Strands__, __Standards__, and __Questions__.
// Strands have many Standards, and Standards have many Questions.
// Questions have a difficulty rating between 0 and 1, where 1 means everyone always gets the question correct, and 0 means no one ever does.

// strand_id, strand_name, standard_id,standard_name, question_id,difficulty (0 === impossible)
// 1,Nouns,1,Common Nouns,1,0.7


// The `usage.csv` file contains the relevant student usage.
// Each row describes a single student seeing and possibly answering a single question.
// Questions are first assigned to the student, and then at a later time, the student may answer the question.

// student_id,question_id,assigned_hours_ago,answered_hours_ago,,
// 1,2,1,1,,

// We would like you to write a program in ruby to select questions for a quiz.
// Please feel free to use any libraries you choose.

/**
 * For the given strandId, as evenly as possible,
 * distribute the number of questions needed among the Standards available
 */
var normalizeStandardDistribution = function(strandId, questionCountNeeded, questions) {

};

var normalizeStrandDistribution = function(questionCountRequested, questions) {

  // For the number of questions requested, normalize the number of times each strand contributes to final output

  // Get unique strands
  var uniqStrands = {};
  var strandIdentifiers = questions['strand_id'];
  _.each(strandIdentifiers, function(item, idx) {
    if(uniqStrands[item]) {
      uniqStrands[item].push(idx);
    } else {
      uniqStrands[item] = [];
    }
  });

  var uniqStrandsCount = Object.keys(uniqStrands).length;

  // Given the number of requested questions, this number of questions should come from each strand
  var questionsPerStrand = Math.floor(questionCountRequested / uniqStrandsCount);
  // In the event questions cannot be evenly divided, remainder should be randomly distributed among possible strands
  var extraQuestions = Math.ceil(questionCountRequested % uniqStrandsCount);

  var resultSetToOutput = [];
  // Go through and repeat same distribution process for each set of standards within each strand.
  _.each(uniqStrands, function(item, idx, collection) {
    normalizeStandardDistribution(idx, questionsPerStrand, questions, function(questionId) {
      resultSetToOutput.push(questionId);
    });
    // Didn't have time to finish but answer would bubble up
  });

  return resultSetToOutput;

};

/**
 * Prompt user for number of questions to answer.
 */
var begin = function() {
  var userInput = process.argv[2];

  if( userInput === void 0 || isNaN(userInput) || userInput === '0') {

    console.log('Please enter an integer value greater than zero and try again!');

  } else {

    var questionCountRequested = parseInt(userInput);
    console.log('You have asked for a ', (typeof questionCountRequested), ' of questions.');

    var questions = {}, header = true;
    csv
      .fromPath("questions.csv")
      .on("data", function(data){
        if(header === true) {
          questions['headersIndices'] = {};
          _.each(data, function(item, idx, col) {
            questions[item] = [];
            questions['headersIndices'][idx] = item;
          });
          header = false;
        } else {
          _.each(data, function(item, idx, col) {
            var key = questions['headersIndices'][idx];
            questions[key].push(item);
          });
        }
      })
      .on("end", function(){

        // Pass number of questions asked for in addition to reformatted data from the questions csv file.
        var questionIds = normalizeStrandDistribution(questionCountRequested, questions);
        console.log(questionIds);
      });

  }

};

/**
 * Begin program execution
 */
begin();