// Tovah Parnes - tovpar-9@student.ltu.se
// Simon Ruskola - russim-1@student.ltu.se

let canvas;
let gl;
let camera;
let shader;
let rootNode;
let light;

let robotNode;
let robotBodyNode;
let robotPosition = 0;
let robotDirection = 0.2;
let robotSpeed = 0.005;

let leftArmNode;
let rightArmNode;
let leftArmRotation = 0;
let rightArmRotation = 0;
let armRotationSpeed = 0.02;

let starNode;
let starScale = 1.0;
let starScaleDirection = 0.01;

function updateMovements() {
	// Update robot position
	robotPosition += robotDirection * robotSpeed;
	if (robotPosition > 0.12 || robotPosition < -0.12) {
		robotDirection *= -1; // Reverse direction
	}

	// Update arm rotations
	leftArmRotation += armRotationSpeed;
	rightArmRotation -= armRotationSpeed;

	// Apply updated position to robot transform
	let robotTransform = mat4(
		0.4,
		0,
		0,
		robotPosition,
		0,
		0.4,
		0,
		-1.6,
		0,
		0,
		0.4,
		0,
		0,
		0,
		0,
		1
	);
	robotBodyNode.setTransform(robotTransform);

	// Apply vertical rotation to left arm
	let leftArmTransform = mat4(
		1,
		0,
		0,
		-0.25,
		0,
		Math.cos(leftArmRotation),
		-Math.sin(leftArmRotation),
		0.1,
		0,
		Math.sin(leftArmRotation),
		Math.cos(leftArmRotation),
		0,
		0,
		0,
		0,
		1
	);
	leftArmNode.setTransform(leftArmTransform);

	// Apply vertical rotation to right arm
	let rightArmTransform = mat4(
		1,
		0,
		0,
		0.25,
		0,
		Math.cos(rightArmRotation),
		-Math.sin(rightArmRotation),
		0.1,
		0,
		Math.sin(rightArmRotation),
		Math.cos(rightArmRotation),
		0,
		0,
		0,
		0,
		1
	);
	rightArmNode.setTransform(rightArmTransform);

	// Update star scale
	starScale += starScaleDirection * 0.1;
	if (starScale > 1.5 || starScale < 0.4) {
		starScaleDirection *= -1; // Reverse scaling direction
	}

	// Apply scaling to star
	let starTransform = mat4(
		starScale,
		0,
		0,
		0,
		0,
		starScale,
		0,
		0.4,
		0,
		0,
		starScale,
		0,
		0,
		0,
		0,
		1
	);
	starNode.setTransform(starTransform);
}

