var board = new WGo.Board(document.getElementById("board"), {
    width: 600,
    size: 19,
    section: {
        top: -.5,
        right: -.5,
        bottom: -.5,
        left: -.5
        }
});

var tool = document.getElementById("tool"); // get the <select> element

board.addEventListener("click", function(x, y) {
    if(tool.value === "black") {
        board.addObject({
            x: x,
            y: y,
            c: WGo.B
        });
    }
    else if(tool.value === "white") {
        board.addObject({
            x: x,
            y: y,
            c: WGo.W
        });
    }
    else if(tool.value === "remove") {
        board.removeObjectsAt(x, y);
    }
    else {
        board.addObject({
            x: x,
            y: y,
            type: tool.value
        });
    }
});

var coordinates = {
    // draw on grid layer
    grid: {
        draw: function(args, board) {
            var ch, t, xright, xleft, ytop, ybottom;
            
            this.fillStyle = "rgba(0,0,0,0.7)";
            this.textBaseline="middle";
            this.textAlign="center";
            this.font = board.stoneRadius+"px "+(board.font || "");
            
            xright = board.getX(-0.75);
            xleft = board.getX(board.size-0.25);
            ytop = board.getY(-0.75);
            ybottom = board.getY(board.size-0.25);
            
            for(var i = 0; i < board.size; i++) {
                ch = i+"A".charCodeAt(0);
                if(ch >= "I".charCodeAt(0)) ch++;
                
                t = board.getY(i);
                this.fillText(board.size-i, xright, t);
                this.fillText(board.size-i, xleft, t);
                
                t = board.getX(i);
                this.fillText(String.fromCharCode(ch), t, ytop);
                this.fillText(String.fromCharCode(ch), t, ybottom);
            }
            
            this.fillStyle = "black";
		}
    }
}
board.addCustomObject(coordinates);