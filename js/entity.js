class entity{
	constructor(attr = {x:0, y:0, width:0, height:0, color: "red", id:0} ){
		this.id = attr.id;
		this.pos = {x:attr.x, y:attr.y}
 
		this.width = attr.width;
		this.height = attr.height;
		this.buffer = 12;//space around the object for collision
		this.color = attr.color;
		this.lastdir = {x:null,y:null};
 
		this.acc = {x:0, y:0}
		this.vel = {max:6, x:0, y:0}
 
		this.friction = 0.6;
 		
		this.coldir={
			top:{canMove:true, maxMove:-1},	
			bottom:{canMove:true, maxMove:-1}, 
			left:{canMove:true, maxMove:-1}, 
			right:{canMove:true, maxMove:-1}
		}
	}
	resetDir(){
		this.coldir={
			top:{canMove:true, maxMove:-1},	
			bottom:{canMove:true, maxMove:-1}, 
			left:{canMove:true, maxMove:-1}, 
			right:{canMove:true, maxMove:-1}
		}
	}
	applyVelocity(dir,  toCam = false){
		this.vel[dir] += this.acc[dir];
		//this is where it applies velocity to the direction
		//this.pos[dir] += this.vel[dir];
		
		if(dir=="x" && this.vel[dir] < 0){
			if(this.coldir.left.maxMove > -1 && this.coldir.left.maxMove<this.vel[dir]){
				this.pos[dir] += this.coldir.left.maxMove;	
			}else{
				this.pos[dir] += this.vel[dir];	
			}
		}else{
			if(this.coldir.right.maxMove > -1 && this.coldir.right.maxMove<this.vel[dir]){
				this.pos[dir] += this.coldir.right.maxMove;	
			}else{
				this.pos[dir] += this.vel[dir];	
			}
		}
		
		if(dir=="y" && this.vel[dir] < 0 ){
			
			if(this.coldir.top.maxMove > -1){
				
				if( (-1*this.coldir.top.maxMove)<this.vel[dir]){
					this.pos[dir] -= this.coldir.top.maxMove;
				}else{
					this.pos[dir] += this.vel[dir];	
					console.log('plain velocity1');	
				}
					
			}else{
				this.pos[dir] += this.vel[dir];	
				console.log('plain velocity2');
			}
 
		}else{
			if(this.coldir.bottom.maxMove > -1 && this.coldir.bottom.maxMove<this.vel[dir]){
				this.pos[dir] += this.coldir.bottom.maxMove;	
			}else{
				this.pos[dir] += this.vel[dir];	
			}
		}		
 
 
		//caps velocity
		if(this.vel[dir] > this.vel['max']){this.vel[dir] = this.vel['max'];}
		if(this.vel[dir] < -1 * this.vel['max']){this.vel[dir] = -1 * this.vel['max'];}		
	}
	applyFriction(){ 
		if(this.lastdir.x == 'left'){ this.acc.x = 0;		
			if(this.vel.x > 0){this.vel.x = 0;}
			if(this.vel.x < 0){
				this.vel.x += this.friction
			}
		}
		if(this.lastdir.x == 'right'){this.acc.x = 0;	
			if(this.vel.x < 0){this.vel.x = 0;}
			if(this.vel.x > 0){
				this.vel.x -= this.friction
			}			
		}  
		if(this.lastdir.y == 'up'){this.acc.y = 0;	
 			if(this.vel.y > 0){this.vel.y = 0;}
			if(this.vel.y < 0){
				this.vel.y += this.friction
			}
		}
		if(this.lastdir.y == 'down'){this.acc.y = 0;	
			if(this.vel.y < 0){this.vel.y = 0;}
			if(this.vel.y > 0){
				this.vel.y -= this.friction
			}			
		}
	}	
    col(b, cam){
 
		/*Continuous Collision Detection*/
		//TODO: ADD CAM TO X
 		if (this.pos['x'] < b.pos['x'] + b.width+cam.x  &&
			this.pos['x'] + this.width > b.pos['x']+cam.x  &&
			this.pos['y'] < b.pos['y'] + b.height+cam.y &&
			this.pos['y'] + this.height > b.pos['y']+cam.y) {
			
			if(this.pos['x']-b.pos['x'] < 0){
				this.coldir.right.canMove = false;
			}else{
				this.coldir.left.canMove = false;
			}
			
			if(this.pos['y']-b.pos['y']-cam.y < 0){
				this.coldir.bottom.canMove = false;
			}else{
				this.coldir.top.canMove = false;
			}			
		} 
		
		if (this.pos['x'] - this.buffer < b.pos['x'] + b.width+cam.x  &&
			this.pos['x'] + this.buffer + this.width > b.pos['x']+cam.x  &&
			this.pos['y'] - this.buffer < b.pos['y'] + b.height+cam.y &&
			this.pos['y'] + this.buffer + this.height > b.pos['y']+cam.y){
			
			if(this.pos['x'] - b.pos['x']-cam.x < 0){ 
				this.coldir.right.maxMove = Math.ceil(b.pos['x']+cam.x-(this.pos['x']+this.width));
			}else{ 
				this.coldir.left.maxMove =  Math.ceil(this.pos['x']-(b.pos['x']+cam.x+b.width));  
			}
			if(this.pos['y'] - b.pos['y']-cam.y < 0){ 
				this.coldir.bottom.maxMove = Math.ceil(b.pos['y']+cam.y-(this.pos['y']+this.height));	
			}else{ 
				this.coldir.top.maxMove = Math.ceil(this.pos['y']-(b.pos['y']+b.height+cam.y));		
			}
		}
	}	
}