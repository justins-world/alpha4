class entity{
	constructor(attr = {x:0, y:0, width:0, height:0, color: "red", id:0} ){
		this.id = attr.id;
		this.x = attr.x;
		this.y = attr.y;
		this.width = attr.width;
		this.height = attr.height;
		this.color = attr.color;
		this.dir={
			top:{
				canMove:true,
				maxMove:-1
			},	
			bottom:{
				canMove:true,
				maxMove:-1		
			}, 
			left:{
				canMove:true,
				maxMove:-1				
			}, 
			right:{
				canMove:true,
				maxMove:-1	
			}
		}
	}
	resetDir(){
		this.dir={
			top:{
				canMove:true,
				maxMove:-1
			},	
			bottom:{
				canMove:true,
				maxMove:-1		
			}, 
			left:{
				canMove:true,
				maxMove:-1				
			}, 
			right:{
				canMove:true,
				maxMove:-1	
			}
		}
	}
}