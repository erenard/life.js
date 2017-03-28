/**
 * Do the drawings on the canvas
 * @param {Element} canvas
 * @param {Number} size
 * @param {life.grid} grid
 */
export default function (canvas, size, grid) {
	var ctx = canvas.getContext('2d'),
		sizeX = grid.Size.x,
		sizeY = grid.Size.y,
		cells = grid.Cells,
        /**
         * prepare a cell's sprite and store it for a later use
         * @param {String} color : fill style
         */
		sprite = function (color) {
			var sprite = window.document.createElement('canvas'),
				context;
			sprite.setAttribute('width', (size - 1) + 'px');
			sprite.setAttribute('height', (size - 1) + 'px');
			context = sprite.getContext('2d');
			context.fillStyle = color;
			context.rect(0, 0, size, size);
			context.fill();
			return sprite;
		},
		yngCellSprite = sprite('rgba(0, 127, 0, 1)'),
		oldCellSprite = sprite('rgba(127, 255, 127, 1)'),
		dedCellSprite = sprite('rgba(0, 0, 0, 1)'),
        /** draws the game board with each cells */
		render = function () {
			var x, y, collumn, cell;
            //ctx.clearRect(0, 0, canvas.width, canvas.height);
			x = sizeX;
			while (x--) {
				collumn = cells[x];
				y = sizeY;
				while (y--) {
					cell = collumn[y];
					if (cell.flip) {
						cell.flip = false;
						if (cell.state === 0) {
							ctx.drawImage(yngCellSprite, x * size, y * size);
							cell.age = 0;
							cell.state = 1;
						} else {
							ctx.drawImage(dedCellSprite, x * size, y * size);
							cell.age = -1;
							cell.state = 0;
						}
					} else {
						cell.age += cell.state;
						if (cell.age === 5) {
							ctx.drawImage(oldCellSprite, x * size, y * size);
						}
					}
				}
			}
		};
    /// disable image smoothing for sake of speed
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.oImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;  ///future...
    /* This function will wrap the whole process of updating the game and drawing it */
	return function () {
		grid.update();
		render();
	};
}
