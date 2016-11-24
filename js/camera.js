class cameraObj{
	constructor(){
		this.x = 0;
		this.y = 0;
		this.xMinDist = 0;
		this.yMinDist = 0;		
		this.xMaxDist = 500;
		this.yMaxDist = 300;		
		this.eye = {};
	}
	updateEye(){
		this.eye = {
		 startWidth: this.eyeSight(this.x)
		,endWidth:this.eyeSight(this.x+(this.xMaxDist*-1))
		,startHeight:this.eyeSight(this.y)
		,endHeight:this.eyeSight(this.y+(this.yMaxDist*-1))
		}
	}
	eyeSight(point){
		return (Math.ceil( (point*-1) / 20) <= 0 ? 0 : Math.ceil( (point*-1) / 20) );
	}
 
}