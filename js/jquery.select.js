;
(function($) {

	var val = {
		zg: '中国',
		mg: '美国',
		yg: '英国',
		hg: '韩国'
	}

	var defaults = {
		width: 100,
		height: 200,
		selectAll:true,
		filter:true,
		shijian: function(val){
			alert(val);
		}
	};
	$.fn.multipleSelect = function(options) {
		var $that = this;
		var opts = $.extend({}, defaults, options);
		var top = this.offset().top;
		var left = this.offset().left;
		var width = this.width();
		var height = this.height();
		var id = this.attr('id') + 'select';

		$('body').append('<div id="' + id + '"></div>');
		var $sel = $('#' + id);
		$sel.css('position', 'absolute');
		$sel.css('top', top + height + 4 + 'px');
		$sel.css('left', left + 'px');
		$sel.css('width', opts.width);
		$sel.css('height', opts.height);
		$sel.css('background', 'green');
		$sel.hide();
		if(opts.filter){
			$sel.append('<input style="width:'+ (opts.width - 5) +'px" type="text" />');
		}
		if(opts.selectAll){
			$sel.append('<input style="margin-left: 12px;margin-top:5px;" id="'+this.attr('id') +'SelectAll" type="checkbox" />全选');
		}
		
		var ulId = this.attr('id') + 'ul';
		var ul = '<ul style="margin: 0;padding: 5px 8px;" id=' + ulId + '></ul>';
		$sel.append(ul);
		$.each(val, function(key, value) {
			$('#' + ulId).append('<li style="list-style-type:none;"><label><input type="checkbox" key=' + key + ' value= '+ value +' />' + value + '</label></li>');
		});
		this.click(function(ev) {
			if($sel.is(":hidden")) {
				$sel.show(); //如果元素为隐藏,则将它显现
			} else {
				$sel.hide(); //如果元素为显现,则将其隐藏
			}
			return false;
		});
		$sel.click(function(ev){
			var oEvent = ev || event;
			oEvent.stopPropagation();
		})
		document.onclick = function(){
			$sel.hide();
		}
		$('#' + ulId + ' input').click(function(){
			$(this).parent().hide();
			//alert($(this).attr('value'));
//			opts.shijian($(this).attr('value'));
			$that.attr('value',$(this).attr('value'))
		});
	};
	
	$.fn.multipleSelectSetData = function(dataOption){
		var ulId = this.attr('id') + 'ul';
		$('#' + ulId).empty();
		$.each(dataOption, function(key, value) {
			$('#' + ulId).append('<li style="list-style-type:none;"><label><input type="checkbox" key=' + key + ' value= '+ value +' />' + value + '</label></li>');
		});
	}
	

})(jQuery);