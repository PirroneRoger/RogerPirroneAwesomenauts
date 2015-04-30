//this code here is the entire entities file that is long and does lot of important stuff.
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings){
        //heres the init stuff for the player entity
        this.setSuper(x, y);
        this.setPlayerTimers();
        this.setAttributes();
        this.type = "PlayerEntity";
        this.setFlags();    
        //here's viewport code which makes the screen follow your character.
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        //here's where we add the animation to the player!
        this.addAnimation();
        //here's where we render the animation!
        this.renderable.setCurrentAnimation("idle");
    },
    //here's where we set the dimensions for the player sprite
    setSuper: function(x, y) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    //64 is the dimensions of the sprite!
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
    },
    //here's the player timer function with various timers and stuff.
    setPlayerTimers: function(){
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastSpear = this.now;
        this.lastAttack = new Date().getTime();
    },
    //here's where we set attributes like skills and stuff
    setAttributes: function(){
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        //here's the function that is attack!
        this.attack = game.data.playerAttack;
    },
    //this function is important for how the class looks
    setFlags: function(){
        //keeps track of which  direction your character is going
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
    },
    //here's the animation for walking attacking and standing still.
    addAnimation: function(){
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
    },
    //here's the update function where it checks ability's keys and various other things.
    update: function(delta){
        this.now = new Date().getTime();       
        this.dead = this.checkIfDead();        
        this.checkKeyPressedAndMove();
        this.checkAbilityKey();
        this.setAnimation();        
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);        
        this._super(me.Entity, "update", [delta]);
        //here's the return true function
        return true;
    },
    //here we check if the player is dead
    checkIfDead: function(){
        //here's a function that has something to do with health.
        if(this.health <= 0){
            return true;
        }
        return false;
    },
    //this code is for moving left and right anf jumping
    checkKeyPressedAndMove: function(){
        if(me.input.isKeyPressed("right")){
            this.moveRight();
        }else if(me.input.isKeyPressed("left")){
            this.moveLeft();
        }else{
            this.body.vel.x = 0;
        }
            //the code for jumping
                if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling){
            this.jump();
        }
        
        if(this.body.vel.y === 0){
            this.jumping = false;
        }
        //the code for attacking
        this.attacking = me.input.isKeyPressed("attack");
    },
    
    moveRight: function(){
            //adds the position of my x by the velocity defined above in
            //setVelocity() and multiplying it by me.timer.tick.
            //me.timer.tick makes the movement look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            this.flipX(true);
    },
    
    //move left function, moves the player left. Through code.
    moveLeft: function(){
            this.facing = "left";
            this.body.vel.x -=this.body.accel.x * me.timer.tick;
            this.flipX(false);
    },
    //jump function where the player jumps
    jump: function(){
        this.jumping = true;
        this.body.vel.y -= this.body.accel.y * me.timer.tick;
    },
    
    //here's where we set up the skills 1-3 and checking stuff.
    checkAbilityKey: function(){
        if(me.input.isKeyPressed("skill1")){
            //this.speedBurst();
        }else if(me.input.isKeyPressed("skill2")){
            //this.eatCreep();
        }else if(me.input.isKeyPressed("skill3")){
            this.throwSpear();
        }
    },
    //heres the main code for spear throw 
    throwSpear: function(){
        //this code is setting up speed and stuff like that
        if((this.now-this.lastSpear) >= game.data.spearTimer*1000 && game.data.ability3 > 0){
            this.lastSpear = this.now;
            //here's the facing stuff
            var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
            me.game.world.addChild(spear, 10);
        }    
    },
    //here's the animation code!
    setAnimation: function(){
                if(this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //sets the current animation to attack and once thats over goes back to idle animation
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so  that the next time we start this sequence we begin from the first animation,
                //not wherever we left off when we switched to another 
                this.renderable.setAnimationFrame();
            }
        }
        //this else if function is checking where your walking and the direction to attack
        else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
            //here's more else if stuff checking attack and idle animation stuff
        }else if(!this.renderable.isCurrentAnimation("attack")){
            this.renderable.setCurrentAnimation("idle");
        }
    },
    //here's the lose health function where you lose health
    loseHealth: function(damage){
        this.health = this.health - damage;
    },
    //here's the code for collide handler and that has to do with the enemy base and creep
    collideHandler: function(response){
        if(response.b.type==='EnemyBaseEntity'){
            this.collideWithEnemyBase(response);
        }else if(response.b.type==='EnemyCreep'){
            this.collideWithEnemyCreep(response);
        }
    },
    //here's the collide with enemy base code where we check if your hitting the base.
    collideWithEnemyBase: function(response){
            var ydif = this.pos.y - response.b.pos.y;
            var xdif = this.pos.x - response.b.pos.x;            
            if(ydif<-40 && xdif<70 && xdif>-35){
                this.body.falling = false;
                this.body.vel.y = -1;
            }//this else if code is checking stuff regarding which way your facing.
            else if(xdif>-35 && this.facing==='right' &&(xdif<0)){
                this.body.vel.x = 0;
            }else if(xdif<70 && this.facing==='left' && xdif>0){
                this.body.vel.x =0;
            }            
            //if you attack the base it loses health.
            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.playerAttack);
            }
    },
    //here's code for collide with enemy creep as in you walk into them and can't walk through them
    collideWithEnemyCreep: function(response){        
            var xdif = this.pos.x - response.b.pos.x;
            var ydif = this.pos.y - response.b.pos.y;           
            this.stopMovement(xdif);           
            //if you hit the creep then you can't walk
            if(this.checkAttack(xdif, ydif)){
                this.hitCreep(response);
            };
    },
    //here's code for stop movement where if you stop you stop whether left or right.
    stopMovement: function(xdif){
        if(xdif>0){
                if(this.facing==="left"){
                    this.body.vel.x = 0;
                }
            }else{
                if (this.facing === "right") {
                    this.body.vel.x = 0;
                }
            } 
    },
    //here's where we check attack and if you attack then the animation does it's thing along with the timer.
    checkAttack: function(xdif, ydif){
                if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
                    && (Math.abs(ydif) <=40) && 
                    (((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
                    ){
                this.lastHit = this.now;
                return true;
            }
            return false;
    },
    //if you hit the creep and it dies you get GOLD!!!!!!!!!!!!!!!!!!
    hitCreep: function(response){
                //if the creep health is less than attack, execute code in if statement
                if(response.b.health <= game.data.playerAttack){
                    //adds one gold for a creep kill
                    game.data.gold += 1;
                }                
                response.b.loseHealth(game.data.playerAttack);
    }
});