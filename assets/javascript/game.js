let game = {

    //Main random number
    gameNumber: 0,

    //Counts the values from the crystal clicks
    crystalCount: 0,

    //Win count
    wins: 0,

    //Loss count
    losses: 0,
    crystalPowers: ["The crystal grant you the power of avoiding!", "You can now teleport. That's gonna come in handy during rush hour.", "You once again have 20/20 vision", "You have double your lifetime!", "Your 401k benefits are now 50%!", "You can now hear the thoughts of anyone within close proximity."],

    crystalCurses: ["Taxes will have to be done twice a year, followed by an IRS audit every 2 years.", "You have aged 10 years!", "Rush hour traffic will be doubled every day!", "Your mortgage has tripled!", "Traveling salesmen will knock on your door every weekend morning!"],


    //Initializes gameplay
    init: function() {


        //Set main number between 19 - 120
        this.gameNumber = Math.floor(Math.random() * (120 - 19 + 1) + 19);
        $("#random-number").text(this.gameNumber);

        //reset
        this.crystalCount = 0;
        $("#crystals-count").text(this.crystalCount);

        //Set crystal value numbers between 1 - 12
        $(".crystal").each(function() {

            $(this).attr("value", Math.floor(Math.random() * (12 - 1 + 1) + 1))

        })

        //front end wins and losses
        $("#wins").text(this.wins);
        $("#losses").text(this.losses);

        console.log("Main number ", this.gameNumber, "crystal count: ", this.crystalCount)


    },

    //Restarts game when the user clicks the New Game button
    newGame: function() {


        //resets
        this.wins = 0;
        this.losses = 0;
        $("#random-number, #playthrough, #wins, #losses, #crystals-count").empty();

        //initialize gameplay
        this.init();


    },

    //checks if the number of crystal counts equals the main random number
    //If so, executes win actions and restarts gameplay
    gameWin: function() {
        if (this.gameNumber === this.crystalCount && this.isGameOver() === false) {
            // $("#playthrough").text("Great, you win!")
            this.modalDialog("Awesome", "You've has bestowed on you the following: " + this.crystalCurses[Math.floor(Math.random() * this.crystalCurses.length)]);

            this.wins++;
            $("#wins").text(this.wins);
            document.querySelector("#win-sound").play();
            this.init();

        }



    },

    //Checks if current crystal count is greater than the main game number
    isGameOver: function() {

        if (this.crystalCount > this.gameNumber) {

            return true;
        } else {
            return false;
        }
    },

    //If game is over, then execute game over actions
    gameLose: function() {

        if (this.isGameOver() === true) {

            this.losses++

                $("#losses").text(this.losses);
            //$("#playthrough").text("Sorry, you lost the last round!");
            this.modalDialog("Oh no!", "The crystals have cast a curse: " + this.crystalCurses[Math.floor(Math.random() * this.crystalCurses.length)]);
            document.querySelector("#lose-sound").play();
            game.init();

        }

    },

    modalDialog: function(heading, message) {
        let modalMessage = '<div class=modal role=dialog tabindex=-1><div class=modal-dialog role=document><div class=modal-content><div class=modal-header><h5 class=modal-title>' + heading + '</h5><button class=close data-dismiss=modal type=button aria-label=Close><span aria-hidden=true>×</span></button></div><div class="modal-body text-center"><p>' + message + '</div><div class=modal-footer><button class="btn btn-secondary"data-dismiss=modal type=button>Close</button></div></div></div></div>'
        $(modalMessage).modal("show");
    },





}

//Initilize game
game.init();

//When the user clicks a crystal button
$(".crystal").on("click", function() {


    //If game is not over
    if (game.isGameOver() === false) {


        //increment crystalCount based current value plus the value of the crystal clicked
        game.crystalCount = game.crystalCount + parseInt($(this).attr("value"))
        game.crystalsAdded = game.gameNumber + parseInt($(this).attr("value"))
        $("#crystals-count").text(game.crystalCount);
        console.log("Main number ", game.gameNumber, "crystal count: ", game.crystalCount)
    }

    //run game win and lose checks
    game.gameWin();
    game.gameLose();


});
//If the user chooses to restart the game
$("#new-game").on("click", function() {

    game.newGame();
});