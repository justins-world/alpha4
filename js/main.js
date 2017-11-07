function init(){
	mouse = {x: 0, y: 0}
	
	canvas = {el:document.querySelector('canvas'),width:0,height:0};
	canvas.width = canvas.el.offsetWidth; canvas.height = canvas.el.offsetHeight;
	
	debug = {add:false, quadtree:true}
	
	ctx = canvas.el.getContext("2d");
	
	grid = new gridObj(100, 100);
	
	cam = new cameraObj();
	
	player = new entity({x:100, y:120, width:20, height:20, color: "purple"});
	player.speed = 7;
 	
	keymap = [];

	grid.insert(new entity({x:100, y:80, width:100, height:20, color: getRandomColor()}));
 
	loop();
}

function loop(){ update(); render();}

function update(){

	player.resetDir();

	cam.updateEye();

	quadTree = new quad_tree_obj(0, 0, canvas.width, canvas.height, 4, 1, 4);

 	grid.loop(grid.get(cam.eye), cam.eye, function(ent){ 
		quadTree.insert(ent, cam); 
	});

	var ents = quadTree.get(player, cam);
	
	for(let i = 0; i < ents.quad.length; i++){ player.col(ents.quad[i], cam); }
	for(let i = 0; i < ents.parent.length; i++){ player.col(ents.parent[i], cam); }	
 
	if(keymap['38']){//up
		if(player.dir.top.canMove){
			if(player.y <= cam.yMinDist){
				cam.y+=(player.dir.top.maxMove == -1? player.speed : (player.speed<player.dir.top.maxMove ?  player.speed:player.dir.top.maxMove ));
			}else{
				player.y-=(player.dir.top.maxMove == -1? player.speed : (player.speed<player.dir.top.maxMove ?  player.speed:player.dir.top.maxMove ));
			}

		}
	
	}
	if(keymap['40']){//down
		if(player.dir.bottom.canMove){	
			if(player.y+player.height >= cam.yMaxDist){
				cam.y-=(player.dir.bottom.maxMove== -1? player.speed : (player.speed<player.dir.bottom.maxMove ?  player.speed:player.dir.bottom.maxMove ));
			}else{
				player.y+=(player.dir.bottom.maxMove== -1? player.speed : (player.speed<player.dir.bottom.maxMove ?  player.speed:player.dir.bottom.maxMove ));
			}
		}

	}
	if(keymap['37']){
		player.acc.x = -0.5
	}else if(keymap['39']){
		player.acc.x = 0.5
	}else{
		//player.acc.x = player.acc.x * -1;
		player.vel.x = player.acc.x = 0;
	}
	/*
	if(keymap['37']){//left
		if(player.dir.left.canMove){
			if(player.x <= cam.xMinDist){
				cam.x+=(player.dir.left.maxMove== -1? player.speed : (player.speed<player.dir.left.maxMove ?  player.speed:player.dir.left.maxMove ));
			}else{
				player.x-=(player.dir.left.maxMove== -1? player.speed : (player.speed<player.dir.left.maxMove ?  player.speed:player.dir.left.maxMove ));
			}
		}	

	}
	if(keymap['39']){//right	
		if(player.dir.right.canMove){
			if(player.x+player.width >= cam.xMaxDist){
				cam.x-=(player.dir.right.maxMove== -1? player.speed : (player.speed<player.dir.right.maxMove ?  player.speed:player.dir.right.maxMove ));
			}else{
				player.x+=(player.dir.right.maxMove== -1? player.speed : (player.speed<player.dir.right.maxMove ?  player.speed:player.dir.right.maxMove ));
			}
		}

	}
	*/
	
	
	player.vel.x += player.acc.x;
	player.x += player.vel.x;
	if(player.vel.x >player.vel.max){player.vel.x = player.vel.max;}
	if(player.vel.x < -1 * player.vel.max){player.vel.x = -1 * player.vel.max;}
	
	debugBox( player.vel.x+" | "+player.acc.x+" | "+player.x,false); 
	
	/*
	debugBox("Top | Bottom | Left | Right",false); 
	debugBox(player.dir.top.maxMove+" | "+player.dir.bottom.maxMove+" | "+player.dir.left.maxMove+" | "+player.dir.right.maxMove,true);
	debugBox(player.dir.top.canMove+" | "+player.dir.bottom.canMove+" | "+player.dir.left.canMove+" | "+player.dir.right.canMove,true);
	debugBox("Cam.X | Cam.Y ",true);
	debugBox(cam.x+" | "+cam.y,true);		
	*/
	
	requestAnimationFrame(this.loop.bind(this));
}
function render(){
	//clear screen
	ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	//draws everything inside the cameras view
	grid.loop(grid.get(cam.eye), cam.eye, function(ent){ 
 		ctx.fillStyle = ent.color; 
		ctx.fillRect( (ent.x+cam.x), (ent.y+cam.y), ent.width, ent.height);
		
		ctx.font = "10px Arial";ctx.fillStyle = "#000000"; 
		ctx.fillText("X{"+(ent.x)+"}--Y{"+(ent.y)+"}"+ent.id , (ent.x+cam.x), (ent.y+cam.y) );		
	});

	//draws player
	//ctx.fillStyle = 'red'; ctx.fillRect(player.x-(24/2), player.y-(24/2), player.width+24, player.height+24);
	ctx.fillStyle = player.color; ctx.fillRect(player.x, player.y, player.width, player.height);

	//draws a ghost box where if the mouse is clicked it will put a new box
	if(debug.add){ 
		ctx.font = "10px Arial";ctx.fillStyle = "#000000"; 
		ctx.fillText("X{"+ (mouse.x-cam.x) +"}--Y{"+ (mouse.y+cam.y) +"}", mouse.x+10, mouse.y-10   );
		ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(mouse.x, mouse.y, document.getElementById('add-width').value, document.getElementById('add-height').value); 
	}
	
	//draws quad tree
	if(debug.quadtree){ quadTree.draw(ctx); }	
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

