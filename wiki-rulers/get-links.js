/*
 * get_links.js

    MediaWiki API Demos
    Demo of `Links` module: Get all links on the given page(s)

    MIT License
*/

var url = "https://en.wikipedia.org/w/api.php"; 
const fetch = require('node-fetch');


var params = {
	    action: "query",
	    format: "json",
	    titles: "Albert Einstein",
	    prop: "links"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
	            var pages = response.query.pages;
	            for (var p in pages) {
			                for (var l of pages[p].links) {
						                console.log(l);
						            }
			            }
	        })
    .catch(function(error){console.log(error);});
