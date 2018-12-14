// Constants
var TIME_PER_FRAME = 33;
var CANVAS_HEIGHT = 700;
var GRID_Y = 20;
var GRID_SIZE = 450;

// Globals
var canvas;
var ctx;
var canvasWidth;
var gridX;

var savedTime;

$(document).ready(function() {
	// Initialize canvas and context
	canvas = $("#puzzleCanvas");
	ctx = canvas[0].getContext("2d");
	setCanvasWidth();
	canvas[0].height = CANVAS_HEIGHT;

	// Create event handlers
	$(window).on("resize", setCanvasWidth);
	canvas.on("mousedown", onDown);
	canvas.on("mouseup", onUp);
	canvas.on("mousemove", onMove);
	$("#submit").on("click", onSubmit);
	
	// Start loop
	savedTime = Date.now();
	loop = setInterval(update, TIME_PER_FRAME);
});

function setCanvasWidth() {
	canvasWidth = $("#canvasWidth").width();
	canvas[0].width = canvasWidth;

	gridX = (canvasWidth / 2) - (GRID_SIZE / 2);
};

function onDown(e) {
	console.log("click at x-pos " + getXClick(e) + " and y-pos " + getYClick(e) + ".");
}

function onUp(e) {
}

function onMove(e) {
}

function onSubmit() {
}

function update() {
	setTime();
	clear();
	drawGrid();
	drawPieces();
}

function setTime() {
	var currentTime = Date.now();
	var difference = currentTime - savedTime;
	console.log("time difference is " + difference);
	var timeElapsed = Math.floor(difference / 1000);
	var timeLeft = 120 - timeElapsed;
	if (timeLeft <= 0) {
		savedTime = currentTime;
	}

	var minutes = Math.floor(timeLeft / 60);
	var seconds = timeLeft % 60;
	var secondsString;
	if (seconds < 10) {
		secondsString = "0" + seconds;
	} else {
		secondsString = "" + seconds;
	}

	var timeString = "Time until morph: " + minutes + ":" + secondsString;
	$("#time").text(timeString);
}

function clear() {
	var oldFill = ctx.fillStyle;
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvasWidth, CANVAS_HEIGHT);
	ctx.fillStyle = oldFill;
	ctx.strokeRect(0, 0, canvasWidth, CANVAS_HEIGHT);
}

function drawGrid() {
	var boxSize = GRID_SIZE / 9;
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			ctx.strokeRect(gridX + (boxSize * i), GRID_Y + (boxSize * j), boxSize, boxSize);
		}
	}
}

function drawPieces() {
	ctx.lineWidth = 3;
	var boxSize = GRID_SIZE / 3;
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			ctx.strokeRect(gridX + (boxSize * i), GRID_Y + (boxSize * j), boxSize, boxSize);
		}
	}

	ctx.lineWidth = 1;
}

// Return the X position of the click relative to the canvas
function getXClick(e) {
	return e.pageX - canvas.offset().left + canvas.scrollLeft();
}

// Return the Y position of the click relative to the canvas
function getYClick(e) {
	return e.pageY - canvas.offset().top + canvas.scrollTop();
}