function createScene() {
	let whiteMaterial = new MonoMaterial(gl, shader, vec4(1, 1, 1, 1));
	let blackMaterial = new MonoMaterial(gl, shader, vec4(0, 0, 0, 1));
	let wallMaterial = new MonoMaterial(gl, shader, vec4(0.5, 0.5, 0.5, 1)); // Material for walls

	// Create chessboard floor
	let floorSize = 12;
	let cubeSize = 0.15;
	let spacing = 0.001; // Add spacing between cubes
	let chessboardNode = new GraphicsNode(gl, null, null, mat4(1)); // Parent node for the chessboard
	let cubiodMesh = new Cuboid(gl, cubeSize, cubeSize, cubeSize, shader);

	for (let i = 0; i < floorSize; i++) {
		for (let j = 0; j < floorSize; j++) {
			let x = (i - floorSize / 2) * (cubeSize + spacing);
			let z = (j - floorSize / 2) * (cubeSize + spacing);
			let y = -2; // Adjust the z position to place the floor at the bottom of the scene
			let transform = mat4(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
			let material = (i + j) % 2 === 0 ? whiteMaterial : blackMaterial;
			let cube = new GraphicsNode(gl, cubiodMesh, material, transform);
			chessboardNode.addChild(cube); // Attach cube to the chessboard node
		}
	}

	rootNode.addChild(chessboardNode); // Attach chessboard node to the root node

	// Create walls for the labyrinth
	let wallHeight = 0.4;
	let wallThickness = 0.1; // Adjusted wall thickness
	let wallMesh = new Cuboid(gl, wallThickness, wallHeight, cubeSize, shader);

	// Define maze wall positions
	let mazeWalls = [
		{ x: -0.31, z: 0.1, scaleX: 1, scaleZ: 5.8 },
		{ x: 0.3, z: -0.2, scaleX: 1, scaleZ: 5.8 },
		{ x: 0, z: 0.4, scaleX: 1, scaleZ: 2.8 },
		{ x: 0, z: -0.6, scaleX: 1, scaleZ: 2.8 },
		{ x: 0, z: -0.85, scaleX: 10, scaleZ: 0.5 },
	];

	mazeWalls.forEach((pos) => {
		let transform = mat4(
			pos.scaleX || 1,
			0,
			0,
			pos.x,
			0,
			1,
			0,
			-1.7 + spacing,
			0,
			0,
			pos.scaleZ || 1,
			pos.z,
			0,
			0,
			0,
			1
		);
		let wall = new GraphicsNode(gl, wallMesh, wallMaterial, transform);
		rootNode.addChild(wall);
	});

	// Create objects in the labyrinth
	let sphereMaterial = new MonoMaterial(gl, shader, vec4(1, 0, 0, 1));
	let cubeMaterial = new MonoMaterial(gl, shader, vec4(0, 1, 0, 1));
	let cylinderMaterial = new MonoMaterial(gl, shader, vec4(0, 0, 1, 1));
	let coneMaterial = new MonoMaterial(gl, shader, vec4(1, 1, 0, 1));
	let torusMaterial = new MonoMaterial(gl, shader, vec4(1, 0, 1, 1));

	let sphereMesh = new Sphere(gl, 0.1, 11, 11, shader);
	let cubeMesh = new Cuboid(gl, 0.2, 0.2, 0.2, shader);
	let cylinderMesh = new Cylinder(gl, 0.1, 0.2, 16, shader);
	let coneMesh = new Cone(gl, 0.15, 0.2, 8, shader);
	let torusMesh = new Torus(gl, 0.05, 0.1, 8, shader);

	let sphereTransform = mat4(
		1,
		0,
		0,
		-0.5,
		0,
		1,
		0,
		-1.8,
		0,
		0,
		1,
		0.2,
		0,
		0,
		0,
		1
	);
	let cubeTransform = mat4(
		1,
		0,
		0,
		0.46,
		0,
		1,
		0,
		-1.8,
		0,
		0,
		1,
		-0.2,
		0,
		0,
		0,
		1
	);
	let cylinderTransform = mat4(
		1,
		0,
		0,
		-0.15,
		0,
		1,
		0,
		-1.8,
		0,
		0,
		1,
		-0.4,
		0,
		0,
		0,
		1
	);
	let coneTransform = mat4(
		1,
		0,
		0,
		0.15,
		0,
		1,
		0,
		-1.9,
		0,
		0,
		1,
		0.2,
		0,
		0,
		0,
		1
	);
	let torusTransform = mat4(
		1,
		0,
		0,
		0.46,
		0,
		1,
		0,
		-1.6,
		0,
		0,
		1,
		-0.2,
		0,
		0,
		0,
		1
	);

	let sphereNode = new GraphicsNode(
		gl,
		sphereMesh,
		sphereMaterial,
		sphereTransform
	);
	let cubeNode = new GraphicsNode(gl, cubeMesh, cubeMaterial, cubeTransform);
	let cylinderNode = new GraphicsNode(
		gl,
		cylinderMesh,
		cylinderMaterial,
		cylinderTransform
	);
	let coneNode = new GraphicsNode(gl, coneMesh, coneMaterial, coneTransform);
	let torusNode = new GraphicsNode(
		gl,
		torusMesh,
		torusMaterial,
		torusTransform
	);

	rootNode.addChild(sphereNode);
	rootNode.addChild(cubeNode);
	rootNode.addChild(cylinderNode);
	rootNode.addChild(coneNode);
	rootNode.addChild(torusNode);

	// Create robot
	robotNode = new GraphicsNode(
		gl,
		null,
		null,
		mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
	); // Root node for the robot

	let bodyMaterial = new MonoMaterial(gl, shader, vec4(0.8, 0.1, 0.1, 1));
	let limbMaterial = new MonoMaterial(gl, shader, vec4(0.2, 0.2, 0.8, 1));
	let handMaterial = new MonoMaterial(gl, shader, vec4(0.2, 0.8, 0.2, 1));
	let footMaterial = new MonoMaterial(gl, shader, vec4(0.8, 0.8, 0.2, 1));
	let starMaterial = new MonoMaterial(gl, shader, vec4(0.8, 0.8, 0.2, 1));

	let bodyMesh = new Cuboid(gl, 0.4, 0.6, 0.2, shader);
	let limbMesh = new Cuboid(gl, 0.1, 0.4, 0.1, shader);
	let handMesh = new Sphere(gl, 0.1, 11, 11, shader);
	let footMesh = new Cone(gl, 0.1, 0.1, 10, shader);
	let headMesh = new Cuboid(gl, 0.3, 0.3, 0.3, shader);
	let hatMesh = new Star(gl, 5, 0.3, 0.2, 0.1, shader);

	//constructor(gl, points, outerDist, innerDist, thickness, shaderProgram)

	// Body
	let bodyTransform = mat4(
		0.4,
		0,
		0,
		0,
		0,
		0.4,
		0,
		-0,
		0,
		0,
		0.4,
		0,
		0,
		0,
		0,
		1
	);
	robotBodyNode = new GraphicsNode(gl, bodyMesh, bodyMaterial, bodyTransform);
	robotNode.addChild(robotBodyNode);

	// Head
	let headTransform = mat4(1, 0, 0, 0, 0, 1, 0, 0.45, 0, 0, 1, 0, 0, 0, 0, 1);
	let headNode = new GraphicsNode(gl, headMesh, bodyMaterial, headTransform);
	robotBodyNode.addChild(headNode);

	// Hat
	let hatTransform = mat4(1, 0, 0, 0, 0, 1, 0, 0.4, 0, 0, 1, 0, 0, 0, 0, 1);
	starNode = new GraphicsNode(gl, hatMesh, starMaterial, hatTransform);
	headNode.addChild(starNode);

	// Left Arm
	let leftArmTransform = mat4(
		1,
		0,
		0,
		-0.25,
		0,
		1,
		0,
		0.1,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	);
	leftArmNode = new GraphicsNode(gl, limbMesh, limbMaterial, leftArmTransform);
	robotBodyNode.addChild(leftArmNode);

	// Right Arm
	let rightArmTransform = mat4(
		1,
		0,
		0,
		0.25,
		0,
		1,
		0,
		0.1,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	);
	rightArmNode = new GraphicsNode(
		gl,
		limbMesh,
		limbMaterial,
		rightArmTransform
	);
	robotBodyNode.addChild(rightArmNode);

	// Left Hand
	let leftHandTransform = mat4(
		0.6,
		0,
		0,
		-0,
		0,
		0.6,
		0,
		-0.25,
		0,
		0,
		0.6,
		0,
		0,
		0,
		0,
		1
	);
	let leftHandNode = new GraphicsNode(
		gl,
		handMesh,
		handMaterial,
		leftHandTransform
	);
	leftArmNode.addChild(leftHandNode);

	// Right Hand
	let rightHandTransform = mat4(
		0.6,
		0,
		0,
		0,
		0,
		0.6,
		0,
		-0.25,
		0,
		0,
		0.6,
		0,
		0,
		0,
		0,
		1
	);
	let rightHandNode = new GraphicsNode(
		gl,
		handMesh,
		handMaterial,
		rightHandTransform
	);
	rightArmNode.addChild(rightHandNode);

	// Left Leg
	let leftLegTransform = mat4(
		1,
		0,
		0,
		-0.15,
		0,
		1,
		0,
		-0.5,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	);
	let leftLegNode = new GraphicsNode(
		gl,
		limbMesh,
		limbMaterial,
		leftLegTransform
	);
	robotBodyNode.addChild(leftLegNode);

	// Right Leg
	let rightLegTransform = mat4(
		1,
		0,
		0,
		0.15,
		0,
		1,
		0,
		-0.5,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	);
	let rightLegNode = new GraphicsNode(
		gl,
		limbMesh,
		limbMaterial,
		rightLegTransform
	);
	robotBodyNode.addChild(rightLegNode);

	// Left Foot
	let leftFootTransform = mat4(
		1,
		0,
		0,
		-0,
		0,
		1,
		0,
		-0.2,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	);
	let leftFootNode = new GraphicsNode(
		gl,
		footMesh,
		footMaterial,
		leftFootTransform
	);
	leftLegNode.addChild(leftFootNode);

	// Right Foot
	let rightFootTransform = mat4(
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		-0.2,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	);
	let rightFootNode = new GraphicsNode(
		gl,
		footMesh,
		footMaterial,
		rightFootTransform
	);
	rightLegNode.addChild(rightFootNode);

	rootNode.addChild(robotNode); // Attach robot node to the root node

	// Set the root node's transform to place it in the scene
	rootNode.setTransform(mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1));
}

