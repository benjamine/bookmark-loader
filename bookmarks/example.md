# Bookmarks

- [search engines](javascript:bookmarkLoader.load('~/searchengines.md');) this will open a sub-menu
- dev tools
    - [Is this WebForms?](javascript:alert(document.getElementById('aspnetForm') ? 'ew! this is WebForms':'apparently not');)
    - [reload styles](javascript:void(function(){var i,a,s;a=document.getElementsByTagName('link');for(i=0;i<a.length;i++){s=a[i];if(s.rel.toLowerCase().indexOf('stylesheet')>=0&&s.href) {var h=s.href.replace(/(&|%5C?)forceReload=\d+/,'');s.href=h+(h.indexOf('?')>=0?'&':'?')+'forceReload='+(new Date().valueOf())}}})();) reload all css files in this page
    - [bookmark-loader](https://github.com/benjamine/bookmark-loader)
    - [Dom Moster!](javascript:(function(){var script=document.createElement('script');script.src='http://mir.aculo.us/dom-monster/dommonster.js?'+Math.floor((+new Date)/(864e5));document.body.appendChild(script);})()) releases the DOM Monster on this page
    - [reload styles](javascript:void(function(){var i,a,s;a=document.getElementsByTagName('link');for(i=0;i<a.length;i++){s=a[i];if(s.rel.toLowerCase().indexOf('stylesheet')>=0&&s.href) {var h=s.href.replace(/(&|%5C?)forceReload=\d+/,'');s.href=h+(h.indexOf('?')>=0?'&':'?')+'forceReload='+(new Date().valueOf())}}})();) reload all css files in this page
    - [show me all passwords](javascript:bookmarkLoader.load('~/scripts/showmeallpasswords.js');) will show the value of all password fields on this page
