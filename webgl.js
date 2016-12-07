"use strict"

function createShader(gl, type, source) {

	var shader = gl.createShader(type)
	gl.shaderSource(shader, source)
	gl.compileShader(shader)

	var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)

	if (success)
		return shader

	console.log(gl.getShaderInfoLog(shader))
	gl.deleteShader(shader)
}

onload = function() {

	var canvas = document.getElementById("canvas")

	// Create WebGL rendering context
	var gl = canvas.getContext("webgl")

	/*
	This is the GPU code. You'll notice it isn't quite JavaScript. Most
	tutorials tend to put it between HTML script tags but then it's not
	immediately obvious how it relates to the rest of the code.

	Note: you can't drop the terminating semi-colon.
	*/
	var vertexShaderSource = `

		attribute vec4 a_position;
		void main() {
			gl_Position = a_position;
			gl_PointSize = 10.0;
		}`

	var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)

	// Fragment shader
	var fragmentShaderSource = `

		precision mediump float;
		void main() {
			gl_FragColor = vec4(1, 0.5, 0.2, 1);
		}`

	var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

	// Create program
	var program = gl.createProgram()
	gl.attachShader(program, vertexShader)
	gl.attachShader(program, fragmentShader)
	gl.linkProgram(program)
	gl.getProgramParameter(program, gl.LINK_STATUS)

	var positionAttributeLocation = gl.getAttribLocation(program, "a_position")
	var positionBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	// Array of points
	var positions = []
	for (var i = 0; i < 1; i += .1) {

		positions[positions.length] = i
		positions[positions.length] = i/2
	}

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

	gl.useProgram(program)

	gl.enableVertexAttribArray(positionAttributeLocation);

	// Bind the position buffer.
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	 
	gl.vertexAttribPointer(
		positionAttributeLocation,
		2,							// Components per iteration
		gl.FLOAT,					// 32-bit floats
		false,						// Don't normalise
		0,							// Stride
		0							// Offset
	)

	gl.drawArrays(gl.POINTS, 0, positions.length/2);
}
