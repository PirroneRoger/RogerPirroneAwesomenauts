game.TitleScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("title-screen")), -10);
        //here we set up the font for the title screen and where it's at
        game.data.option1 = new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                this.font = new me.Font("Arial", 46, "white");
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);

            },
            //here's the draw code for start a new game
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);

            },
            update: function(dt) {
                return true;
            },
            //if you click on the button it does something
            newGame: function() {
                me.input.releasePointerEvent('pointerdown', this);
                me.input.releasePointerEvent('pointerdown', game.data.option2);
                me.state.change(me.state.NEW);
            }
        }));
        me.game.world.addChild(game.data.option1);
        //adding title screen to the world
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("title-screen")), -10);
        
       game.data.option2 = new (me.Renderable.extend({
            init: function() {
                //more code for stuff that is important to the code.
                this._super(me.Renderable, 'init', [380, 340, 250, 50]);
                this.font = new me.Font("Arial", 46, "white");
                me.input.registerPointerEvent('pointerdown', this, this.continueGame.bind(this), true);

            },
            //draw function for continue game
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "CONTINUE GAME", this.pos.x, this.pos.y);

            },
            update: function(dt) {
                return true;
            },
            //Here's additional code for pointerdown which does great stuff.
            continueGame: function() {
                me.input.releasePointerEvent('pointerdown', game.data.option1);
                me.input.releasePointerEvent('pointerdown', this);
                me.state.change(me.state.LOAD);
            }
        }));
        me.game.world.addChild(game.data.option2);


    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        
    }
});