import 'app.css';
import UserInterface from 'user-interface';
import Grid from 'grid';
import Renderer from 'renderer';
import Animation from 'animation';
import TextureLoader from 'texture-loader';

function main(setup) {
	var radius = setup.lifeCellSize || 4,
		width = 640,
		height = 480,
		viewport = document.getElementById('viewport'),
		renderer = new Renderer(width, height, viewport),
		textureLoader = new TextureLoader(radius),
		grid, animation;

	//PrepareTexture
	textureLoader.generateCellTextures(renderer);
	//TODO grid needs textures before
	grid = new Grid(Math.floor(width / radius), Math.floor(height / radius));

	renderer.initStage(radius, grid);

	new UserInterface(grid, animation);
	grid.random(0.30);

	// This function will wrap the whole process of updating the game and drawing it
	animation = Animation(() => {
		grid.update();
		renderer.render();
	});

	animation.start();
}

main({lifeCellSize: 3});
/*
import * as PIXI from 'pixi.js';

var radius = 4,
	viewport = document.getElementById('viewport'),
	renderer = new PIXI.autoDetectRenderer(640, 480),
	stage = new PIXI.Container(),
	container = new PIXI.particles.ParticleContainer(19200);

viewport.appendChild(renderer.view);

stage.addChild(container);

var graphic = new PIXI.Graphics();
graphic.beginFill(0xfff000);
graphic.drawRect(0, 0, radius, radius);
var texture = renderer.generateTexture(graphic);
for (var i = 0; i <19200; i++) {
	var sprite = new PIXI.Sprite(texture);
	sprite.x = Math.random() * 640;
	sprite.y = Math.random() * 480;
	container.addChild(sprite);
}

renderer.render(stage);
*/
