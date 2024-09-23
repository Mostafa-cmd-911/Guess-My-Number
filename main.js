// Talk
const informationDiv = document.querySelector(".information");
informationDiv.textContent = `<Between 1 and 20>`;

// Main Variables
const againBtn = document.querySelector(".again");
const showNumber = document.querySelector(".heading-number");
const guessNumber = document.querySelector(".number");
const check = document.querySelector(".check");
const hints = document.querySelector(".hints");
const spanFrist = document.querySelector(
    ".text:not(:first-child) p span:first-child"
);
const spanlast = document.querySelector(".last");

// The Number Guess
let numberGuesses = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
let randomNumber = Math.floor(Math.random() * numberGuesses.length) + 1; // +1 to ensure it's between 1 and 20
console.log(randomNumber);

// Initialize the game
hints.textContent = `Start Guessing...`;
showNumber.innerHTML = "?";
spanFrist.innerHTML = numberGuesses.length;
let highScore = localStorage.getItem("HighScore") || 0;
spanlast.innerHTML = highScore;
againBtn.disabled = true;

function game() {
    let guessedNumber = Number(guessNumber.value); // Ensure input is treated as a number
    if (!guessedNumber || guessedNumber < 1 || guessedNumber > 20) {
        hints.textContent = "Please enter a number between 1 and 20.";
        return;
    }

    if (guessedNumber === randomNumber) {
        hints.textContent = `Correct Number!`;
        showNumber.textContent = `${randomNumber}`;
        document.body.style.backgroundColor = "#00b200";

        // Update the high score if needed
        if (spanFrist.innerHTML > highScore) {
            highScore = spanFrist.innerHTML;
            spanlast.innerHTML = highScore;
            localStorage.setItem("HighScore", highScore);
        }

        check.disabled = true; // Disable check button after the correct guess
        againBtn.disabled = false; // Enable restart button
    } else {
        if (guessedNumber > randomNumber) {
            hints.textContent = `Too High!`;
        } else {
            hints.textContent = `Too Low!`;
        }
        spanFrist.innerHTML--; // Decrease attempts
        if (spanFrist.innerHTML === "0") {
            hints.textContent = `Game Over The Number Is ${randomNumber}`;
            document.body.style.backgroundColor = "#df1212";
            check.disabled = true;
            againBtn.disabled = false;
        }
    }
}

function restGame() {
    // Reset the game state
    document.body.style.backgroundColor = "#363434";
    spanFrist.innerHTML = numberGuesses.length;
    showNumber.innerHTML = "?";
    guessNumber.value = "";
    randomNumber = Math.floor(Math.random() * numberGuesses.length) + 1; // Generate a new random number
    console.log(randomNumber);

    // Re-enable the check button and disable restart button
    check.disabled = false;
    againBtn.disabled = true;

    hints.textContent = `Start Guessing...`; // Reset hints

    // Update the high score if needed
    let storedHighScore = localStorage.getItem("HighScore") || 0;
    if (highScore < storedHighScore) {
        localStorage.setItem("HighScore", highScore); // Save the current high score to localStorage
    }
}

// Event listeners
check.addEventListener("click", game);
againBtn.addEventListener("click", restGame);
