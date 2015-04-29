//here's all the amazing code for the player's base.
game.PlayerBaseEntity = me.Entity.extend({
    init : function(x, y, settings){
        //here's the code where we call upon all the shapes and stuff. It's important.
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function(){
                    return (new me.Rect(0, 0, 100, 70)).toPolygon();
                }
        }]);
        //if the tower is not broken then it has health and collision.
        this.broken = false;
        this.health = game.data.playerBaseHealth;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        //here's defining the type because it's important that's why.
        this.type = "PlayerBaseEntity";
        //here's code for the animation. Which includes words like idle and broken.
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    
    },
    //here's the update function! Yes! Neccessary! Code!
    update:function(delta){
        if(this.health<=0){
            //if it's broken the tower the player does not win.
            this.broken = true;
            game.data.win = false;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        //here's the super code cause this game is super!
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    //this function allows the tower to lose health
    loseHealth: function(damage){
        this.health = this.health - damage;
    },
    
    //here's the collision for the tower.
    onCollision: function(){
        
    }
    
});