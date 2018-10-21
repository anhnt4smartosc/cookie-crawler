const phantom = require('phantom');

let instance = null;

class CookieManager {
    constructor() {
        this.data = [];
        this.final_data  = [];

        this.add = (cookie, url) => {
            if(!this.is_existed(cookie)) {
                cookie.url = url;
                this.data.push(cookie.name);
                this.final_data.push(cookie);
                console.log("Added", cookie);
            }
        }

        this.is_existed = cookie => {
            return this.data.indexOf(cookie.name) !== -1;
        }

        this.get_final_data = () => {
            return this.final_data;
        }
    }
}

const collect_cookies = async (url) => {
    instance = await phantom.create();
    let page = await instance.createPage();
    let cookies = [];

    await page.on("onResourceRequested", function(requestData) {
//        console.info('Requesting', requestData.url)
    });

    await page.on("onLoadFinished", async function(requestData) {
        cookies = await page.cookies();
    });

    await page.open(url);
    await page.close();
    await instance.exit();

    return cookies;
}

const fs = require('fs');
const filename = process.argv[2];

console.log(filename);
let processedUrl = [];

fs.readFile(filename, 'utf8', (err, data) => {
  if (err) throw err;

  console.log('OK: ' + filename);
  let urls = data.split('\n');
  let cookieManager = new CookieManager();

  let promise = new Promise( (res, rej) => {
      urls.forEach( (url, i) => {
          collect_cookies(url).then(cookies => {
            cookies.forEach( cookie => {
                cookieManager.add(cookie, url);
            });

            processedUrl.push(url);

            if(i == urls.length - 1) {
                res(cookieManager);
            }
          });
      });
  });
  
  promise.then(cookieManager => {
    let finalData = cookieManager.get_final_data();
    console.log(finalData);

  }).catch(err => {
      console.log(err);
  });
});