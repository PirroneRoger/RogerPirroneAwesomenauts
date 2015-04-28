//this code is all the code for the enemy creep
game.EnemyCreep = me.Entity.extend({
    //here's all the init stuff for this code for the enemy creep which is in code.
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "creep1",
                //this is all the dimensions in code for the enemy which is created in code.
                width: 32,
                height: 64,
                spritewidth: "32",
                spriteheight: "64",
                getShape: function(){
                    return (new me.Rect(0, 0, 32, 64)).toPolygon();
                }
        }]);
        //this code here is code which activates certain things like health through code.
        this.health = game.data.enemyCreepHealth;
        this.alwaysUpdate = true;
        //this.attacking lets us know  if the enemy is currently attacking
        this.attacking = false;
        //keeps track of when our creep last attacked anything
        this.lastAttacking = new Date().getTime();
        //keeps track of the last time our creep hit anything
        this.lastHit = new Date().getTime();
        this.now = new Date().getTime();
        //this sets the speed for the creeper
        this.body.setVelocity(3, 20);
        //here's the code calling upon the asset enemy creep or something like that
        this.type = "EnemyCreep";
        //this code is for walking animation and the time intervals.
        this.renderable.addAnimation("walk", [3, 4, 5], 80);
        this.renderable.setCurrentAnimation("walk");
    
    },
    
    //this function is for the creeper's health and all that and damage.
    loseHealth: function(damage){
        this.health = this.health - damage;
    },
    
    //here's the delta function for this game for the creep in code. 
    update: function(delta){
        //if the creep dies the game removes him from the game.
        if(this.health <=0){
            me.game.world.removeChild(this);
        }
        
        //this code here is for the timer and suff.
        this.now = new Date().getTime();
        //this code here is for the timer and the timer is in code.
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        //this collision code is important because without collision we'd have problems.
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        //this delta update is for the code of the game.
        this.body.update(delta);
        
        
        //this code here finishes the update function.
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    //here's the collide handler function and code. This is important to the code.
    collideHandler: function(response){
        if(response.b.type==='PlayerBaseEntity'){
            this.attacking=true;
            //this.lastAttacking=this.now;
            this.body.vel.x = 0;
            //keeps moving creep to the right to  maintain position
            this.pos.x = this.pos.x + 1;
            //checks that it has been one second since this creep hit a base
            if((this.now-this.lastHit >=1000)){
                //updates the lasthit timer
                this.lastHit = this.now;
                //makes the player base call its loseHealth function and passes it a damage of 1
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
        }else if (response.b.type==='PlayerEntity'){
            var xdif = this.pos.x - response.b.pos.x;
            
            this.attacking = true;
            //this.lastAttacking=this.now;
            
            
            if(xdif>0){
                //keeps moving creep to the right to  maintain position
                this.pos.x = this.pos.x + 1;
                this.body.vel.x = 0;
            }
            //checks that it has been one second since this creep hit something
            if ((this.now - this.lastHit >= 1000) && xdif>0) {
                //updates the lasthit timer
                this.lastHit = this.now;
                //makes the player call its loseHealth function and passes it a damage of 1
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
        }
    }
    
});