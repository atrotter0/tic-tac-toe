function Player(name) {
  this.name = name;
  this.difficulty = "";
  this.playerMark = "";
  this.turn = false;
}

function Board(coordinates) {
  this.coordinates = coordinates;
  this.whoGoesFirst = "";
  this.lastMarkPlaced = "";
}

Board.prototype.determineWhoGoesFirst = function(player1, player2) {
  var coinFlip = Math.floor((Math.random() * 2) + 1);
  console.log("Coin Flip: " + coinFlip);
  if (coinFlip === 1) {
    player1.turn = true
    this.whoGoesFirst = player1.name;
  } else {
    player2.turn = true;
    this.whoGoesFirst = player2.name;
  }
  this.announceTurn();
}

Board.prototype.announceTurn = function() {
  return console.log(this.whoGoesFirst + " goes first!");
}

Board.prototype.placeMark = function(player, coordinate) {
  this.coordinates.coordinate = player.mark;
  this.lastMarkPlaced = coordinate;
  this.checkForWin();
}

Board.prototype.checkForWin = function() {

}

function Coordinate() {
  this.a1 = false;
  this.a2 = false;
  this.a3 = false;
  this.b1 = false;
  this.b2 = false;
  this.b3 = false;
  this.c1 = false;
  this.c2 = false;
  this.c3 = false;
}

var player1 = new Player("Abel");
var player2 = new Player("Computer");
var coordinates = new Coordinate();
var gameBoard = new Board(coordinates);
