# ComfyVars
Super-Easy Observable (and Debuggable!) Values in Javascript! It's like push notifications for your variables.

**ComfyVars** lets you add a callback event so you know whenever something is changed in your object.

```javascript
var normalObject = {}; // no callback
var comfyObject = ComfyVars.Watchable( ( prop, value ) => {} ); // YES CALLBACK!
```

## Instafluff ##
> *Come and hang out with us at the Comfiest Corner on Twitch! I build stuff like this live on stream!*

> https://twitch.tv/instafluff

> https://twitter.com/instafluffTV

## Instructions ##

#### Node
1. Install `comfyvars`
```
npm install comfyvars --save
```

2. Create watchable objects using ComfyVars
```javascript
var ComfyVars = require("comfyvars");
var example = ComfyVars.Watchable( ( prop, value ) => {
    console.log( "Watching:", prop, value );
} );
example.name = "Hello World";
// This will output: "Watching: name Hello World"
```

#### Browser
1. Add `comfyvars.js`
```
<script src="comfyvars.min.js"></script>
```

2. Create watchable objects using ComfyVars
```html
<html>
  <head>
    <script src="comfyvars.min.js"></script>
  </head>
  <body>
    <script type="text/javascript">
        var example = ComfyVars.Watchable( ( prop, value ) => {
            console.log( "Watching:", prop, value );
        } );
        example.name = "Hello World";
        // This will output: "Watching: name Hello World"
    </script>
  </body>
</html>
```

## Example ##

```javascript
var player = ComfyVars.Watchable( ( prop, value ) => {
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

player.xp += 5;
player.xp += 5; // Console: Level up!
```

## Debug Values

You can also debug values easily by creating a `Debuggable`:
```javascript
var debug = ComfyVars.Debuggable();
debug.test = "Debug World";
var testGet = debug[ "test" ];
/* This will output:
    DEBUG: test = Debug World
*/
```

## Initial Value

Values can be initialized by passing in the object as a parameter:
```javascript
var debug = ComfyVars.Debuggable( { test: "Debug World" });
var testGet = debug[ "test" ];

var player = ComfyVars.Watchable( ( prop, value ) => {
    if( prop === "xp" ) {
        checkForLevelUp();
    }
}, { name: "Instafluff", xp: 0 } );

function checkForLevelUp() {
    if( player.xp > 5 ) {
        console.log( "Level up!" );
    }
}
player.xp += 10;
```
