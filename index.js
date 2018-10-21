const phantom = require('phantom');
process.env.NODE_ENV = 'production';
const collect_cookies = async (url) => {
    try {
        const instance = await phantom.create();
        const page = await instance.createPage();
        
        cookies = [];
    
        await page.on("onResourceRequested", function(requestData) {
            // console.info('Requesting', requestData.url)
        });
    
        await page.on("onLoadFinished", async function(requestData) {
            cookies = await page.cookies();
        });
    
        await page.open(url);
        await page.close();
        await instance.exit();
        
        return cookies;
    } catch (ex) {
        return ex;
    }
}

collect_cookies(process.argv[2]).then(cookies => {
    console.log('FinalCookies:', JSON.stringify(cookies));
});