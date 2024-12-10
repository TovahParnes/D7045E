"use strict";

class Camera {
	constructor(gl, shaderProgram) {
		this.gl = gl;
		this.shaderProgram = shaderProgram;

		let aspect = gl.canvas.width / gl.canvas.height;
		let fov = 45;
		let near = 0.1;
		let far = 100;

		this.projectionMatrix = perspective(fov, aspect, near, far);

		let eye = vec3(0, 0, 5); // Camera position
		let at = vec3(0, 0, 0); // Point the camera looks at
		let up = vec3(0, 1, 0); // Up direction for the camera

		this.viewMatrix = lookAt(eye, at, up);
	}

	activate() {
		let projectionMatrix = this.gl.getUniformLocation(
			this.shaderProgram,
			"projectionMatrix"
		);
		this.gl.uniformMatrix4fv(projectionMatrix, false, this.projectionMatrix);

		let viewMatrix = this.gl.getUniformLocation(
			this.shaderProgram,
			"viewMatrix"
		);
		this.gl.uniformMatrix4fv(viewMatrix, false, this.viewMatrix);
	}
}
