var location1 = 3;
var location2 = 4;
var location3 = 5;

var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;

while (isSunk == false) {
    guess = prompt("Gotów, cel, pal! (podaj liczbę od zera do 6):");
    if (guess < 0 || guess > 6) {
        alert("proszę podać poprawny numer komórki")
    }
    else {
        guesses = guesses + 1;
        if (guess == location1 || guess == location2 || guess == location3) {
            hits = hits + 1;
            alert("trafiony!")


            if (hits == 3) {
                isSunk = true;

                alert("zatopiłeś okręt!");
            }
        }
        else {
            alert("pudło")
        }
    }

}
var stats = "potrzebowałeś " + guesses + " prób by zatopić okręt czyli twoja efektywnośc wynosi :" + (3 / guesses) + ".";
alert(stats);


