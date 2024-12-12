class Camera {
	constructor(gl, shaderProgram) {
		this.gl = gl;
		this.shaderProgram = shaderProgram;

		let aspect = gl.canvas.width / gl.canvas.height;
		let fov = 45;
		let near = 1;
		let far = 100;

		this.projectionMatrix = perspective(fov, aspect, near, far);

		//let eye = vec3(0, 0, 5); // Camera position
		this.radius = 10;
		this.theta = 0.0;
		this.eye = vec3(
			this.radius * Math.sin(this.theta) * Math.cos(Math.PI),
			this.radius * Math.sin(this.theta) * Math.sin(Math.PI),
			this.radius * Math.cos(this.theta)
		);

		let at = vec3(0.0, 0.0, 0.0); // Point the camera looks at
		let up = vec3(0.0, 1.0, 0.0); // Up direction for the camera

		this.viewMatrix = lookAt(this.eye, at, up);
	}

	activate() {
		let program = this.shaderProgram.getProgram();
		let projectionMatrix = this.gl.getUniformLocation(
			program,
			"projectionMatrix"
		);
		this.gl.uniformMatrix4fv(
			projectionMatrix,
			false,
			flatten(this.projectionMatrix)
		);

		let viewMatrix = this.gl.getUniformLocation(program, "viewMatrix");
		this.gl.uniformMatrix4fv(viewMatrix, false, flatten(this.viewMatrix));
	}
}
