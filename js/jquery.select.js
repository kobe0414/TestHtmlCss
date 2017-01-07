;
(function($) {

	var defaults = {
		width: 200,
		height: 100,
		selectAll: true,
		filter: true,
		shijian: function(val) {
			alert(val);
		},
		data: {
			zg: '中国',
			mg: '美国',
			yg: '英国',
			hg: '韩国',
			rb: '日本'
		}
	};
	$.fn.multipleSelect = function(options) {
		//		this.attr('disabled',true);
		
		var t ;
		this.attr('readonly', true);
		var $that = this;
		var opts = $.extend({}, defaults, options);
		var top = this.offset().top;
		var left = this.offset().left;
		var width = this.width();
		var height = this.height();
		var only = 'lyf';
		var inputSelectId = this.attr('id');
		var divId = inputSelectId + only + 'Div';
		var ulId = inputSelectId + only + 'ul';
		var $ul;
		var selectAllId = inputSelectId + only + 'selectAll';
		var selectSearchInputId = inputSelectId + only + 'Search';
		var $selectAllInput;
		var $selectInput;
		var $selectInputChecked;
		var $selectSearch;

		var selectValueShowId = inputSelectId + only + 'valueShow';
		var selectValueShowUlId = inputSelectId + only + 'valueShowUl'
		$('body').append('<div style="overflow: auto;" id="' + selectValueShowId + '"></div>');
		var $selectValue = $('#' + selectValueShowId);
		$selectValue.css('position', 'absolute');
		$selectValue.css('top', top + height + 4 + 'px');
		$selectValue.css('left', left + 'px');
		$selectValue.css('width', opts.width);
		$selectValue.css('height', opts.height);
		$selectValue.css('background', 'green');
		$selectValue.hide();
		$selectValue.append('<ul style="margin: 0;padding: 5px 8px;" id=' + selectValueShowUlId + '></ul>');
		var $selectValueShowUl = $('#' + selectValueShowUlId);

		$('body').append('<div class="mt" id="' + divId + '"></div>');
		var $selectDiv = $('#' + divId);
		$selectDiv.css('position', 'absolute');
		$selectDiv.css('top', top + height + 4 + 'px');
		$selectDiv.css('left', left + 'px');
		$selectDiv.css('width', opts.width);
		$selectDiv.css('height', opts.height);
		$selectDiv.css('background', 'green');
		$selectDiv.hide();
		if(opts.filter) {
			$selectDiv.append('<input id="' + selectSearchInputId + '" style="width:' + (opts.width - 5) + 'px" type="text" />');
			$selectSearch = $('#' + selectSearchInputId);
		}
		$selectDiv.append('<input style="margin-left: 12px;margin-top:5px;" id="' + selectAllId + '" type="checkbox" />全选');
		$selectAllInput = $('#' + selectAllId);
		if(opts.selectAll) {
			$selectAllInput.show();
		} else {
			$selectAllInput.hide();
		}
		$selectDiv.append('<ul style="margin: 0;padding: 5px 8px;" id=' + ulId + '></ul>');
		$ul = $('#' + ulId);
		$.each(opts.data, function(key, value) {
			$ul.append('<li style="list-style-type:none;"><label><input type="checkbox" key=' + key + ' value= ' + value + ' />' + value + '</label></li>');
		});
		$selectInput = $('#' + ulId + ' input');
		$selectInputChecked = $('#' + ulId + " :checked");

		this.click(function(ev) {
			if($selectDiv.is(":hidden")) {
				$('.mt').hide();
				$selectDiv.show(); //如果元素为隐藏,则将它显现
			} else {
				$selectDiv.hide(); //如果元素为显现,则将其隐藏
			}
			return false;
		});
		$selectDiv.click(function(ev) {
			var oEvent = ev || event;
			oEvent.stopPropagation();
		})
		document.onclick = function() {
			//			alert($selectDiv.is(":hidden"));
			$('.mt').hide();

		}
		$selectInput.click(function() {
			setInputVal();
		});

		$that.mouseenter(function() {
			t = setTimeout(function(){
				var v = $that.val().split(',');
				$.each(v, function(key, value) {
					$selectValueShowUl.append('<li style="list-style-type:none;">' + value + '</li>');
				});
				$selectValue.show();
			},1000);
		});

		$that.mouseleave(function() {
			window.clearTimeout(t);
			$selectValueShowUl.empty();
			$selectValue.hide();
		});

		$selectAllInput.click(function() {
			if($(this).attr('checked')) {
				$selectInput.attr('checked', true);
				$that.val('全选');
				setKey();
			} else {
				$selectInput.attr('checked', false);
				$that.val('');
				$that.attr('key', '');
			}
		});

		$selectSearch.keyup(function(event) {
			var content = $.trim($selectSearch.val());
			console.log(content);
			$selectInput.each(function() {
				if($(this).attr('value').indexOf(content) == -1) {
					$(this).parent().hide();
				} else {
					$(this).parent().show();
				}
			});
		});

		function setInputVal() {
			$selectInputChecked = $('#' + ulId + " :checked");
			if($selectInput.length == $selectInputChecked.length) {

				setKey();
				$selectAllInput.attr('checked', true);
				$that.val('全选');
			} else if($selectInputChecked.length == 0) {
				$that.val('');
				$selectAllInput.attr('checked', false);
			} else {
				setKey();
				var v = '';
				$selectInputChecked.each(function() {
					v += $(this).attr('value') + ',';
				});
				v = v.substr(0, v.length - 1);
				$that.val(v);
				$selectAllInput.attr('checked', false);
			}
		}

		function setKey() {
			$selectInputChecked = $('#' + ulId + " :checked");
			var k = '';
			$selectInputChecked.each(function() {
				k += $(this).attr('key') + ',';
			});
			k = k.substr(0, k.length - 1);
			$that.attr('key', k);
		}
	};

	$.fn.multipleSelectSetData = function(dataOption) {
		var ulId = this.attr('id') + 'ul';
		$('#' + ulId).empty();
		$.each(dataOption, function(key, value) {
			$('#' + ulId).append('<li style="list-style-type:none;"><label><input type="checkbox" key=' + key + ' value= ' + value + ' />' + value + '</label></li>');
		});
	}

})(jQuery);