function init() {
	// Canvas
	let canvas = document.getElementById("gl-canvas");
	gl = canvas.getContext("webgl2");
	if (!gl) {
		throw "Browser does not support WebGL";
	}

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.8, 0.8, 0.8, 1.0);
	gl.enable(gl.DEPTH_TEST);

	// Shaders
	const vertexShader = new Shader(gl, gl.VERTEX_SHADER, "vertex-shader");
	const fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, "fragment-shader");
	shader = new ShaderProgram(gl, vertexShader, fragmentShader);
	shader.activate(); //TEST

	rootNode = new Node(mat4(1)); // Root node with identity transform

	// Lights

	let lightMesh = new Sphere(gl, 0.05, 16, 8, shader);
	let lightMaterial = new MonoMaterial(gl, shader, vec4(1, 1, 1, 1));

	//(gl, shaderProgram, mesh, material, transform)
	let lightX = -0.2;
	let lightY = -1.6;
	let lightZ = 0.4;
	let lightSphere = new Light(
		gl,
		shader,
		lightMesh,
		lightMaterial,
		mat4(1, 0, 0, lightX, 0, 1, 0, lightY, 0, 0, 1, lightZ, 0, 0, 0, 1)
	);
	lightSphere.applyLight(lightX, lightY, lightZ);

	rootNode.addChild(lightSphere); // Attach light node to the root node

	// Camera
	cameraTransform = mat4(1);
	camera = new Camera(gl, shader, cameraTransform);

	rootNode.addChild(camera); // Attach camera to the root node

	createScene();

	render();
}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	updateMovements();
	shader.activate();
	camera.activate();

	rootNode.draw();

	requestAnimationFrame(render);
}

window.onload = init;
