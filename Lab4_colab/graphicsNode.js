// Tovah Parnes - tovpar-9@student.ltu.se
class Node{

	constructor(transform){
		this.children = [];
		this.transform = transform;
	}

	addChild(node){
		this.children.push(node);
	}

	draw(parentTransform = mat4(1)){
		/* console.log(parentTransform);
		console.log(this.transform); */
		this.combinedTransform = mult(parentTransform, this.transform);
		for (let i = 0; i < this.children.length; i++) {
			this.children[i].draw(this.combinedTransform);
		}
	}

	setTransform(transform){
		this.transform = transform;
	}

	/* update(transform) {
		transform = mult(this.transform, transform);
		this.transform = transform;
	} */

} 


class GraphicsNode extends Node {
	constructor(gl, mesh, material, transform) {
		super(transform);
		this.gl = gl;
		this.mesh = mesh;
		this.material = material;
		this.transform = transform;
	}

	draw(parentTransform = mat4(1)) {

		this.combinedTransform = mult(parentTransform, this.transform);
		if (this.material && this.mesh) {


			this.mesh.activateBuffers();
			this.material.applyMaterial(this.combinedTransform);
			let indicesLength = this.mesh.getIndices().length;
			this.gl.drawElements(
				this.gl.TRIANGLES,
				indicesLength,
				this.gl.UNSIGNED_BYTE,
				0
			); 

		}

		for (let i = 0; i < this.children.length; i++) {
			this.children[i].draw(this.combinedTransform);
		}
	}

	
}


class Light extends GraphicsNode {
	constructor(gl, shaderProgram, mesh, material, transform) {
		super(gl, mesh, material, transform);
		this.shaderProgram = shaderProgram;
	}

	applyLight(lightX, lightY, lightZ) {
		let prog = this.shaderProgram.getProgram();

		let ambientColor = vec4(0.3, 0.3, 0.3, 1.0);
		let diffuseColor = vec4(0.8, 0.8, 0.8, 1.0);
		let specularColor = vec3(1.0, 1.0, 1.0);
		let lightPosition = vec4(lightX, lightY, lightZ, 1.0);
		//let lightPosition = vec4(0.0, 10, 0.0, 1.0);
		let specularExponent = 500;

		//console.log(lightPosition);

		let ambientColorLoc = gl.getUniformLocation(
			shader.getProgram(),
			"u_ambientColor"
		);
		gl.uniform4fv(ambientColorLoc, flatten(ambientColor));
	
		let diffuseColorLoc = gl.getUniformLocation(
			shader.getProgram(),
			"u_diffuseColor"
		);
		gl.uniform4fv(diffuseColorLoc, flatten(diffuseColor));
	
		let specularColorLoc = gl.getUniformLocation(
			shader.getProgram(),
			"u_specularColor"
		);
		gl.uniform3fv(specularColorLoc, flatten(specularColor));
	
		let lightPositionLoc = gl.getUniformLocation(
			shader.getProgram(),
			"u_lightPosition"
		);
		gl.uniform4fv(lightPositionLoc, flatten(lightPosition));
	
		let specularExponentLoc = gl.getUniformLocation(
			shader.getProgram(),
			"u_specularExponent"
		);
		gl.uniform1f(specularExponentLoc, specularExponent);
	} 


	draw(parentTransform = mat4(1)) { //--WIP

		this.combinedTransform = mult(parentTransform, this.transform);
		let combinedTransformArray = flatten(this.combinedTransform);

		let lightX = combinedTransformArray[12];
		let lightY = combinedTransformArray[13];
		let lightZ = combinedTransformArray[14];

		this.applyLight(lightX, lightY, lightZ);

		if (this.material && this.mesh) {


			this.mesh.activateBuffers();
			this.material.applyMaterial(this.combinedTransform);
			let indicesLength = this.mesh.getIndices().length;
			this.gl.drawElements(
				this.gl.TRIANGLES,
				indicesLength,
				this.gl.UNSIGNED_BYTE,
				0
			); 

		}

		for (let i = 0; i < this.children.length; i++) {
			this.children[i].draw(this.combinedTransform);
		}
	}
}
