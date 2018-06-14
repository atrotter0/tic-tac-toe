var player1 = {};
var player2 = {};
var gameBoard = {};

function Player(name) {
  this.id = "";
  this.name = name;
  this.difficulty = "";
  this.mark = "";
  this.turn = false;
  this.selections = [];
  this.strategy = [];
}

Player.prototype.makeEasyComputerChoice = function(board) {
  var randomChoice = Math.floor((Math.random() * (board.coordinates.length - 1)) + 0);
  var gameTile = board.coordinates[randomChoice];
  board.removeCoordinate(randomChoice);
  this.selections.push(gameTile);
  return gameTile;
}

Player.prototype.makeHardComputerChoice = function(board, opponent) {
  console.log("made it to hard choice");
  this.setWinCondition(board, opponent);
  var choice = Math.floor((Math.random() * (this.strategy.length - 1)) + 0);
  var gameTile = board.coordinates[choice];
  board.removeCoordinate(choice);
  this.removeStrategy(choice);
  this.selections.push(gameTile);
  return gameTile;
}

Player.prototype.makePlayerChoice = function(board, coordinate) {
  var index = board.coordinates.indexOf(coordinate);
  board.removeCoordinate(index);
  this.selections.push(coordinate);
}

Player.prototype.setWinCondition = function(board, opponent) {
  this.chooseStrategy(board, opponent);
  this.checkOpponentMarks(board, opponent);
}

Player.prototype.chooseStrategy = function(board, opponent) {
  var index = Math.floor((Math.random() * (this.strategies.length - 1)) + 0);
  this.strategy = this.strategies[index];
}

Player.protoype.checkOpponentMarks = function(board, opponent) {
  for(var i = 0; i < opponent.selections.length; i++) {
    if (this.strategy.includes(selections[i])) {
      this.chooseStrategy(board, opponent);
    }
  }
}



  // loop through strategies, compare to player selections.
  // for(var i = 0; i < strategies.length; i++) {
  //   for(var j = 0; j < strategies[i].length; j++) {
  //     // check for coordinates selected by opponent
  //     if (opponent.selections.includes(strategies[i][j])) {
  //       console.log("Matching strategy");
  //       strategies.splice(strategies[i], 1);
  //     } else {
  //       console.log("no matching strategy");
  //       if (!this.strategy.includes(strategies[i][j])) {
  //         this.strategy = strategies[i];
  //         strategies.splice(strategies[i], 1);
  //         console.log(strategies);
  //       }
  //       strategies.splice(strategies[i], 1);
  //       console.log(this.strategy);
  //       return;
  //     }
  //   }
  // }
}

Player.prototype.removeStrategy = function(choice) {
  this.strategy.splice(choice, 1);
}

function Board() {
  this.coordinates = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
  this.turn = "";
  this.strategies = [];
}

Board.prototype.determineFirstTurn = function(player1, player2) {
  var coinFlip = Math.floor((Math.random() * 2) + 1);
  console.log("Coin Flip: " + coinFlip);
  if (coinFlip === 1) {
    player1.turn = true;
    this.turn = player1.name;
  } else {
    player2.turn = true;
    this.turn = player2.name;
  }
}

Board.prototype.setPlayerTurn = function(player1, player2) {
  if (player1.turn === false) {
    player1.turn = true;
    player2.turn = false;
    this.turn = player1.name;
  } else {
    player2.turn = true;
    player1.turn = false;
    this.turn = player2.name;
  }
}

Board.prototype.announceTurn = function() {
  return this.turn + " goes first!";
}

Board.prototype.removeCoordinate = function(coordinate) {
  this.coordinates.splice(coordinate, 1);
}

Board.prototype.checkForWin = function(player) {
  // horizontal three of a kind A1 A2 A3 ... C1 C2 C3
  // vertical three of a kind A1 B1 C1 ... A3 B3 C3
  // diagonal one of a kind A1 B2 C3 / C1 B2 A3
  if (this.checkWinConditions(player)) {
    console.log(player.name + " wins!");
  }
}

Board.prototype.possibleWinConditions = function() {
  var horiz1 = ["a1", "a2", "a3"];
  var horiz2 = ["b1", "b2", "b3"];
  var horiz3 = ["c1", "c2", "c3"];
  var vert1 = ["a1", "b1", "c1"];
  var vert2 = ["a2", "b2", "c2"];
  var vert3 = ["a3", "b3", "c3"];
  var diag1 = ["a1", "b2", "c3"];
  var diag2 = ["c1", "b2", "a3"];
  var winConditions = [horiz1, horiz2, horiz3, vert1, vert2, vert3, diag1, diag2];
  return winConditions;
}

