//this is the code for game timer
game.GameTimerManager = Object.extend({
    init: function(x, y, settings){
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    //this controls how often a creep spawns and gold.
    update: function(){
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck();
        
        return true;
    },
    //this is checking the timer for gold and givng you gold after a certain amount of time.
    goldTimerCheck: function() {
        if (Math.round(this.now / 1000) % 20 === 0 && (this.now - this.lastCreep >= 1000)) {
            game.data.gold += (game.data.exp1+1);
            console.log("Current Gold: " + game.data.gold);
        }
    },
    
    //here's the creep timer check functin checking the timer for the creeps
    creepTimerCheck: function() {
        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
            me.game.world.addChild(creepe, 5);
        }
    }
});