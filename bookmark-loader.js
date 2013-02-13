(function() {

    var head = document.getElementsByTagName("head")[0] || document.documentElement;

    var tiny_ajax = function(m,u,c,d){with(new(this.XMLHttpRequest||ActiveXObject)("Microsoft.XMLHTTP"))onreadystatechange=function(){readyState^4||c(this)},open(m,u),send(d)};
    var bookmarkLoader = window.bookmarkLoader = {};
    bookmarkLoader.tiny_ajax = tiny_ajax;

    bookmarkLoader.removeElementsById = function(){
        for (var i = 0; i < arguments.length; i++) {
            var elem = document.getElementById(arguments[i]);
            if (elem) {
                elem.parentNode.removeChild(elem);
            }
        }
    };

    bookmarkLoader.close = function() {
        bookmarkLoader.removeElementsById('bookmark-loader-menu','bookmark-loader');
    };

    bookmarkLoader.load = function(url) {
        var match;

        var targetUrl = url;
        if (targetUrl.slice(0,2) === '~/') {
            var currentUrl = bookmarkLoader.currentUrl || document.location.href;
            var path = /^(.*)\/[^/]+\.md$/i.exec(currentUrl)[1];
            targetUrl =  path + '/' + targetUrl.slice(2);
        }

        if (targetUrl.slice(-3).toLowerCase() === '.js') {
            // add script to document
            var script = document.createElement('script');
            script.setAttribute('class', 'bookmark-loader-injected');
            script.setAttribute('src', targetUrl);
            document.body.appendChild(script);
            return script;
        }

        if (targetUrl.slice(-4).toLowerCase() === '.css') {
            // add stylesheet to document
            var style = document.createElement('link');
            style.setAttribute('class', 'bookmark-loader-injected');
            style.setAttribute('href', targetUrl);
            style.setAttribute('rel', 'stylesheet');
            head.appendChild(style);
            return style;
        }

        tiny_ajax('GET', targetUrl, function(req) {
            var markdown = req.responseText;
            markdown = markdown.split('\n');
            var links = [];
            var currentList = links;
            currentList.indent = 0;
            var html = [];
            html.push('<a class="remove" href="javascript:bookmarkLoader.close();">close</a>');
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
                    if (match = /^\s*\[(.+)\]\((.+)\)\s*(\S.*\S)?\s*$/.exec(itemText)) {
                        currentList.push({
                            title: match[1],
                            url: match[2],
                            description: match[3]
                        });
                        html.push('<a title="', match[3] || match[1], '" href="', match[2], '">', match[1], '</a>');
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
            container.setAttribute('class', 'bookmark-loader-menu');
            container.setAttribute('id', 'bookmark-loader-menu');
            container.innerHTML = html.join('');
            bookmarkLoader.removeElementsById('bookmark-loader-menu');
            document.body.appendChild(container);
            setTimeout(function() {
                bookmarkLoader.removeElementsById('bookmark-loader');
            },1);
            bookmarkLoader.currentLinks = links;
            bookmarkLoader.currentUrl = targetUrl;
        });
    };

    bookmarkLoader.load(document.getElementById('bookmark-loader').getAttribute('data-bookmarks'));

    bookmarkLoader.load('http://benjamine.github.com/bookmark-loader/bookmark-loader.css')
        .setAttribute('id', 'bookmarks-loader-style');

})();