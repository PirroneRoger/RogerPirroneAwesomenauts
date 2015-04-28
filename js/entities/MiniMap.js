//this code is for the minimap which is very important.
game.MiniMap = me.Entity.extend({
    init: function(x, y, settings){
        //heres all the dimensions and stuff in code called through code for the game which is run by code.
        this._super(me.Entity, "init", [x, y, {
            image: "minimap",
            width: 281,
            height: 157,
            spritewidth: "281",
            spriteheight: "157",
            getShape: function(){
                //we have this here because the picture is 281 by 157 and that's also through code.
                return (new me.Rect(0, 0, 281, 157)).toPolygon();
            }
        }]);
        //this code uses the words this, floating and true.
        this.floating = true;
    
    }
});