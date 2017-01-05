;(function ($){
	jQuery.globalFuntion = function (){
		//..
	};
	
	jQuery.extend({
		functionOne : function (){
		    //..	
		},
		functionTwo : function (param){
			//..
		}
	});
	
	//为全局函数创建命名空间
	jQuery.myPlugin = {
		functionOne : function (){
		    //..	
		},
		functionTwo : function (param){
			//..
		}
	}
	
	//调用 $.myPlugin.functionOne()
	
	jQuery.fn.myMethod = function (){
		
	}
	
	//..........................................
	$.fn.shadow = function (options){
		var opts = $.extend({}, defauts, options);
		return this.each(function (){
			
		});
	}
	$.fn.shadow.defauts = {
		aaa : 'a1',
		bbb : 'b1'
	}
	
})(jQuery);