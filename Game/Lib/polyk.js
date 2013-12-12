var PolyK = {};
	
PolyK.ContainsPoint = function(p, px, py){
	var n = p.length>>1;
	var ax, ay, bx = p[2*n-2]-px, by = p[2*n-1]-py;
	var depth = 0;
	for(var i=0; i<n; i++){
		ax = bx;  ay = by;
		bx = p[2*i  ] - px;
		by = p[2*i+1] - py;
		if(ay< 0 && by< 0) continue;	// both "up" or both "donw"
		if(ay>=0 && by>=0) continue;	// both "up" or both "donw"
		if(ax< 0 && bx< 0) continue; 
			
		var lx = ax + (bx-ax)*(-ay)/(by-ay);
		if(lx>0) depth++;
	}
	return (depth & 1) == 1;
}
