const COLOURS_ARRAY = ["red", "blue", "green", "yellow"];
const COLOURS_SIZE = COLOURS_ARRAY.length;

let gamePattern = [];
let userClickedPattern = [];

let started = false;

/**
 * Cette fonction permet de sélectionner une couleur.
 */
$(".btn").click(function() {

    if (started) {
        let userChosenColour = $(this).attr("id");

        userClickedPattern.push(userChosenColour);
    
        playSound(userChosenColour);
        animatePress(userChosenColour);
    
        checkAnswer();
    }
});

/**
 * Cette foncion permet de lancer le jeu.
 */
$(document).keypress(function() {

    if (!started) {
        $("#level-title").text(`Level ${gamePattern.length}`);
        nextSequence();
        started = true;
    }
})

/**
 * 
 * Cette fonction me permet de jouer le son passer en paramètre.
 * 
 * @param {*} name 
 */
function playSound(name) {
    new Audio("sounds/" + name + ".mp3").play();
}

/**
 * 
 * Cette fonction me permet d'animer la couleur choisi par l'utilisateur.
 * 
 * @param {*} currentColor 
 */
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

/**
 * Cette fonction me permet de faire une suite d'animation lorsque le joueur ce trompe de couleur.
 */
function wrongAnswer() {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    reset();
}

/**
 * Cette fonction me permet de générer une nouvelle couleur, et de jouer un son ainsi qu'une animation.
 */
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * COLOURS_SIZE);
    let randomChosenColour = COLOURS_ARRAY[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#level-title").text(`Level ${gamePattern.length}`);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    animatePress(randomChosenColour)
}

/**
 * 
 * Cette fonction me permet de regarder l'avancer du jeu, et de voir si le joueur ce trompe
 * Je parcours les 2 tableaux, et je regarde s'il y a des différences entre les couleurs. 
 * S'il y en a, c'est que le joueur c'est trompé dans la suite de couleurs, et donc je retourne false.
 * 
 * /!\ La condition d'arrêt doit bien être la taille du tableau du joueur et pas du patterne,
 * car le tableau du joueur n'est pas forcément fini (Il peut toujours être en train de jouer), alors
 * que celui du patterne est fixe.
 * 
 * @returns 
 */
function checkAllAnswer() {

    for (let i = 0; i < userClickedPattern.length; i++) {
        if (gamePattern[i] !== userClickedPattern[i])
            return false;
    }

    return true;
}

/**
 * Cette fonction me permet de voir si le joueur ne c'est pas tromper dans la suite de couleur qu'il vient de réaliser.
 * Pour celà à chaque couleur tapper, je regarde s'il ne sait pas tromper. Une fois qu'il à tapper le bon nombre de couleur,
 * On peut passer à la suite. (La vérification des couleurs ce fait à chaque nouvelle couleur tappé).
 */
function checkAnswer() {
    if (!checkAllAnswer()) {
        wrongAnswer();
    }

    if (started && gamePattern.length === userClickedPattern.length) {
        console.log("success");

        setTimeout(() => {
            userClickedPattern = [];
            nextSequence();
        }, 1000);
    }
}

/**
 * Cette fonction me permet de reset les stats du joueurs.
 */
function reset() {
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}