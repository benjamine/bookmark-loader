Bookmark-Loader
================

Load a menu of bookmarks on your page using a browser bookmarklet.

Usage
------

- Drag this [bookmarklet](vars=document.createElement('script');s.setAttribute('id','bookmark-loader');s.setAttribute('src','https://rawgithub.com/benjamine/bookmark-loader/master/bookmark-loader.js');s.setAttribute('data-bookmarks','https://rawgithub.com/benjamine/bookmark-loader/master/bookmarks/example.md');document.body.appendChild(s);) to your browser bookmarks toolbar
- Edit the bookmarklet url replacing the .md url with your own bookmarks file (in markdown format)
- Click your bookmarklet on any page!

Note: some sites like github.com block bookmarklets, so you'll just see a warning on the console.

Bookmarks file
---------------

To use your own bookmarks file it has to be available at a domain that supports CORS.
You can host it on github and access it using [github pages](http://pages.github.com/).

The bookmarks file is markdown document containing a list of links.
Each list items can contain text (useful to group links), or an hyperlink.

For an example you can check /bookmarks/example.md on this repository.
