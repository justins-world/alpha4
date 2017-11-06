class gridObj{
	constructor(width, height){
		this.container = [];
		this.gridSize  = 20;
		for(var x = 0; x <= width; x++){
			if(this.container[x] == undefined){ this.container[x] = []; }
			for(var y = 0; y <= height; y++){
				if(this.container[x][y] == undefined){ this.container[x][y] = []; }
			}
		}
	}
	insert(ent){
		var x = Math.ceil(ent.x/this.gridSize);
		var y = Math.ceil(ent.y/this.gridSize);
		
		if( this.container[x] == undefined){ this.container[x]=[]; } 
		if( this.container[x][y] == undefined){ this.container[x][y]=[]; }
		
		this.container[x][y].push(ent);
		
		return ent.id = x+"-"+y+"-"+(this.container[x][y].length - 1);
	}
	get(cords={startWidth:0, endWidth:0, startHeight:0, endHeight:0}){
		var data = [];
		cords.endWidth = cords.endWidth < this.container.length ? cords.endWidth : this.container.length;
		for(var x = cords.startWidth; x < cords.endWidth; x++){
			if(data[x] == undefined){ data[x] = []; }
			cords.endHeight = cords.endHeight < this.container[x].length ? cords.endHeight : this.container[x].length;
			
			for(var y = cords.startHeight; y < cords.endHeight; y++){
				if(data[x][y] == undefined){ data[x][y] = []; }
				data[x][y] = this.container[x][y]!=undefined ? this.container[x][y]:[];
			}
		}
		return data;
	}
	loop(entList,cords={startWidth:0, endWidth:0, startHeight:0, endHeight:0}, callback){
		entList.forEach(function(elx,x) {
			entList[x].forEach(function(ely, y) {
				entList[x][y].forEach(function(elxy, xy) {
					callback(entList[x][y][xy]);
				});
			});
		});		
	}
}