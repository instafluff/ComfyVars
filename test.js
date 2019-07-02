const ComfyVars = require( "./index" );

var debug = ComfyVars.Debuggable();
debug.test = "Debug World";
var testGet = debug[ "test" ];

var player = ComfyVars.Watchable( ( prop, value ) => {
	console.log( "Watching:", prop, "set to", value );
	if( prop === "xp" ) {
		checkForLevelUp();
	}
} );
player.name = "Instafluff";
player.xp = 0;

function checkForLevelUp() {
	if( player.xp > 5 ) {
		console.log( "Level up!" );
	}
}

console.log( player );
player.xp += 5;
console.log( player );
player.xp += 5; // Console: Level up!
console.log( player );
