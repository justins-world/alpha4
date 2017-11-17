class player extends entity{
	constructor(attr){
		super(attr);
		this.keydown = false;
		this.yMinDist = 300
	}
	actions(keymap){
 
		if(keymap['37']){
			this.acc.x = -0.5;
			this.lastdir.x = 'left';
			this.keydown = true;
		}else if(keymap['39']){
			this.acc.x = 0.5;
			this.lastdir.x = 'right';
			this.keydown = true;
		}
		if(keymap['38']){
			if(this.coldir.top.canMove){
				this.acc.y = -0.5;
				this.lastdir.y = 'up';
				this.keydown = true;
			}else{
				this.acc.y = 0
				this.vel.y = 0
			}
 		}else if(keymap['40']){
			this.acc.y = 0.5;
			this.lastdir.y = 'down';
			this.keydown = true;
		}
		
		if(!this.keydown){ this.applyFriction(); }	
		
		/*
		if(this.y <= cam.yMinDist){
			this.applyVelocity('y',false);
		}else{
			this.applyVelocity('y',true);
		}*/


		//if(this.pos.y < this.yMinDist-this.height  ){ this.applyVelocity('y','-',false); }
		//if(this.pos.y > 0){ this.applyVelocity('y','+',false); }
		
		
		this.applyVelocity('y',false); 
		this.applyVelocity('x',false);
 		
		this.keydown = false;
	}
}

		/*if(this.coldir.top.canMove){
			if(this.y <= cam.yMinDist){
				cam.y -= this.vel.y;
				this.applyVelocity(true);
				//cam.y+=(this.dir.top.maxMove == -1? this.speed : (this.speed<this.dir.top.maxMove ?  this.speed:this.dir.top.maxMove ));
			}else{
				this.y += this.vel.y;
				this.applyVelocity(false);
				//this.y-=(this.dir.top.maxMove == -1? this.speed : (this.speed<this.dir.top.maxMove ?  this.speed:this.dir.top.maxMove ));
			}
		}*/

 
	/*
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