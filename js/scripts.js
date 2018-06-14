var player1 = {};
var player2 = {};
var gameBoard = {};

function Player(name) {
  this.name = name;
  this.difficulty = "";
  this.mark = "";
  this.turn = false;
  this.selections = [];
}

Player.prototype.makeComputerChoice = function(board) {
  var randomChoice = Math.floor((Math.random() * (board.coordinates.length - 1)) + 0);
  var gameTile = board.coordinates[randomChoice];
  board.removeCoordinate(randomChoice);
  this.selections.push(board.coordinates[randomChoice]);
  return gameTile;
}

Player.prototype.makePlayerChoice = function(board, coordinate) {
  var index = board.coordinates.indexOf(coordinate);
  board.removeCoordinate(index);
  this.selections.push(board.coordinates[coordinate]);
}

function Board() {
  this.coordinates = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
  this.lastMarkPlaced = "";
  this.turn = "";
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

Board.prototype.placeMark = function(player, coordinate) {
  player.selections.push(coordinate);
  this.lastMarkPlaced = coordinate;
  this.checkForWin();
}

Board.prototype.checkForWin = function(player) {
  // horizontal three of a kind A1 A2 A3 ... C1 C2 C3
  // vertical three of a kind A1 B1 C1 ... A3 B3 C3
  // diagonal one of a kind A1 B2 C3 / C1 B2 A3
  if (this.checkWinConditions(player)) {
    console.log(player.name + " wins!");
  }
}

Board.prototype.checkWinConditions = function(player) {
  var result = false;
  var counter = 0;
  var horiz1 = ["a1", "a2", "a3"];
  var horiz2 = ["b1", "b2", "b3"];
  var horiz3 = ["c1", "c2", "c3"];
  var vert1 = ["a1", "b1", "c1"];
  var vert2 = ["a2", "b2", "c2"];
  var vert3 = ["a3", "b3", "c3"];
  var diag1 = ["a1", "b2", "c3"];
  var diag2 = ["c1", "b2", "a3"];
  var winConditions = [horiz1, horiz2, horiz3, vert1, vert2, vert3, diag1, diag2];

  for(var i = 0; i < winConditions.length; i++) {
    if (counter >= 3) {
      return true;
    } else {
      counter = 0;
    }
    for(j = 0; j < winConditions[j].length; j++) {
      console.log(winConditions[i][j]);
      for(k = 0; k < player.selections.length; k++) {
        if (winConditions[i][j].includes(player.selections[k])) {
          counter++;
        }
      }
    }
  }
}

Board.prototype.checkArrayValues = function(array, selections) {
  var counter = 0;
  for(var i = 0; i < array.length; i++) {
    if (array.includes(selections[i])) counter++;
  }
  return this.checkCounter(counter);
}

Board.prototype.checkCounter = function(counter) {
  if (counter === 3) return true;
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
  player2 = new Player("Computer");
  gameBoard = new Board();
  player1.mark = $("input[name=mark]:checked").val();
  player2.mark = $('input[type="radio"]:not(:checked)').val();
  player1.difficulty = $("input[name=difficulty]:checked").val();
  startGame();
}

function startGame() {
  gameBoard.determineFirstTurn(player1, player2);
  displayTurn();
  runPlayerTurn();
}

function runPlayerTurn() {
  if (gameBoard.turn === player2.name) computerChoice();
}

function computerChoice() {
  var choice = player2.makeComputerChoice(gameBoard);
  setGameTile("#" + choice, player2.mark);
  gameBoard.setPlayerTurn(player1, player2);
  console.log("Computer chooses: " + choice);
}

function runUserChoice(element) {
  var id = $(element).attr("id");
  setGameTile("#" + id, player1.mark);
  player1.makePlayerChoice(gameBoard, id);
  gameBoard.setPlayerTurn(player1, player2);
  console.log("Player chooses: " + id);
  runPlayerTurn();
}

function setGameTile(id, playerMark) {
  $(id).addClass('selected').addClass(playerMark);
}

function displayTurn() {
  $("#gameMsgArea").text(gameBoard.announceTurn()).fadeIn(800).delay(4000).fadeOut(800);;
  $("#gameMsgBox").toggleClass("visible");
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
});
