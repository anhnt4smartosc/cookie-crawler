
var finalLinks = [];

function getAllLinks(url, sum) {
    var page = require('webpage').create();
    page.open(url, function(status) {
        links = page.evaluate(function() {
            return [].map.call(document.querySelectorAll('a'), function(link) {
                return link.getAttribute('href');
            });
        });

        links = links.filter(function(e) {
            var link = new String(e);
            return link.indexOf(url) !== -1;
        });
        sum.push(links);
    });

    return sum;
}

getAllLinks('http://eziland.vn/', finalLinks);
console.log("Final Links", finalLinks);
