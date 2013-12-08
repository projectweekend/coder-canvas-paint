
$(document).ready( function() {
    
    var canvas = document.getElementById('my-canvas');
    var ctx = canvas.getContext('2d');    
    
    var drawColorPicker = document.getElementById("color-picker");
    var drawColor;
    
    var penSizeSlider = document.getElementById("pen-size");
    var penSize = penSizeSlider.value;
    
    var clearCanvasButton = document.getElementById("clear-canvas");    
    
    var mouse = {x: 0, y: 0};
	var lastMouse = {x: 0, y: 0};
	
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
    
    drawColorPicker.addEventListener('change', function (event) {
        drawColor = drawColorPicker.value;
    }, false);
    
    penSizeSlider.addEventListener('change', function (event) {
        penSize = penSizeSlider.value;
        console.log(ctx.lineWidth);
    });
    
    clearCanvasButton.addEventListener('click', function (event) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });    
    
});