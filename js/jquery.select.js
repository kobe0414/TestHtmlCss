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

		}
	};
	var only = 'lyf';
	$.fn.multipleSelect = function(options) {
		this.attr('readonly', true);
		mutipleSelectInit(this, options);
	};

	$.fn.multipleSelectSetData = function(dataOption) {
		$that = this;
		$that.attr('isFullChoose',false);
		$that.val('');
		var inputSelectId = this.attr('id');
		var ulId = inputSelectId + only + 'ul';
		$('#' + ulId).empty();
		$.each(dataOption, function(key, value) {
			$('#' + ulId).append('<li style="list-style-type:none;"><label><input type="checkbox" key=' + key + ' value= ' + value + ' />' + value + '</label></li>');
		});
		var $selectInput = $('#' + ulId + ' input');
		var selectAllId = inputSelectId + only + 'selectAll';
		var $selectAllInput = $('#' + selectAllId);
		$selectAllInput.attr('checked',false);
		var $selectInputChecked;
		$selectInput.click(function() {
			$selectInputChecked = $('#' + ulId + " :checked");
			setInputVal($selectInput, $selectInputChecked, $that, $selectAllInput);
		});

		$selectAllInput.click(function() {
			$selectInputChecked = $('#' + ulId + " :checked");
			clickSelectAll($(this), $selectInput, $that, $selectInputChecked);
		});
		var selectSearchInputId = inputSelectId + only + 'Search';
		var $selectSearch = $('#' + selectSearchInputId);
		$selectSearch.val('');
		$selectSearch.keyup(function(event) {
			keyupSelectSearch($selectInput,$(this));
		});
	}

	function mutipleSelectInit($sel, options) {
		var t;
		var $that = $sel;
		var opts = $.extend({}, defaults, options);
		var top = $that.offset().top;
		var left = $that.offset().left;
		var width = $that.width();
		var height = $that.height();
		//input id
		var inputSelectId = $that.attr('id');
		//复选框div ID
		var divId = inputSelectId + only + 'Div';
		//checkboks 所在 ui 的id
		var ulId = inputSelectId + only + 'ul';
		var $ul;
		//全选复选框 id
		var selectAllId = inputSelectId + only + 'selectAll';
		//搜索框id
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
		$selectValue.css('top', top + height + 6 + 'px');
		$selectValue.css('left', left + 'px');
		$selectValue.css('width', opts.width);
		$selectValue.css('height', opts.height);
		$selectValue.css('background', 'white');
		$selectValue.css('border','1px solid #5B5B5B');
		$selectValue.hide();
		$selectValue.append('<ul style="margin: 0;padding: 5px 8px;" id=' + selectValueShowUlId + '></ul>');
		var $selectValueShowUl = $('#' + selectValueShowUlId);

		$('body').append('<div class="selectDiv" id="' + divId + '"></div>');
		var $selectDiv = $('#' + divId);
		$selectDiv.css('position', 'absolute');
		$selectDiv.css('top', top + height + 6 + 'px');
		$selectDiv.css('left', left + 'px');
		$selectDiv.css('width', opts.width);
		$selectDiv.css('height', opts.height);
		$selectDiv.css('background', 'white');
		$selectDiv.css('border','1px solid #5B5B5B');
		
		
		
		$selectDiv.hide();

		$that.click(function(ev) {
			if($selectDiv.is(":hidden")) {
				$('.selectDiv').hide();
				$selectDiv.show();
			} else {
				$selectDiv.hide();
			}
			return false;
		});
		$selectDiv.click(function(ev) {
			var oEvent = ev || event;
			oEvent.stopPropagation();
		});
		document.onclick = function() {
			$('.selectDiv').hide();
		}

		$that.mouseenter(function() {
			if(!$selectAllInput.attr('checked') && $that.val() != '') {
				t = setTimeout(function() {
					var v = $that.val().split(',');
					$.each(v, function(key, value) {
						$selectValueShowUl.append('<li style="list-style-type:none;">' + value + '</li>');
					});
					$selectValue.show();
				}, 1000);
			}

		});

		$that.mouseleave(function() {
			window.clearTimeout(t);
			$selectValueShowUl.empty();
			$selectValue.hide();
		});

		$selectDiv.append('<input id="' + selectSearchInputId + '" class="searchInput" type="text" />');
		$selectSearch = $('#' + selectSearchInputId);
		$selectSearch.css('width', opts.width - 15 + 'px');
		if(opts.filter) {
			$selectSearch.keyup(function(event) {
				keyupSelectSearch($selectInput,$(this));
			});
			$selectSearch.show();
		} else {
			$selectSearch.hide();
		}

		$selectDiv.append('<label style="margin-left: 8px;margin-top:5px;"><input id="' + selectAllId + '" type="checkbox" />全选</label>');
		$selectAllInput = $('#' + selectAllId);
		$that.attr('isFullChoose',false);
		if(opts.selectAll) {
			$selectAllInput.show();
		} else {
			$selectAllInput.hide();
		}

		$selectAllInput.click(function() {
			$selectInputChecked = $('#' + ulId + " :checked");
			clickSelectAll($(this), $selectInput, $that, $selectInputChecked);
		});

		$selectDiv.append('<ul style="margin: 0;padding: 5px 8px;" id=' + ulId + '></ul>');
		$ul = $('#' + ulId);

		$.each(opts.data, function(key, value) {
			$ul.append('<li style="list-style-type:none;"><label><input type="checkbox" key=' + key + ' value= ' + value + ' />' + value + '</label></li>');
		});

		$selectInput = $('#' + ulId + ' input');
		$selectInput.click(function() {
			$selectInputChecked = $('#' + ulId + " :checked");
			setInputVal($selectInput, $selectInputChecked, $that, $selectAllInput);
		});

	}

	function setInputVal($selectInput, $selectInputChecked, $that, $selectAllInput) {

		if($selectInput.length == $selectInputChecked.length) {
			setKey($selectInputChecked, $that);
			$selectAllInput.attr('checked', true);
			$that.attr('isFullChoose',true);
			$that.val('全选');
		} else if($selectInputChecked.length == 0) {
			$that.val('');
			$selectAllInput.attr('checked', false);
			$that.attr('isFullChoose',false);
		} else {
			setKey($selectInputChecked, $that);
			var v = '';
			$selectInputChecked.each(function() {
				v += $(this).attr('value') + ',';
			});
			v = v.substr(0, v.length - 1);
			$that.val(v);
			$selectAllInput.attr('checked', false);
			$that.attr('isFullChoose',false);
		}
	}


	function clickSelectAll($selectAllInput, $selectInput, $that) {
		if($selectAllInput.attr('checked')) {
			$selectInput.attr('checked', true);
			$that.val('全选');
			$that.attr('isFullChoose',true);
			setKey($selectInput, $that);
		} else {
			$selectInput.attr('checked', false);
			$that.val('');
			$that.attr('key', '');
			$that.attr('isFullChoose',false);
		}
	}

	function keyupSelectSearch($selectInput,$selectSearch) {
		var content = $.trim($selectSearch.val());
		$selectInput.each(function() {
			if($(this).attr('value').indexOf(content) == -1) {
				$(this).parent().hide();
			} else {
				$(this).parent().show();
			}
		});
	}
	
	function setKey($selectInputChecked, $that) {
		var k = '';
		$selectInputChecked.each(function() {
			k += $(this).attr('key') + ',';
		});
		k = k.substr(0, k.length - 1);
		$that.attr('key', k);
	}

})(jQuery);