Board.prototype.checkWinConditions = function(player) {
  var winCounter = 0;
  var winConditions = this.possibleWinConditions();
  // loop through master win conditions array
  for(var i = 0; i < winConditions.length; i++) {
    if (winCounter >= 3) {
      return true;
    } else {
      winCounter = 0;
    }
    // loop through individual win condition
    for(j = 0; j < winConditions[j].length; j++) {
      // compare to player selections array
      for(k = 0; k < player.selections.length; k++) {
        if (winConditions[i][j].includes(player.selections[k])) {
          winCounter++;
        }
      }
    }
  }
  return this.checkWinCounter(winCounter);
}

Board.prototype.checkWinCounter = function(winCounter) {
  const WIN_NUMBER = 3;
  if (winCounter === WIN_NUMBER) return true;
}

function validateOptions() {
  if (nameSet() && markSet() && difficultySet()) return true;
}

function nameSet() {
  const MAX_NAME_LENGTH = 20;
  if ($("#name").val() !== "" && $("#name").val().length <= MAX_NAME_LENGTH) return true;
}

function markSet() {
  if ($("input[name=mark]:checked").length > 0) return true;
}

function difficultySet() {
  if ($("input[name=difficulty]:checked").length > 0) return true;
}

function runGame() {
  player1 = new Player($("#name").val());
  player1.id = "player1";
  player2 = new Player("Skynet");
  player2.id = "player2";
  player1.mark = $("input[name=mark]:checked").val();
  player2.mark = $('input[type="radio"]:not(:checked)').val();
  player1.difficulty = $("input[name=difficulty]:checked").val();
  gameBoard = new Board();
  gameBoard.strategies = gameBoard.possibleWinConditions();
  startGame();
}

function startGame() {
  gameBoard.determineFirstTurn(player1, player2);
  displayTurn();
  runPlayerTurn();
}

function runPlayerTurn() {
  console.log("running player turn");
  if (gameBoard.turn === player2.name && player1.difficulty === "easy") {
    setTimeout(function() { computerEasyChoice(); }, 1000);
  } else if (gameBoard.turn === player2.name && player1.difficulty === "hard") {
    setTimeout(function() { computerHardChoice(); }, 1000);
  }
}

function computerEasyChoice() {
  var choice = player2.makeEasyComputerChoice(gameBoard);
  setGameTile("#" + choice, player2);
  gameBoard.setPlayerTurn(player1, player2);
  console.log("Computer chooses: " + choice);
  runWinCheck(player2);
}

function computerHardChoice() {
  var choice = player2.makeHardComputerChoice(gameBoard, player1);
  setGameTile("#" + choice, player2);
  gameBoard.setPlayerTurn(player1, player2);
  console.log("Computer chooses: " + choice);
  runWinCheck(player2);
}

function runUserChoice(element) {
  var id = $(element).attr("id");
  setGameTile("#" + id, player1);
  player1.makePlayerChoice(gameBoard, id);
  gameBoard.setPlayerTurn(player1, player2);
  console.log("Player chooses: " + id);
  runWinCheck(player1);
}

function setGameTile(id, player) {
  $(id).addClass('selected').addClass(player.mark).addClass(player.id + "-border");
}

function runWinCheck(player) {
  if (gameBoard.checkWinConditions(player)) {
    runWin(player);
  } else {
    runPlayerTurn();
  }
}

function runWin(player) {
  $('html,body').animate({ scrollTop: 0 }, 'slow');
  $(".grid-item").off("click")
  $("#gameMsgArea").text(player.name + " wins!").removeClass("alert-info").addClass("alert-success").fadeIn(800);
  additionalMsg(player);
  $("#restartButton").slideToggle();
  console.log(player.name + " wins!");
}

function additionalMsg(player) {
  var msg = "";
  if (player.name === "Skynet") {
    msg = "You have been terminated. Mwahahahahaha!";
  } else {
    msg = "Skynet will learn from your expertise and grow stronger...";
  }
  $("#jumbo-message").text(msg);
}

function displayTurn() {
  $("#gameMsgArea").text(gameBoard.announceTurn()).fadeIn(800).delay(4000).fadeOut(800);
  $("#gameMsgBox").toggleClass("visible");
}

function resetGame() {
  location.reload();
}

$(document).ready(function() {
  $("#startButton").click(function() {
    $("#jumbo-message").text("Good luck and enjoy the game!");
    $(this).slideToggle(300);
    $("#optionsButton").slideToggle(300);
    $("#gameBoard").fadeToggle(800).css("display", "grid");
    runGame();
  });

  $(".grid-item").click(function() {
    if ($(this).hasClass("selected")) {
      $("#gameMsgArea").text("You can't click a square that has already been clicked...")
        .removeClass("alert-info").addClass("alert-danger").fadeIn(800).delay(4000).fadeOut(800);
    } else {
      runUserChoice(this);
    }
  });

  $("#optionsDone").click(function() {
    if (validateOptions()) $("#startButton").slideToggle();
  });

  $("#restartButton").click(function() {
    resetGame();
  });
});
