$(function() {
//	var result = f1();
//	var a = result();
//	alert(a);
	d2();
})

function d2(){
	var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
		   alert('name1 = ' + name);
　　　　　　return function(){
	alert('name2 = ' + name);
	var v = this;
　　　　　　　　return this.name;
　　　　　　};
　　　　}
　　};

	var v = object.getNameFunc();
　　alert('result = ' + object.getNameFunc()());
}

function d(){
	var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　var that = this;
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());
}

function f1() {　　　　
	var n = 999;　　　　
	function f2() {　　　　　　
//		alert(n);　　　　
		return n;
	}　　　　
	return f2;　
}