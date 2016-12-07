## WebGL for busy people
There are lots of good tutorials out there. But we're all busy people so WFBP
demonstrates a minimal implementation of a WebGL application to quickly get
something on the screen without wading through lots of documentation.

![](grid.png)

The important array of vertices is declared near the top of the file.
```js
		// THE BIT YOU'RE PROBABLY INTERESTED IN

		// Create array of vertices
		var vertices = []
		for (var i = -1; i < 1; i += .05)
			for (var j = -1; j < 1; j += .05) {

				vertices[vertices.length] = i
				vertices[vertices.length] = j
			}

		// THE WEBGL
		// ...
```

See it running via
[rawgit](https://rawgit.com/deanturpin/WebGL/master/index.html).

### See also
- http://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
- https://en.wikipedia.org/wiki/WebGL

## TL;DR many tutorials detail each step but WFBP condenses it into one file

### GLSL
[WebGL
Fundamentals](http://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html)
uses esoteric HTML ```script``` blocks to capture the non-JavaScript
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

WFBP captures the GLSL code *inline* using backticked JavaScript constants. The
point size is defined here.
```js
		// Create vertex shader
		const vertexShaderSource = `

			attribute vec4 a_position;
			void main() {
				gl_Position = a_position;
				gl_PointSize = 5.0;
			}`
```

The colour is defined in the fragment shader.
```js
		// Create fragment shader
		const fragmentShaderSource = `

			precision mediump float;
			void main() {
				gl_FragColor = vec4(0, 0, 0, 1);
			}`
```

### The canvas object
To avoid any dependency with the tags defined in the HTML the canvas is created
dynamically by the JavaScript. This means everything within the script tag can
be included as an external script without concerning yourself with HTML to
support it.

```js
// Create canvas
const canvas = document.createElement("canvas")
const body = document.getElementsByTagName("body")[0]

// Add it to the DOM
body.appendChild(canvas)
```

### External libraries
Much of the details could of course be hidden by using a 3D library but I didn't
want to introduce any external dependencies.
