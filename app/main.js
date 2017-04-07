import 'app.css';
import UserInterface from 'user-interface';
import Grid from 'grid';
import Renderer from 'renderer';
import Animation from 'animation';


function main(setup) {
	var radius = setup.lifeCellSize || 4,
		width = 1280,
		height = 1024,
		viewport = document.getElementById('viewport'),
		grid = new Grid(Math.floor(width / radius), Math.floor(height / radius)),
		renderer = new Renderer(width, height, viewport, grid, radius),
		animation = Animation(() => {
			// This function will wrap the whole process of updating the game and drawing it
			renderer.render();
			grid.update();
		});

	new UserInterface(grid, animation);
	grid.random(0.30);
	animation.start();
}

main({lifeCellSize: 4});
