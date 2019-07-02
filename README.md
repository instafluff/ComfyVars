# ComfyVars
Super-Easy Observable (and Debuggable!) Values in Javascript

## Instafluff ##
> *Come and hang out with us at the Comfiest Corner on Twitch!*

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
var example = ComfyVars.Watchable( ( event, prop, value ) => {
    console.log( "Watching:", event, prop, value );
} );
example.name = "Hello World";
// This will output: "Watching: set name Hello World"
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
        var example = ComfyVars.Watchable( ( event, prop, value ) => {
            console.log( "Watching:", event, prop, value );
        } );
        example.name = "Hello World";
        // This will output: "Watching: set name Hello World"
    </script>
  </body>
</html>
```

## Debug Values

You can also debug values easily by creating a `Debuggable`:
```javascript
var debug = ComfyVars.Debuggable();
debug.test = "Debug World";
var testGet = debug[ "test" ];
/* This will output:
    SET: test = Debug World
    GET: test
*/
```
