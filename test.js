const ComfyVars = require( "./index" );

var debug = ComfyVars.Debuggable();
debug.test = "Debug World";
var testGet = debug[ "test" ];

var example = ComfyVars.Watchable( ( event, prop, value ) => {
	console.log( "Watching:", event, prop, value );
} );
example.name = "Hello World";

console.log( example );
example.name = "Comfy World";
console.log( example );