function addMessage(m){
		console.log(m);
}
function createQuadProgram(gl)
{
	gl.clearColor(0,0,0,1);	

	  // Vertex shader program
var VSHADER_SOURCE =
	'attribute vec3 position;\n' +
	'void main() {\n' +
	'  gl_Position = vec4(position,1.0);\n' +
	'}\n';

// Fragment shader program
var FSHADER_SOURCE =
	'void main() {\n' +
	'  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
	'}\n';

	  // Create the Program from the shader code.
	var program = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	if (!program) {
		addMessage('Failed to create program');
		return false;
	}
	else addMessage('Shader Program was successfully created.');
	
	return program;
}

function Quad(gl, program)
{
	var vertices = new Float32Array(
		[ -1.0, 1.0,	1.0, 1.0,	1.0,-1.0,  	 // Triangle 1
          -1.0, 1.0,	1.0,-1.0,	-1.0,-1.0]); // Triangle 2
		
		// Get the location/address of the vertex attribute inside the shader program.
	var a_Position = gl.getAttribLocation(program, 'position');

	// Enable the assignment to a_Position variable
	gl.enableVertexAttribArray(a_Position); 
	// I did not mention it in the class.
	// WebGL allows you not to send any data to the attribute. So if you do not want
	// to send any data then do not enable it.

	// Create a buffer object
	var vertexBuffer = gl.createBuffer();
	if (!vertexBuffer) 
	{
		addMessage('Failed to create the buffer object');
		return null;
	}
	// Bind the buffer object to an ARRAY_BUFFER target
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	// Write date into the buffer object
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	gl.useProgram(program);

	// Bind the buffer object to target
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	// Assign the buffer object to a_Position variable
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

	this.draw= function()
	{
		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}
}