game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10);
                document.getElementById("input").style.visibility = "visible";
                document.getElementById("register").style.visibility = "visible";
                //unbinding keys which is awesome
                me.input.unbindKey(me.input.KEY.B);
                me.input.unbindKey(me.input.KEY.Q);
                me.input.unbindKey(me.input.KEY.E);
                me.input.unbindKey(me.input.KEY.W);
                me.input.unbindKey(me.input.KEY.A);
                
                //adds the screen and font and text
                me.game.world.addChild(new (me.Renderable.extend({
                    init: function(){
                        this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                        this.font = new me.Font("Helvetica", 46,  "white");
                    },
                    //draws the redederer and this position and get context. Code!
                    draw: function(renderer){
                        this.font.draw(renderer.getContext(), "", this.pos.x, this.pos.y);
                    },
                    //returrn true to the update function. Code!
                    update: function(dt){
                        return true;
                    },
                    //removing all skills cause your starting a new game.
                    newGame: function(){
                        me.input.releasePointerEvent('pointerdown', this);
                        me.save.remove('exp');
                        me.save.remove('exp1');
                        me.save.remove('exp2');
                        me.save.remove('exp3');
                        me.save.remove('exp4');
                        //then changing the state to play
                        me.state.change(me.state.PLAY);
                    }
                })));
                    //code for the text box and stuff for username and password.
                    me.game.world.addChild(new (me.Renderable.extend({
                    init: function(){
                        this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                        this.font = new me.Font("Helvetica", 26,  "white");
                    },
                    
                    draw: function(renderer){
                        this.font.draw(renderer.getContext(), "PICK A USERNAME AND PASSWORD", this.pos.x, this.pos.y);
                    }
                })));
                
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
            document.getElementById("input").style.visibility = "hidden";
            document.getElementById("register").style.visibility = "hidden";
	}
});
