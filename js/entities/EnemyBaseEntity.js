//here is the code for the enemy base entity/the rock tower thing.
game.EnemyBaseEntity = me.Entity.extend({
    //here we set up all the dimensions and stuff
    init : function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                //this is the get shape function for melon js to get the shape
                getShape: function(){
                    return (new me.Rect(0, 0, 100, 70)).toPolygon();
                }
        }]);
    //if the tower isn't broken then it has health and that's what this code here is.
        this.broken = false;
        this.health = game.data.enemyBaseHealth;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        //this tells the type which is enemy base entity
        this.type = "EnemyBaseEntity";
        //this code here is for the animation and whether it's broken or not.
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    
    },
    //here's the start of the update function
    update:function(delta){
        if(this.health<=0){
            this.broken = true;
            game.data.win = true;
            this.renderable.setCurrentAnimation("broken");
        }
        //here's code for the update function
        this.body.update(delta);
        //this code here is calling upon the super class to finish the update function
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    //here's the function for the collision of the tower
    onCollision: function(){
        
    },
    
    //here's the function for the tower losing health.
    loseHealth: function(){
        this.health--;
    }
    
});