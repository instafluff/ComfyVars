(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var values = {};
var id = 0;

function assignWatcher( obj ) {
	if( Object( obj ) !== obj ) {
		throw new TypeError( "Argument must be of type Object" );
	}
	if( !( typeof obj === "object" && obj.isWatcher ) ) { //obj instanceof Proxy ) ) {
		obj = new Proxy( obj, {
			get: function( target, prop ) {
				if( prop === "isWatcher" ) {
					return true;
				}
				if( values[ target._cvid ].isDebug ) {
					console.log( "GET:", prop );
				}
				if( values[ target._cvid ].watch ) {
					values[ target._cvid ].watch( "get", target, prop );
				}
				return target[ prop ];
			},
			set: function( target, prop, value ) {
				target[ prop ] = value;
				if( prop === "_cvid" ) { return true; }
				if( values[ target._cvid ].isDebug ) {
					console.log( "SET:", prop, "=", value );
				}
				if( values[ target._cvid ].watch ) {
					values[ target._cvid ].watch( "set", prop, value );
				}
				return true;
			}
		});
		id++;
		obj._cvid = id;
		values[ id ] = {
			isDebug: false,
			watch: undefined
		};
	}
	return obj;
}

var comfyVars = {
	version: function() {
		return "1.0.0";
	},
	Debuggable: function() {
		obj = assignWatcher( {} );
		values[ obj._cvid ].isDebug = true;
		return obj;
	},
	Watchable: function( callback ) {
		if( typeof callback !== "function" ) {
			throw new Error( "Callback must be a function" );
		}
		obj = assignWatcher( {} );
		values[ obj._cvid ].watch = callback;
		return obj;
	}
};

// Expose everything, for browser and Node..
if (typeof module !== "undefined" && module.exports) {
    module.exports = comfyVars;
}
if (typeof window !== "undefined") {
    window.ComfyVars = comfyVars;
}

},{}]},{},[1]);
