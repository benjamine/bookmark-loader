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

		var style = document.createElement('style');
		style.innerHTML = "\
		.injected-bookmarks {\
			font: normal 18px arial, sans-serif;\
			color: #888;\
			background: #ff9;\
			border: none;\
			position: fixed;\
			top: 0;\
			left: 0;\
			z-index: 9999999999;\
			padding: 20px;\
			max-height: 90%;\
			overflow: auto;\
		}\
		.injected-bookmarks a {\
			text-decoration: none;\
			background: transparent;\
			color: black;\
			border: none;\
		}\
		.injected-bookmarks a:hover {\
			text-decoration: underline;\
			color: #00F;\
		}\
		.injected-bookmarks a.remove {\
			font-size: 12px;\
			float: right;\
		}\
		.injected-bookmarks ul {\
			margin: 0 0 0 15px;\
			padding: 0 0 0 20px;\
			border: none;\
		}\
		.injected-bookmarks li {\
			margin: 0;\
			padding: 8px 0 0 0;\
			border: none;\
		}\
		";

		var previousContainer = document.getElementById('injected-bookmarks');
		if (previousContainer) {
			previousContainer.parentNode.removeChild(previousContainer);
		}

		container.appendChild(style);
		document.body.appendChild(container);
	});
})