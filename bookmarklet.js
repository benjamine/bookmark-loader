window.__tiny_ajax = function(m,u,c,d){with(new(this.XMLHttpRequest||ActiveXObject)("Microsoft.XMLHTTP"))onreadystatechange=function(){readyState^4||c(this)},open(m,u),send(d)};
window.__tiny_ajax('GET','https://rawgithub.com/benjamine/bookmark-loader/master/bookmark-loader.js',function(req){
	eval(req.responseText)('https://rawgithub.com/benjamine/bookmark-loader/master/bookmarks/example.md');
};