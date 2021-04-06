var express = require('express'),
	app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var serialport = require('serialport').SerialPort,
	sp = new serialport('/dev/ttyUSB0', { // Your port here!
		baudrate: 9600 // This is the default baud rate for Arduino
	});

app.set('view engine', 'ejs');
app.use(express.static('public')); // Serving static files
app.get('/', function(req, res){
	res.render('index');
});

var port = 3000; // Your prefered server port here!

http.listen(port, function(){ // Start listening...
	console.log('Server running on http://localhost:%d', port);
});

io.sockets.on('connection', function(socket){
	sp.on('data', function(data){ // When Arduino sends data...
		var measurer = JSON.parse(data); // Parse buffer to JSON
		socket.emit('update', { // Emit to clients
			humidity: measurer.h,
			temperature: measurer.t
		});
	});
});