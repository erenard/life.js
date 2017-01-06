import UserInterface from './user-interface';
import Grid from './grid';
import Renderer from './renderer';
import Animation from './animation';

/*global window, document*/
function main(setup) {
	window.addEventListener('load', function () {
		//Cell radius
		var radius = setup.lifeCellSize,
			canvas = document.getElementById('viewport'),
			userInterface = UserInterface(),
			grid = Grid(Math.floor(canvas.width / radius), Math.floor(canvas.height / radius), userInterface),
			renderer = Renderer(canvas, radius, grid, 1000 / 100),
			animation = Animation(renderer, userInterface);
		grid.random(0.30);
		animation.start();
	}, false);
}

main({lifeCellSize: 4});
