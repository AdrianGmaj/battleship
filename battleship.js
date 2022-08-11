var view = {
    displayMessage: function (msg) {
        var messageAre = document.getElementById("messageArea");
        messageAre.innerHTML = msg;
    },
    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit")
    },
    displayMiss: function (location) {
        var cell = document.getElementById(location)
        cell.setAttribute("class", "miss");
    }
}

var model = {
    boardSize: 7,
    numbShips: 3,
    shipLenght: 3,
    shipSunk: 0,

    ships: [
        { locations: ["06", "16", "26"], hits: ["", "", ""] },
        { locations: ["24", "34", "44"], hits: ["", "", ""] },
        { locations: ["10", "11", "12"], hits: ["", "", ""] }
    ],

    fire: function (guess) {
        for (var i = 0; i < this.numbShips; i++) {
            var ship = this.ships[i];
            var locations = ship.locations;
            var index = locations.indexOf(guess)
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("TRAFIONY!!")
                if (this.isSunk(ship)) {
                    view.displayMessage("Zatopiłeś okręt!")
                    this.shipSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("Spudłowałeś.");
        return false;
    },
    isSunk: function (ship) {
        for (var i = 0; i < this.shipLenght; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }


        }
        return true;
    }

}
var controller = {
    guesses: 0,

    processGuess: function (guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipSunk === model.numbShips) {
                view.displayMessage("Zatopiłeś wszystkie moje okręty, w " + this.guesses + "próbach");
            }
        }
    }
}
/**
 * 
 * @param {string} guess 
 * @returns 
 */
function parseGuess(guess) {
    var alphabet = ['A', 'B', 'C', 'D', 'E', 'F']
    if (guess === null || guess.length !== 2) {
        alert("Proszę wpisać literę i cyfrę!!")
    }
    else {
        var firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar);
        var column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            alert("To nie są prawidłowe współrzędne!");
        } else if (row < 0 || row >= model.boardSize) {
            alert("Ups, pole poza planszą!");
        } else {
            return row + column;
        }
    }
    return null;

}
function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;

    controller.processGuess(guess);

    guessInput.value = "";
}
function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;

}

init();







view.displayMessage("halo czy to działa?");