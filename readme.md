## WebGL for busy people
There are lots of good WebGL tutorials out there but this is a minimal
implementation to get something on the screen&mdash;in one file&mdash;without
wading through lots of documentation

We're all busy people.

See it running on
[rawgit](https://rawgit.com/deanturpin/WebGL/master/index.html).

### Heavily influenced by
- http://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
- https://en.wikipedia.org/wiki/WebGL

## Refactor and simplify

tl;dr - many tutorials go into a lot of detail but this puts it all in one file.

### GLSL
(WebGL
Fundamentals)[http://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html]
uses slightly esoteric HTML ```script``` blocks to capture the non-JavaScript
code.

```html
<script id="2d-vertex-shader" type="notjs">

	// an attribute will receive data from a buffer
	attribute vec4 a_position;

	// all shaders have a main function
	void main() {

	// gl_Position is a special variable a vertex shader
	// is responsible for setting
	gl_Position = a_position;
	}

</script>

```

WFBP captures the GLSL code inline using backticked JavaScript constants.
```js
// Create vertex shader
const vertexShaderSource = `

	attribute vec4 a_position;
	void main() {
		gl_Position = a_position;
		gl_PointSize = 10.0;
	}`
```

### The canvas object
To avoid any dependency with the tags defined in the HTML&mdash;specifically the
canvas tag&mdash;the canvas is create dynamically by the JavaScript. This means
everything within the script tag can be included as an external script without
concerning yourself with HTML to support it.

```js
// Create canvas
const canvas = document.createElement("canvas")
const body = document.getElementsByTagName("body")[0]

// Add it to the DOM
body.appendChild(canvas)
```
