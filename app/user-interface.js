export default class {
	constructor (grid, animation) {
		this.grid = grid;
		this.animation = animation;
		this.birthElements = [
			document.getElementById('b0'),
			document.getElementById('b1'),
			document.getElementById('b2'),
			document.getElementById('b3'),
			document.getElementById('b4'),
			document.getElementById('b5'),
			document.getElementById('b6'),
			document.getElementById('b7'),
			document.getElementById('b8')
		];
		this.survivalElements = [
			document.getElementById('s0'),
			document.getElementById('s1'),
			document.getElementById('s2'),
			document.getElementById('s3'),
			document.getElementById('s4'),
			document.getElementById('s5'),
			document.getElementById('s6'),
			document.getElementById('s7'),
			document.getElementById('s8')
		];
		this.presetsElement = document.getElementById('presets');
		this.stopButtonElement = document.getElementById('stop');
		this.startButtonElement = document.getElementById('start');
		this.randomButtonElement = document.getElementById('random');
		this.clearButtonElement = document.getElementById('clear');
		this.ratioElement = document.getElementById('ratio');
		this.registerEventListeners();
		this.loadPreset('b3s23');
	}

	loadPreset (preset) {
		var start = preset.indexOf('b'),
			stop = preset.indexOf('s'),
			length = preset.length,
			index;
		if (length !== 0 && preset !== 'custom' && start !== -1 && stop !== -1 && start < stop) {
			for (index = 0; index < 9; index += 1) {
				this.grid.Rules.b[index] = false;
				this.grid.Rules.s[index] = false;
				this.birthElements[index].checked = false;
				this.survivalElements[index].checked = false;
			}
			for (index = start + 1; index < stop; index += 1) {
				this.birthElements[preset.charAt(index)].checked = true;
				this.grid.Rules.b[preset.charAt(index)] = true;
			}
			for (index = stop + 1; index < length; index += 1) {
				this.survivalElements[preset.charAt(index)].checked = true;
				this.grid.Rules.s[preset.charAt(index)] = true;
			}
		}
	}

	registerEventListeners() {
		var index = 0,
			updateRules = function () {
				var index;
				for (index = 0; index < 9; index += 1) {
					this.grid.Rules.b[index] = this.birthElements[index].checked;
					this.grid.Rules.s[index] = this.survivalElements[index].checked;
				}
				this.presetsElement.value = 'custom';
			}.bind(this),
			changePreset = function () {
				this.loadPreset(this.presetsElement.value);
			}.bind(this);
		for (index = 0; index < 9; index += 1) {
			this.birthElements[index].addEventListener('change', updateRules);
			this.survivalElements[index].addEventListener('change', updateRules);
		}

		this.presetsElement.addEventListener('change', changePreset);
		this.stopButtonElement.addEventListener('click', () => {
			this.animation.stop();
			this.stopButtonElement.style.display = 'none';
			this.startButtonElement.style.display = '';
		});
		this.startButtonElement.addEventListener('click', () => {
			this.animation.start();
			this.startButtonElement.style.display = 'none';
			this.stopButtonElement.style.display = '';
		});
		this.randomButtonElement.addEventListener('click', () => {
			var ratioValue = this.ratioElement.value;
			if (isNaN(ratioValue) || ratioValue < 0 || ratioValue > 100) {
				ratioValue = 30;
				this.ratioElement.value = ratioValue;
			}
			this.grid.random(ratioValue / 100);
		});
		this.clearButtonElement.addEventListener('click', () => {
			this.grid.clear();
		});
		this.presetsElement.addEventListener('change', changePreset);
	}
}
