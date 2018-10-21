<?php


class CookieManager {
    protected $data = [];

    function add($cookie, $url) {
        if(!$this->isSelected($cookie)) {
            $cookieElement = (array) $cookie;
            $cookieElement['url'] = $url;
            echo 'Added ' . $cookie->name . PHP_EOL;
            $this->data[$cookie->name] = $cookie;
        }
    }

    function isSelected($cookie) {
        return isset($this->data[$cookie->name]);
    }

    function getAll() {
        return $this->data;
    }
}

$cookieManager = new CookieManager();

$fh = fopen($argv[1],'r');
$urls = [];
while ($line = fgets($fh)) {
    $urls [] = $line;
}
fclose($fh);

foreach($urls as $url) {
    echo "Requesting ". $url . PHP_EOL;
    $output = shell_exec('node index.js ' . $url);
    
    if(!trim($output)) {
        continue;
    }

    $lines = explode(PHP_EOL, $output);
    
    if(count($lines) == 0) {
        continue;
    }

    foreach($lines as $line) {
        $line = trim($line);
        if(substr( $line, 0, 13 ) === "FinalCookies:") {
            list($zero, $cookieStr) = explode('FinalCookies:', $line);
            $cookies = json_decode($cookieStr);

            if(count($cookies)) {
                foreach($cookies as $cookie) {
                    $cookieManager->add($cookie);
                }
            }
        }
    }
}

print_r($cookieManager->getAll());
$savedFile = fopen('result-'.$argv[1], "w") or die("Unable to open file!");
fwrite($savedFile, json_encode($cookieManager->getAll()));
fclose($savedFile);