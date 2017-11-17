function init(){
	mouse = {x: 0, y: 0}
	
	canvas = {el:document.querySelector('canvas'),width:0,height:0};
	canvas.width = canvas.el.offsetWidth; canvas.height = canvas.el.offsetHeight;
	
	debug = {add:false, quadtree:true}
	
	ctx = canvas.el.getContext("2d");
	
	grid = new gridObj(100, 100);
	
	cam = new cameraObj();
	
	pl = new player({x:100, y:120, width:20, height:20, color: "purple"});
  	
	keymap = [];

	grid.insert(new entity({x:100, y:80, width:100, height:20, color: getRandomColor()}));
 
	loop();
}

function loop(){ update(); render();}

function update(){

	pl.resetDir();

	cam.updateEye();

	quadTree = new quad_tree_obj(0, 0, canvas.width, canvas.height, 4, 1, 4);

 	grid.loop(grid.get(cam.eye), cam.eye, function(ent){ 
		quadTree.insert(ent, cam); 
	});

	var ents = quadTree.get(pl, cam);
	for(let i = 0; i < ents.quad.length; i++){ pl.col(ents.quad[i], cam); }
	for(let i = 0; i < ents.parent.length; i++){ pl.col(ents.parent[i], cam); }	
 
	pl.actions(keymap);
 
	requestAnimationFrame(this.loop.bind(this));
}
function render(){
	//clear screen
	ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	//draws everything inside the cameras view
	grid.loop(grid.get(cam.eye), cam.eye, function(ent){ 
 
 		ctx.fillStyle = ent.color; 
		ctx.fillRect( (ent.pos.x+cam.x), (ent.pos.y+cam.y), ent.width, ent.height);
		
		ctx.font = "10px Arial";ctx.fillStyle = "#000000"; 
		ctx.fillText("X{"+(ent.pos.x)+"}--Y{"+(ent.pos.y)+"}"+ent.id , (ent.pos.x+cam.x), (ent.pos.y+cam.y) );		
	});

	//draws player
	//ctx.fillStyle = 'red'; ctx.fillRect(pl.x-(24/2), pl.y-(24/2), pl.width+24, pl.height+24);
	ctx.fillStyle = pl.color; ctx.fillRect(pl.pos.x, pl.pos.y, pl.width, pl.height);

	//draws a ghost box where if the mouse is clicked it will put a new box
	if(debug.add){ 
		ctx.font = "10px Arial";ctx.fillStyle = "#000000"; 
		ctx.fillText("X{"+ (mouse.x-cam.x) +"}--Y{"+ (mouse.y+cam.y) +"}", mouse.x+10, mouse.y-10   );
		ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(mouse.x, mouse.y, document.getElementById('add-width').value, document.getElementById('add-height').value); 
	}
	
	//draws quad tree
	if(debug.quadtree){ quadTree.draw(ctx); }	
	
	debugBox(pl.vel.x+" | "+pl.acc.x+" | "+pl.pos.x,false); 
	debugBox(pl.vel.y+" | "+pl.acc.y+" | "+pl.pos.y,true);

	debugBox(pl.coldir['top'].maxMove+" | "+pl.coldir['right'].maxMove+" | "+pl.coldir['bottom'].maxMove+" | "+pl.coldir['left'].maxMove,true);
 
}

function getRandomColor(){var letters = '0123456789ABCDEF'; var color = '#'; for (var i = 0; i < 6; i++) { color += letters[Math.floor(Math.random() * 16)]; } return color;}
function debugBox(text, append=false){document.getElementById('debuBox').value = (append? document.getElementById('debuBox').value+'\n' : '')+text;}
function createEvents(){
	canvas.el.oncontextmenu = function (e) { e.preventDefault(); };
	window.addEventListener('mousemove', function(e){
		var rect = canvas.el.getBoundingClientRect();
		mouse.x = parseInt((e.clientX - rect.left) / (rect.right - rect.left) * canvas.el.width);
		mouse.y = parseInt((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.el.height);
		mouse.x = (mouse.x<0?0:mouse.x); mouse.x = (mouse.x>canvas.el.width?canvas.el.width:mouse.x);
		mouse.y = (mouse.y<0?0:mouse.y); mouse.y = (mouse.y>canvas.el.height?canvas.el.height:mouse.y);
	}, false);	
	canvas.el.onmousedown = function(e) {
		if(e.button == 0){//left click
			if(debug.add){
				var id = grid.insert(new entity({x:(mouse.x-cam.x), y:(mouse.y-cam.y), width:parseFloat(document.getElementById('add-width').value), height:parseFloat(document.getElementById('add-height').value), color: getRandomColor()}));	
			}
		}else if(e.button == 2){//right click
			//collision with mouse if you right click
			grid.loop(grid.get(cam.eye), cam.eye, function(ent){ 
 				if(mouse.x>=ent.x+cam.x && mouse.x<=ent.x+cam.x+ent.width && mouse.y>=ent.y+cam.y && mouse.y <= ent.y+cam.y+ent.height){
					gridKey = ent.id.split("-");
					grid.container[ gridKey[0] ][ gridKey[1] ][ gridKey[2] ] = [];
				}
			});
		}
	};
	document.getElementById('add').onmousedown = function(e) {
		debug.add = (debug.add ? false : true);
		this.textContent  = debug.add;
	};
	document.getElementById('quadtree').onmousedown = function(e) {
		debug.quadtree = (debug.quadtree ? false : true);
		this.textContent  = debug.quadtree;
	};	
	onkeydown = onkeyup = function(e){e = e || event; keymap[e.keyCode] = e.type == 'keydown';keymap['last_key'] = e.keyCode;}	
}

window.onload = function(){ 
 	init();
	createEvents();
};
 
