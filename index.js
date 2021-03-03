const Gpio = require('pigpio').Gpio;
const config = require('/home/pi/dev/atem-tally/tally.config.json');
const { Atem } = require('atem-connection');

const switcher = new Atem();
const redled = new Gpio(27, {mode: Gpio.OUTPUT});
const greenled = new Gpio(22, {mode: Gpio.OUTPUT});
const mainled = new Gpio(14, {mode: Gpio.OUTPUT});
const balconyled = new Gpio(15, {mode: Gpio.OUTPUT});

function off() {
	mainled.digitalWrite(0);	
	balconyled.digitalWrite(0);
}

function red() {
	redled.digitalWrite(1);	
	greenled.digitalWrite(0);
}

function green() {
	redled.digitalWrite(0);	
	greenled.digitalWrite(1);
}

red();
off();

console.log("Connecting...");
switcher.connect(config.switcherIP);

switcher.on('connected', () => {
	console.log("Connected.");
	green();
});

switcher.on('disconnected', () => {
	console.log("Lost connection!");
	red();
});

switcher.on('stateChanged', (state) => {
	// State does not always contain ME video data; Return if necessary data is missing.
	if(!state || !state.video || !state.video.ME || !state.video.ME[0])
		return;

	const preview = state.video.ME[0].previewInput;
	const program = state.video.ME[0].programInput;

	//console.log("Preview is " + preview + " Program is " + program);

	// If faded to black, lights are always off
	if(state.video.ME[0].fadeToBlack && state.video.ME[0].fadeToBlack.isFullyBlack) {
		off();
	// This camera is either in program OR preview, and there is an ongoing transition.
	} else { // Camera is not in preview or program
		off();
	}

	if(program == config.mainID) {
		off();
		mainled.digitalWrite(1);	
	} else if(program == config.balconyID) {
		off();
		balconyled.digitalWrite(1);
	} else {
		off();
	}
});
