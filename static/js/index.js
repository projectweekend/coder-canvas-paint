
$(document).ready( function() {
    
    //    Setup some variables and stuff
    var canvas = document.getElementById('my-canvas');
    var ctx = canvas.getContext('2d');    
    
    var drawColorPicker = document.getElementById("color-picker");
    var drawColor;
    
    var penSizeSlider = document.getElementById("pen-size");
    var penSize = penSizeSlider.value;
    
    var backgroundImageInput = document.getElementById("background-image");
    var backgroundImageURL = backgroundImageInput.value;
    
    var clearCanvasButton = document.getElementById("clear-canvas");    
    
    var mouse = {x: 0, y: 0};
	var lastMouse = {x: 0, y: 0};
    
    //    This draws the line on canvas
    var draw = function() {
        ctx.lineWidth = penSize;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = drawColor;        
        ctx.beginPath();
        ctx.moveTo(lastMouse.x, lastMouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();
	};
    
    var clearCanvas = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    
    var resizeCanvas = function (width, height) {
        canvas.width = width;
        canvas.height = height;
    };
    
    var setCanvasBackgroundImage = function (imageURL) {
        var newImage = new Image();
        newImage.onload = function () {
            ctx.drawImage(newImage, 0, 0);
        };
        newImage.src = imageURL;
        resizeCanvas(newImage.width, newImage.height);
    };
	
    //    Add event listeners
	canvas.addEventListener('mousemove', function(event) {
		lastMouse.x = mouse.x;
		lastMouse.y = mouse.y;
		
		mouse.x = event.pageX - this.offsetLeft;
		mouse.y = event.pageY - this.offsetTop;
	}, false);
	
	canvas.addEventListener('mousedown', function(event) {
		canvas.addEventListener('mousemove', draw, false);
	}, false);
	
	canvas.addEventListener('mouseup', function(event) {
		canvas.removeEventListener('mousemove', draw, false);
	}, false);
    
    drawColorPicker.addEventListener('change', function (event) {
        drawColor = drawColorPicker.value;
    }, false);
    
    penSizeSlider.addEventListener('change', function (event) {
        penSize = penSizeSlider.value;
    });
    
    backgroundImageInput.addEventListener('change', function (event) {
        backgroundImageURL = backgroundImageInput.value;
        clearCanvas();
        setCanvasBackgroundImage(backgroundImageURL);
    });
    
    clearCanvasButton.addEventListener('click', function (event) {
        clearCanvas();
        resizeCanvas(500, 500);
        backgroundImageInput.value = "";
    });
    
});