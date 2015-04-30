//here is the hero death manager code!
game.HeroDeathManager =  Object.extend({
    init: function(x, y, settings){
        this.alwaysUpdate = true;
    },
    
    update: function(){
        //IF your player dies then it will be removed from the map temporarily.
        //the mini player on the mini map will also be removed.
        if(game.data.player.dead){
            me.game.world.removeChild(game.data.player);
            me.game.world.removeChild(game.data.miniPlayer);
            me.state.current().resetPlayer(10, 0);
        }
        return true;
    }
});