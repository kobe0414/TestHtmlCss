function LimitDrag(id) {
	Drag.call(this, id);
}

for(var i in Drag.prototype) {
	LimitDrag.prototype[i] = Drag.prototype[i];
}

LimitDrag.prototype.fnMove = function(ev) {
	var oEvent = ev || event;
	var l = oEvent.clientX - this.divX;
	var t = oEvent.clientY - this.divY;
	if(l < 0){
		l = 0;
	}
	else if (l > document.documentElement.clientWidth - this.oDiv.offsetWidth){
		l = document.documentElement.clientWidth - this.oDiv.offsetWidth;
	}
	this.oDiv.style.left = l + 'px';
	this.oDiv.style.top = t  + 'px';
}