const request = require('request');
const cheerio = require('cheerio');

const domain = 'http://eziland.vn';
const allLinks = [];

const get_page_links = (url, links) => {
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(html);

            $('a').each( (i, e) => {
                let href = $(e).attr('href');
                if(typeof href != 'undefined' && href.startsWith(domain) && links.indexOf(href) == -1) {
                    //Link ngoài
                    console.log(href);
                    links.push(href);
                    get_page_links(href, links);
                }
            });

        }
    });

    return [];
}

const promise = new Promise( (resolve, reject) => {
    x = get_page_links("http://eziland.vn", allLinks);

    if(allLinks.length) {
        resolve(allLinks);
    }
});

promise.then(allLinks => {
    console.log("Resolved", allLinks);
}).catch(err => {
    console.log(err);
});