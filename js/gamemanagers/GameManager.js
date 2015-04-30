//Here's the code for managing experience for the code.
game.ExperienceManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
        this.gameover = false;
    },
    //this update function has to do with beating the game or losing it
    update: function() {
        if (game.data.win === true && !this.gameover) {
            this.gameOver(true);
            //if game over is true as in you destroyed the tower you win
            alert("YOU WIN!");
        } else if (game.data.win === false && !this.gameover) {
            this.gameOver(false);
            //if your tower gets destroyed then you lose.
            alert("YOU LOSE!");
        }

        return true;
    },
    //if you win then you get experience but if you don't you don't get as much.
    gameOver: function(win) {
        if (win) {
            game.data.exp += 10;
        } else {
            game.data.exp += 1;
        }
        this.gameover = true;
        me.save.exp = game.data.exp;


        //here's the code for ajax which is like a cleaner or something so I'm not sure why it's here.
        $.ajax({
            //here's saving your user to the fancy php stuff.
            type: "POST",
            url: "php/controller/save-user.php",
            data: {
                //here's the code for experience set up.
                exp: game.data.exp,
                exp1: game.data.exp1,
                exp2: game.data.exp2,
                exp3: game.data.exp3,
                exp4: game.data.exp4,
            },
            //the text type is data type text
            dataType: "text"
        })
                //here if you press menu it will take you to the menu screen!
                .success(function(response) {
                    if (response === "true") {
                        me.state.change(me.state.MENU);
                    } else {
                        console.log(response);
                        //alert(response);
                    }
                })
                //if it fails it will give you an alert that says fail.
                .fail(function(response) {
                    alert("Fail");
                });
    }
});