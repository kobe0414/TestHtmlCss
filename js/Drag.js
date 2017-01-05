function Drag(id) {
				var _this = this;
				var divX = 0;
		        var divY = 0;
				this.oDiv = document.getElementById(id);
				this.oDiv.onmousedown = function (ev){
					_this.fnDown(ev);
					return false;
				};
			}

			Drag.prototype.fnDown = function (ev) {
				var _this = this;
				var oEvent = ev || event;
				this.divX = oEvent.clientX - this.oDiv.offsetLeft;
				this.divY = oEvent.clientY - this.oDiv.offsetTop;
				document.onmousemove = function (ev){
					_this.fnMove();
				};

				document.onmouseup = function (){
					_this.fnUp();
				};
			}

			Drag.prototype.fnMove = function (ev) {
				var oEvent = ev || event;
				this.oDiv.style.left = oEvent.clientX - this.divX + 'px';
				this.oDiv.style.top = oEvent.clientY - this.divY + 'px';
			}

			Drag.prototype.fnUp = function () {
				document.onmousemove = null;
				document.onmouseup = null;
			}