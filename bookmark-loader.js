(function(url) {
	var tiny_ajax = function(m,u,c,d){with(new(this.XMLHttpRequest||ActiveXObject)("Microsoft.XMLHTTP"))onreadystatechange=function(){readyState^4||c(this)},open(m,u),send(d)};
	var match;
	tiny_ajax('GET', url, function(req) {
		var markdown = req.responseText;
		markdown = markdown.split('\n');
		var links = [];
		var currentList = links;
		currentList.indent = 0;
		var html = [];
		html.push('<a class="remove" href="javascript:document.getElementById(\'injected-bookmarks\').parentNode.removeChild(document.getElementById(\'injected-bookmarks\'));">close</a>');
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
		var previousContainer = document.getElementById('injected-bookmarks');
		if (previousContainer) {
			previousContainer.parentNode.removeChild(previousContainer);
		}
		document.body.appendChild(container);
	});
	tiny_ajax('GET', url.slice(0,-2) + 'css', function(req) {
		var container = document.createElement('style');
		container.innerHTML = req.responseText;
		var previousContainer = document.getElementById('injected-bookmarks-style');
		if (previousContainer) {
			previousContainer.parentNode.removeChild(previousContainer);
		}
		document.body.appendChild(container);
	});
})