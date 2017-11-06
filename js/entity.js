class entity{
	constructor(attr = {x:0, y:0, width:0, height:0, color: "red", id:0} ){
		this.id = attr.id;
		this.x = attr.x;
		this.y = attr.y;
		this.width = attr.width;
		this.height = attr.height;
		this.buffer = 12;//space around the object for collision
		this.color = attr.color;
		this.dir={
			top:{
				canMove:true, maxMove:-1
			},	
			bottom:{
				canMove:true, maxMove:-1		
			}, 
			left:{
				canMove:true, maxMove:-1				
			}, 
			right:{
				canMove:true, maxMove:-1	
			}
		}
	}
	resetDir(){
		this.dir={
			top:{
				canMove:true, maxMove:-1
			},	
			bottom:{
				canMove:true, maxMove:-1		
			}, 
			left:{
				canMove:true, maxMove:-1				
			}, 
			right:{
				canMove:true, maxMove:-1	
			}
		}
	}
    col(b, cam){
		/*Continuous Collision Detection*/
		//TODO: ADD CAM TO X
		if (this.x < b.x + b.width+cam.x  &&
			this.x + this.width > b.x+cam.x  &&
			this.y < b.y + b.height+cam.y &&
			this.y + this.height > b.y+cam.y) {
			
			if(this.x-b.x < 0){
				this.dir.right.canMove = false;
			}else{
				this.dir.left.canMove = false;
			}
			if(this.y-b.y-cam.y < 0){
				this.dir.bottom.canMove = false;
			}else{
				this.dir.top.canMove = false;
			}			
		} 
		if (this.x - this.buffer < b.x + b.width+cam.x  &&
			this.x + this.buffer + this.width > b.x+cam.x  &&
			this.y - this.buffer < b.y + b.height+cam.y &&
			this.y + this.buffer + this.height > b.y+cam.y){
			
			if(this.x - b.x-cam.x < 0){
				this.dir.right.maxMove = Math.ceil(b.x+cam.x-(this.x+this.width));
			}else{
				this.dir.left.maxMove =  Math.ceil(this.x-(b.x+cam.x+b.width));  
			}
			if(this.y - b.y-cam.y < 0){
				this.dir.bottom.maxMove = Math.ceil(b.y+cam.y-(this.y+this.height));	
			}else{
				this.dir.top.maxMove = Math.ceil(this.y-(b.y+b.height+cam.y));		
			}
		}
	}	
}