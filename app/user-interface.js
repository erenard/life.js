import styles from "./app.css";

export default function (controls) {
    var birthElements = [
            document.getElementById("b0"),
            document.getElementById("b1"),
            document.getElementById("b2"),
            document.getElementById("b3"),
            document.getElementById("b4"),
            document.getElementById("b5"),
            document.getElementById("b6"),
            document.getElementById("b7"),
            document.getElementById("b8")
        ],
        survivalElements = [
            document.getElementById("s0"),
            document.getElementById("s1"),
            document.getElementById("s2"),
            document.getElementById("s3"),
            document.getElementById("s4"),
            document.getElementById("s5"),
            document.getElementById("s6"),
            document.getElementById("s7"),
            document.getElementById("s8")
        ],
        presetsElement = document.getElementById('presets'),
        stopButtonElement = document.getElementById('stop'),
        startButtonElement = document.getElementById('start'),
        randomButtonElement = document.getElementById('random'),
        clearButtonElement = document.getElementById('clear'),
        ratioElement = document.getElementById('ratio'),
        rules = {
            b: [false, false, false, false, false, false, false, false, false],
            s: [false, false, false, false, false, false, false, false, false]
        },
        index = 0,
        gridComponent = null,
        animationComponent = null,
        updateRules = function () {
            var index;
            for (index = 0; index < 9; index += 1) {
                rules.b[index] = birthElements[index].checked;
                rules.s[index] = survivalElements[index].checked;
            }
            presetsElement.value = 'custom';
        },
        loadPreset = function () {
            var preset = presetsElement.value,
                start = preset.indexOf('b'),
                stop = preset.indexOf('s'),
                length = preset.length,
                index;
            if (length !== 0 && preset !== 'custom' && start !== -1 && stop !== -1 && start < stop) {
                for (index = 0; index < 9; index += 1) {
                    rules.b[index] = false;
                    rules.s[index] = false;
                    birthElements[index].checked = false;
                    survivalElements[index].checked = false;
                }
                for (index = start + 1; index < stop; index += 1) {
                    birthElements[preset.charAt(index)].checked = true;
                    rules.b[preset.charAt(index)] = true;
                }
                for (index = stop + 1; index < length; index += 1) {
                    survivalElements[preset.charAt(index)].checked = true;
                    rules.s[preset.charAt(index)] = true;
                }
            }
        };
    presetsElement.addEventListener('change', loadPreset);
    stopButtonElement.addEventListener('click', function () {
        if (animationComponent !== null) {
            animationComponent.stop();
            stopButtonElement.style.display = 'none';
            if (startButtonElement !== null) {
                startButtonElement.style.display = '';
            }
        }
    });
    startButtonElement.addEventListener('click', function () {
        if (animationComponent !== null) {
            animationComponent.start();
            startButtonElement.style.display = 'none';
            if (stopButtonElement !== null) {
                stopButtonElement.style.display = '';
            }
        }
    });
    randomButtonElement.addEventListener('click', function () {
        var ratioValue;
        if (gridComponent !== null && ratioElement !== null) {
            ratioValue = ratioElement.value;
            if (isNaN(ratioValue) || ratioValue < 0 || ratioValue > 100) {
                ratioValue = 30;
                ratioElement.value = ratioValue;
            }
            gridComponent.random(ratioValue / 100);
        }
    });
    clearButtonElement.addEventListener('click', function () {
        if (gridComponent !== null) {
            gridComponent.clear();
        }
    });
    presetsElement.addEventListener('change', loadPreset);
    for (index = 0; index < 9; index += 1) {
        birthElements[index].addEventListener('change', updateRules);
        survivalElements[index].addEventListener('change', updateRules);
    }
    loadPreset();
    return {
        rules : rules,
        registerGrid : function (grid) {
            gridComponent = grid;
        },
        registerAnimation : function (animation) {
            animationComponent = animation;
        }
    };
};
