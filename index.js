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
		return "@VERSION";
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