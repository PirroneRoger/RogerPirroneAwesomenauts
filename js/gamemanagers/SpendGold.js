//here's code for spend gold
game.SpendGold = Object.extend({
    init: function(x, y, settings){
        this.now = new Date().getTime();
        this.lastBuy = new Date().getTime();
        //if the screen is paused then it pulls up the spend gold screen
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
        this.buying = false;
    },
    //here's the update function for spend gold 
    update: function(){
        this.now = new Date().getTime();
        //if you press the buy button it buys the ablility you want to buy
        if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
            this.lastBuy = this.now;
            //if you don't have enough gold it won't allow you to buy it.
            if(!this.buying){
                this.startBuying();
            }else{
                this.stopBuying();
            }
        }
        //this is checking the buy keys
        this.checkBuyKeys();
        
        return true;
    },
    //this long line of wonderful code checks whether your playing or not then it binds they keys so you can 
    //buy skills and it also adds stuff to the player which is awezing.
    startBuying: function(){
        this.buying = true;
        me.state.pause(me.state.PLAY);
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
        game.data.buyscreen.updateWhenPaused = true;
        game.data.buyscreen.setOpacity(0.8);
        me.game.world.addChild(game.data.buyscreen, 34);
        game.data.player.body.setVelocity(0, 0);
        me.state.pause(me.state.PLAY);
        
        //BINDS KEYS!!!!!!!!!!!!!!!!!!!!!!!
        me.input.bindKey(me.input.KEY.F1, "F1", true);
        me.input.bindKey(me.input.KEY.F2, "F2", true);
        me.input.bindKey(me.input.KEY.F3, "F3", true);
        me.input.bindKey(me.input.KEY.F4, "F4", true);
        me.input.bindKey(me.input.KEY.F5, "F5", true);
        me.input.bindKey(me.input.KEY.F6, "F6", true);
        this.setBuyText();
    },
    //here's the text for buying stuff it's awesome.
    setBuyText: function() {
        game.data.buytext = new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                this.font = new me.Font("Helvetica", 26, "white");
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;
            },
            //here's all the text that apepars and it's cost. It all works wonderfunlly.
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT. Current Gold: " + game.data.gold, this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "Increase Damage. Current Level: " + game.data.skill1 + " Cost: " + ((game.data.skill1+1)*10), this.pos.x, this.pos.y + 40);
                this.font.draw(renderer.getContext(), "Run Faster! Current Level: "  + game.data.skill2 + " Cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y + 80);
                this.font.draw(renderer.getContext(), "Increase Health. Current Level " + game.data.skill3 + " Cost: " + ((game.data.skill3+1)*10), this.pos.x, this.pos.y + 120);
                this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level: "  + game.data.ability1 + " Cost: " + ((game.data.ability1+1)*10), this.pos.x, this.pos.y + 160);
                this.font.draw(renderer.getContext(), "W Ability: Eat Your Creep For Health: "  + game.data.ability2 + " Cost: " + ((game.data.ability2+1)*10), this.pos.x, this.pos.y + 200);
                this.font.draw(renderer.getContext(), "E Ability: Throw Your Spear: " + game.data.ability3 + " Cost: " + ((game.data.ability3+1)*10), this.pos.x, this.pos.y + 240);
            }
            
        }));
        //the size of the text.
        me.game.world.addChild(game.data.buytext, 35);
    },
    //here's the code for unbinding the keys where it unbinds the keys after it you unpaus
    stopBuying: function(){
        this.buying = false;
        //once you resume it removes the pause screen.
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.game.world.removeChild(game.data.buyscreen);
        me.input.unbindKey(me.input.KEY.F1, "F1", true);
        me.input.unbindKey(me.input.KEY.F2, "F2", true);
        me.input.unbindKey(me.input.KEY.F3, "F3", true);
        me.input.unbindKey(me.input.KEY.F4, "F4", true);
        me.input.unbindKey(me.input.KEY.F5, "F5", true);
        me.input.unbindKey(me.input.KEY.F6, "F6", true);
        me.game.world.removeChild(game.data.buytext);
    },
    //here's the check buy key function pretty much setting up what each key does.
    checkBuyKeys: function() {
        //here's setting up F1
        if(me.input.isKeyPressed("F1")){
            if(this.checkCost(1)){
                this.makePurchase(1);
            }
            //here's setting up F2
        }else if(me.input.isKeyPressed("F2")){
            if(this.checkCost(2)){
                this.makePurchase(2);
            }
            //here's setting up F3
        }else if(me.input.isKeyPressed("F3")){
            if(this.checkCost(3)){
                this.makePurchase(3);
            }
            //here's setting up F4
        }else if(me.input.isKeyPressed("F4")){
            if(this.checkCost(4)){
                this.makePurchase(4);
            }
            //here's setting up F5
        }else if(me.input.isKeyPressed("F5")){
            if(this.checkCost(5)){
                this.makePurchase(5);
            }
            //here's setting up F6
        }else if(me.input.isKeyPressed("F6")){
            if(this.checkCost(6)){
                this.makePurchase(6);
            }
        }
    },
    
    //Here we check the cost of each skill and set up stuff.
    checkCost: function(skill){
        if(skill===1 && (game.data.gold >= ((game.data.skill1+1)*10))){
            return true;
        }else if(skill===2 && (game.data.gold >= ((game.data.skill2+1)*10))){
            return true;
        }else if(skill===3 && (game.data.gold >= ((game.data.skill3+1)*10))){
            return true;
        }else if(skill===4 && (game.data.gold >= ((game.data.ability1+1)*10))){
            return true;
        }else if(skill===5 && (game.data.gold >= ((game.data.ability2+1)*10))){
            return true;
        }else if(skill===6 && (game.data.gold >= ((game.data.ability3+1)*10))){
            return true;
        }else{
            return false;
        }
    },
    
    //here we set up stuff if you make the purchase and how mcuh it costs ablility and stuff like that.
    makePurchase: function(skill){
        if(skill === 1){
        game.data.gold -= ((game.data.skill1 +1)* 10);
        game.data.skill1 += 1;
        game.data.playerAttack += 1;
        }else if(skill ===2){
            game.data.gold -= ((game.data.skill2 +1)* 10);
            game.data.skill2 += 1;
        }else if (skill ===3){
            game.data.gold -= ((game.data.skill3 +1)* 10);
            game.data.skill3 += 1;
        }else if (skill ===4){
            game.data.gold -= ((game.data.ability1 +1)* 10);
            game.data.ability1 += 1;
        }else if (skill ===5){
            game.data.gold -= ((game.data.ability2 +1)* 10);
            game.data.ability2 += 1;
        }else if (skill ===6){
            game.data.gold -= ((game.data.ability3 +1)* 10);
            game.data.ability3 += 1;
        }
    }
    
});