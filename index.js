const phantom = require('phantom');

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    
    await page.on("onResourceRequested", function(requestData) {
        console.info('Requesting', requestData.url)
    });

    const status = await page.open('http://eziland.vn/');
    console.log(status);

    const content = await page.property('content');
    console.log(content);

    const cookies = await page.cookies();
    console.log(cookies);

    await instance.exit();
    
}());