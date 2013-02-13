(function() {
	var tiny_ajax = function(m,u,c,d){with(new(this.XMLHttpRequest||ActiveXObject)("Microsoft.XMLHTTP"))onreadystatechange=function(){readyState^4||c(this)},open(m,u),send(d)};
	var match;
	var script = document.getElementById('bookmark-loader');
	var url = script.getAttribute('data-bookmarks');
	window.__removeById = function(){
		for (var i = 0; i < arguments.length; i++) {
			var elem = document.getElementById(arguments[i]);
			if (elem) {
				elem.parentNode.removeChild(elem);
			}
		}
	};
	tiny_ajax('GET', url, function(req) {
		var markdown = req.responseText;
		markdown = markdown.split('\n');
		var links = [];
		var currentList = links;
		currentList.indent = 0;
		var html = [];
		html.push('<a class="remove" href="javascript:window.__removeById(\'injected-bookmarks\',\'bookmark-loader\');">close</a>');
		for (var i=0; i<markdown.length; i++) {
			var line = markdown[i];
			if (match = /^(\s*)\-\s*(.+)\s*$/.exec(line)) {
				var indent = match[1].length;
				var itemText = match[2];
				var levelChange = 0;

				if (indent > currentList.indent) {
					var subList = [];
					subList.parent = currentList;
					subList.indent = indent;
					currentList.push(subList);
					currentList = subList;
					levelChange = 1;
				} else {
					while (indent < currentList.indent) {
						currentList = currentList.parent;
						levelChange--;
					}
				}

				if (levelChange > 0) 
				{
					html.push('<ul><li>');
				}
				else {
					if (levelChange < 0) {
						html.push(new Array(1 - levelChange).join('</li></ul>'));
					}
					html.push('</li><li>');
				}
				if (match = /\[(.+)\]\((.+)\)/.exec(itemText)) {
					currentList.push({
						title: match[1],
						url: match[2]
					});
					html.push('<a href="', match[2], '">', match[1], '</a>');
				} else {
					currentList.push({
						title: itemText
					});
					html.push(itemText);
				}
			}
		}
		html.push('</ul>');
		var container = document.createElement('div');
		container.setAttribute('class', 'injected-bookmarks');
		container.setAttribute('id', 'injected-bookmarks');
		container.innerHTML = html.join('');
		window.__removeById('injected-bookmarks');
		document.body.appendChild(container);
		setTimeout(function() {
			window.__removeById('bookmark-loader');
		},1);
	});

	window.__removeById('injected-bookmarks-style');
    var head = document.getElementsByTagName("head")[0] || document.documentElement;
	var style = document.createElement('link');
	style.setAttribute('href', 'http://benjamine.github.com/bookmark-loader/bookmark-loader.css');
	style.setAttribute('rel', 'stylesheet');
	style.setAttribute('id', 'injected-bookmarks-style');
	head.appendChild(style);

})();