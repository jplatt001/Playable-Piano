document.addEventListener("DOMContentLoaded", function () {
    const keys = document.querySelectorAll(".key");

    keys.forEach((key) => {
        key.addEventListener("click", () => {
            key.classList.add("active");
            const note = key.getAttribute("data-note");
            const audio = document.getElementById(note);
            audio.currentTime = 0;
            audio.play();
            audio.addEventListener("ended", () => {
                key.classList.remove("active");
            });
        });
    });
});

class Scale {
    constructor(name, notes = []) {
        this.name = name;
        this.notes = notes;
    }
}

const scales = {
    'Major': [0, 2, 4, 5, 7, 9, 11],
    'Minor': [0, 2, 3, 5, 7, 8, 10],
};

document.addEventListener("DOMContentLoaded", function() {
    const selectScaleButton = document.querySelector('.selectScaleButton');
    const scaleDropdown = document.querySelector('.select-Dropdown');

    selectScaleButton.addEventListener('click', function() {
        scaleDropdown.classList.toggle('show');
    });
});

const startNoteButtons = document.querySelectorAll('.startNoteButton');
const scaleButtons = document.querySelectorAll('.scaleButton');

startNoteButtons.forEach(button => {
    button.addEventListener('click', function() {
        startNoteButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const selectedNote = this.textContent;
        const selectedScale = document.querySelector('.scaleButton.active').textContent;

        scaleSelector(selectedNote, selectedScale);
    });
});

scaleButtons.forEach(button => {
    button.addEventListener('click', function() {
        scaleButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const selectedNote = document.querySelector('.startNoteButton.active').textContent;
        const selectedScale = this.textContent;

        scaleSelector(selectedNote, selectedScale);
    });
});

const keysArray = Array.from(document.querySelectorAll('.key'));

function scaleSelector(selectedNote, selectedScale) {
    keysArray.forEach(key => {
        key.classList.remove('highlighted');
    });
    const scale = scales[selectedScale];

    keysArray.forEach((key, index) => {
        const keyDataNote = key.getAttribute('data-note').replace(/\d/g, '');

        if (keyDataNote === selectedNote) {
            key.classList.add('highlighted');
            scale.forEach(interval => {
                const targetIndex1 = keysArray.indexOf(key) + interval;
                if (targetIndex1 >= 0 && targetIndex1 < keysArray.length) {
                    keysArray[targetIndex1].classList.add('highlighted');
                }
                const targetIndex2 = keysArray.indexOf(key) - (12 -interval);
                if (targetIndex2 >= 0 && targetIndex2 < keysArray.length) {
                    keysArray[targetIndex2].classList.add('highlighted');
                }
            });
        }
    });
}

const findScaleButtons = document.querySelectorAll('.findNoteButton');
const findScaleRunButton = document.querySelector('.findScaleRunButton');

document.addEventListener("DOMContentLoaded", function() {
    const findScaleButton = document.querySelector('.findScaleButton');
    const findDropdown = document.querySelector('.find-Dropdown');

    findScaleButton.addEventListener('click', function() {
        findDropdown.classList.toggle('show');
    });
});

const noteNames = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];

const noteMapping = {
    "A": 0,
    "Bb": 1,
    "B": 2,
    "C": 3,
    "Db": 4,
    "D": 5,
    "Eb": 6,
    "E": 7,
    "F": 8,
    "Gb": 9,
    "G": 10,
    "Ab": 11
};

const selectedNoteNumbers = [];

findScaleButtons.forEach(button => {
    button.addEventListener('click', function() {
        const noteNumber = noteMapping[button.textContent];
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            const index = selectedNoteNumbers.indexOf(noteNumber);
            if (index !== -1) {
                selectedNoteNumbers.splice(index, 1);
            }
        } else {
            this.classList.add('active');
            selectedNoteNumbers.push(noteNumber);
        }
    });
});

findScaleRunButton.addEventListener('click', function() {
    if (selectedNoteNumbers.length >= 3) {
        findScales(selectedNoteNumbers);
    } else {
        alert("Please choose at least 3 notes.");
    }
});

function displayFoundScales(foundScales) {
    const foundScalesContainer = document.querySelector('.foundScales');
    foundScalesContainer.innerHTML = '';
    foundScales.forEach(scale => {
        const scaleElement = document.createElement('div');
        scaleElement.textContent = scale;
        foundScalesContainer.appendChild(scaleElement);
    });
}

function findScales(selectedNotes) {
    const foundScales = [];
    let inScale = true;

    for (const scaleName in scales) {
        const scaleNotes = scales[scaleName];
        for (let i = 0; i < 12; i++) {
            inScale = true;
            for (let j = 0; j < selectedNotes.length; j++) {
                const selectedNote = selectedNotes[j];
                if (!scaleNotes.includes((selectedNote + i) % 12)) {
                    inScale = false;
                    break;
                }
            }
            if (inScale) {
                foundScales.push(noteNames[(24 - i)%12] + " " + scaleName);
            }
        }
    }
    console.log(foundScales);

    displayFoundScales(foundScales)
}
