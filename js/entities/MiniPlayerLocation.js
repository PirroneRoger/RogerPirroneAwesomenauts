//here's the code for the little blue dot which follows my player around on the minimap.
game.MiniPlayerLocation = me.Entity.extend({
    init: function(x, y, settings){
        //this is all code that was typed in the video which I typed in my game and now it works.
        this.settings = settings;
        //the radius is 5.
        this.r = 5;
        this.diameter = (this.r+2)*2;
        this.anchorPoint = new me.Vector2d(0, 0);
        this.loc = x, y;
        //here's stuff for the dimensions which we need because it's important.
        this.settings.width = this.diameter;
        this.settings. spritewidth = this.diameter;
        this.settings = this.diameter;
        this.floating = true;
        //this calls the image which will follow me which is a little blue dot which is amazing cause code.
        this.image = me.video.createCanvas(this.settings.width, this.settings. height);
        var ctx = me.video.renderer.getContext2d(this.image);
        //this says to always update. I knew that one.
        this.alwaysUpdate = true;
        
        //this complicated stuff pretty much makes the dot small and blue.
        ctx.fillStyle = "rgba(0, 192, 32, 0.75)";
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        
        //including all of this code.
        ctx.arc(this.r + 2, this.r +2, this.r, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
        
        //variables is this which is for the code.
        var my = this;
        this._super(me.Entity, "init", [x, y, {
                //we use 14 here because something didn't work I don't even know. Code.
            width: 14,
            height: 14,
            spritewidth: 14,
            spriteheight: 14,
            getShape: function(){
                return(new me.Rect (0, 0, 14, 14)).toPolygon();
            }
        }]);
    },
    //this code is the function renderer and it draws the image for the dot.
    draw: function(renderer){
        this._super(me.Entity, "draw", [renderer]);
        this.floating = true;
        renderer.drawImage(
                this.image,
                0, 0, this.width, this.height,
                this.pos.x, this.pos.y, this.width, this.height
                );
    },
    
    //this update function ends the code which is just dandy cause that means we're done with the comments on this page.
    update: function(){
        this.pos.x = (10 + (game.data.player.pos.x * 0.25));
        this.pos.y = (10 + (game.data.player.pos.y * 0.25));
        return true;
    }
    
});