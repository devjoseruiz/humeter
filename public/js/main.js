var getTime = function(time){
	var date = new Date(time);

	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	if(hours < 10) hours = '0' + hours;
	if(minutes < 10) minutes = '0' + minutes;
	if(seconds < 10) seconds = '0' + seconds;

	return hours + ':' + minutes + ':' + seconds;
};

$(document).ready(function(){
	var addr = $(location).attr('protocol') + '//' + $(location).attr('host'),
		socket = io.connect(addr); // Pointing to the correct server

	// Start with a void chart
	var humidity = [undefined],
		temperature = [undefined],
		times = [undefined],
		data = {
			labels: times,
			series: [
				humidity,
				temperature
			]
		};

	var chart = new Chartist.Line('.ct-chart', data, {
		fullWidth: true,
		showArea: true, // Draw colored areas under each line
		plugins: [ // Configure plugin for Chartist
			Chartist.plugins.ctPointLabels({
				textAnchor: 'middle',
				labelInterpolationFnc: function(value){
					return value.toFixed(2)
				}
			})
		]
	});

	// On new data, refresh chart...
	socket.on('update', function(measurer){
		humidity.push(measurer.humidity);
		temperature.push(measurer.temperature);
		times.push(getTime(Date.now()));

		// If there are more than 10 values,
		// remove the first
		if(times.length > 10){
			humidity.shift();
			temperature.shift();
			times.shift();
		}

		chart.update(data);
	});
});