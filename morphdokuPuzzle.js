// Constants
var TIME_PER_FRAME = 33;
var CANVAS_HEIGHT = 700;

// Globals
var canvas;
var ctx;
var canvasWidth;

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
	loop = setInterval(update, TIME_PER_FRAME);
});

function setCanvasWidth() {
	canvasWidth = $("#canvasWidth").width();
	canvas[0].width = canvasWidth;
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
	clear();
	ctx.strokeRect(0, 0, canvasWidth, CANVAS_HEIGHT);
}

function clear() {
	var oldFill = ctx.fillStyle;
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvasWidth, CANVAS_HEIGHT);
	ctx.fillStyle = oldFill;
}

// Return the X position of the click relative to the canvas
function getXClick(e) {
	return e.pageX - canvas.offset().left + canvas.scrollLeft();
}

// Return the Y position of the click relative to the canvas
function getYClick(e) {
	return e.pageY - canvas.offset().top + canvas.scrollTop();
}
