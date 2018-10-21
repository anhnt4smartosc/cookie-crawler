const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  
  try {
    await driver.get('https://www.courts.com.sg/checkout/cart/');

    await driver.sleep(5000);

    await driver.manage().getCookies().then(function (cookies) {
        console.log('Cookie',cookies);
    });

    await driver.executeScript('return document.cookie').then(function(return_value) {
        console.log('returned ', return_value)
    });
  } 
  catch(ex) {
    // console.log(ex);
  }
  finally {
    console.log('Finished Loading');
    await driver.quit();
  }
})();