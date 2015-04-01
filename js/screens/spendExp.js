game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO
                
                
                me.game.world.addChild(new (me.Renderable.extend({
                    init: function(){
                        this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                        this.font = new me.Font("Helvetica", 46,  "white");
                    },
                    
                    draw: function(renderer){
                        this.font.draw(renderer.getContext(), "Spend", this.pos.x, this.pos.y);
                    },
                    
                    update: function(dt){
                        return true;
                    },
                    
                    newGame: function(){
                        me.input.releasePointerEvent('pointerdown', this);
                        me.save.remove('exp');
                        me.save.remove('exp1');
                        me.save.remove('exp2');
                        me.save.remove('exp3');
                        me.save.remove('exp4');
                        me.state.change(me.state.PLAY);
                    }
                })));
                
                    me.game.world.addChild(new (me.Renderable.extend({
                    init: function(){
                        this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                        this.font = new me.Font("Helvetica", 46,  "white");
                    },
                    
                    draw: function(renderer){
                        this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
                        this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
                        this.font.draw(renderer.getContext(), "F1: INCREASE GOLD PRODUCTION " + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 100);
                        this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD " + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 150);
                        this.font.draw(renderer.getContext(), "F3: INCREASE ATTACK DAMAGE " + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 200);
                        this.font.draw(renderer.getContext(), "F4: INCREASE STARTING HEALTH " + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 250);
                    }
                })));
                
                
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});
