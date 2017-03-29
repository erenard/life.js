import './app.css';
import UserInterface from './user-interface';
import Grid from './grid';
import Renderer from './renderer';
import Animation from './animation';

/*global window, document*/
function main(setup) {
	window.addEventListener('load', () => {
		console.log(document.getElementById('b0'));
		//Cell radius
		var radius = setup.lifeCellSize || 4,
			canvas = document.getElementById('viewport'),
			grid = new Grid(Math.floor(canvas.width / radius), Math.floor(canvas.height / radius)),
			renderer = new Renderer(canvas, radius, grid),
			animation = Animation(() => {
                /* This function will wrap the whole process of updating the game and drawing it */
				grid.update();
				renderer.render();
			});
		new UserInterface(grid, animation);
		grid.random(0.30);
		animation.start();
	}, false);
}

main({lifeCellSize: 4});
