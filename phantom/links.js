var scrapedText = new Promise(function(resolve) {
    var selector = 'body';
    var url = 'www.courts.com.sg/checkout/cart/';

    phantom.create({
      'web-security': false,
      'ignore-ssl-rules': true,
      'ssl-protocol': 'tlsv1',
      'load-images': false
    }, function (ph) {
      ph.createPage(function (page) {
        page.open(url, function (status) {
          if (status == 'success') {
            page.includeJs("/jquery.min.js", function (scriptUrl) {
            page.evaluate(function (selector) {
              return jQuery(selector).text();
            }, function (result) {
               var text = result;
               ph.exit();
               resolve(text);
              }, selector);
            });
          } else {
            ph.exit();
            resolve(status);
          }
        });
     });
  });
});