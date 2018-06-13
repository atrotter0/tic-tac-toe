function Player(name) {
  this.name = name;
  this.difficulty = "";
  this.playerMark = "";
}

function Board(coordinates) {
  this.coordinates = coordinates;
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
var coordinates = new Coordinate();
var gameBoard = new Board(coordinates);
