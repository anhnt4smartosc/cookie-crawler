const request = require('request');
const cheerio = require('cheerio');
const allLinks = [];

const arguments = process.argv;

const domain = arguments[2];
const url = arguments[2] + '/';

const collect_page_links = (url, links) => {
    // console.log("Requesting", url); 
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(html);

            //Lấy tất cả href của một site
            $('a').each( (i, e) => {
                let href = $(e).attr('href');
                if(typeof href != 'undefined' && href.startsWith('/')) {
                    href = domain + href;
                }
                if(typeof href != 'undefined' && (href.startsWith(domain) || href.startsWith('/')) && links.indexOf(href) == -1) {
                    console.log(href);
                    links.push(href);
                    collect_page_links(href, links);
                }
            });

        }
    });

    return allLinks;
}

collect_page_links(url, allLinks);