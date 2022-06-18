/**
 * Guess The Number Game
 */

// Variable to store the list of guesses 
let guesses;
// Variable for store the correct random number 
let correctNumber;
// Score
let score;

window.onload = function() {
    initGame();
    document.getElementById("number-submit").addEventListener("click", playGame);
    document.getElementById("restart-game").addEventListener("click", initGame);
}

function playGame(){
    let numberGuess = document.getElementById("number-guess").value;
    displayResult(numberGuess);
    saveGuessHistory(numberGuess);
    displayHistory();
}

// Initialize a new game by resetting all values and content on the page
function initGame(){
    score = 100;
    correctNumber = getRandomNumber();
    guesses = [];
    displayHistory();
    resetResultContent();
}

// Reset the results list display
function resetResultContent(){
    document.getElementById("result").innerHTML = "";
}

// Return random number between 1 and 1000
function getRandomNumber(){
  /**
   * Math.random returns a number between 0 and 1,
   * and that's why we multiply it by 1000
   */
    return Math.floor((Math.random() * 1000) + 1);
}

// Save the user guess entered from the input
function saveGuessHistory(guess) {
    guesses.push(guess);
}

// Display history in HTML 
function displayHistory() {
  let index = guesses.length-1;
  let list = "<ul class='list-group'>"
  while(index >= 0){
    list += 
      "<li class='list-group-item'>" + 
      "You guessed " + guesses[index] +
      "</li>";
    index-=1
  }
  list += '</ul>'
  document.getElementById("history").innerHTML = list;
}

// Display the result in HTML
function displayResult(numberGuess){
    if(numberGuess > correctNumber) {
      showNumberAbove(numberGuess-correctNumber)
    } 
    else if (numberGuess < correctNumber){
      showNumberBelow(correctNumber-numberGuess)
    } 
    else {
      showYouWon()
    }
    score--;
}

// Retrieve the dialog based on if the guess is wrong or correct 
function getDialog(dialogType, text){
  let dialog;
  switch(dialogType){
    case "warning":
      dialog = "<div class='alert alert-warning' role='alert'>";
      break;
    case "won":
      dialog = "<div class='alert alert-success' role='alert'>";
      break;
  }
  dialog += text;
  dialog += "</div>"
  return dialog;
}

function showYouWon(){
    if(score<0){
        score=0;
    }
    const text = "Awesome job, you got it! Your Score is : "+score+"/100" ;
    let dialog = getDialog('won', text);
    document.getElementById("result").innerHTML = dialog;
}

function showNumberAbove(diff){
    let text; 
    if(diff>50){
        text = "Your guess is too high!";
    }
    else{
        text = "Your guess is high!";
    }
  let dialog = getDialog('warning', text);
  document.getElementById("result").innerHTML = dialog;
}

function showNumberBelow(diff){
  let text; 
    if(diff>50){
        text = "Your guess is too low!";
    }
    else{
        text = "Your guess is low!";
    }
  let dialog = getDialog('warning', text);
  document.getElementById("result").innerHTML = dialog;
}
