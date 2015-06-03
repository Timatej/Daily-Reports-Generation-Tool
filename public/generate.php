<?php
$url = 'https://abcjira.disney.com/rest/greenhopper/1.0/xboard/plan/backlog/data.json?rapidViewId=61&_=1433317656558';

$headers = array(
    'Accept:application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding:gzip, deflate, sdch',
    'Accept-Language:en-US,en;q=0.8,ru;q=0.6,es;q=0.4,nl;q=0.2,fr;q=0.2,ja;q=0.2',
    'Cache-Control:no-cache',
    'Connection:keep-alive',
    'Content-Type:application/json',
    'Cookie: seraph.rememberme.cookie=14723%3Ad0bf82cae094975be0d2d19a0baa83a9847200c3; F5_ST=1z1z1z1433317604z604800; LastMRH_Session=255de5d6; MRHSession=ba54f4f25eaeb23fa23440a8255de5d6; JSESSIONID=D337B07F24F9FF9CFEF74547C9E456F4; atlassian.xsrf.token=BNLH-U4EQ-MRBX-L4HU|6878e9cd31ee9150bfd2bc5ba670acbd04bbc239|lin'
);
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt ($curl, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt ($curl, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($curl,CURLOPT_ENCODING , "gzip");
$out = curl_exec($curl);

$obj = json_decode($out);

if (!$obj) {
    echo $out . PHP_EOL;
    exit(curl_error($curl));
}
curl_close($curl);

$result = array();
//print_r($obj);
foreach ($obj->issues AS $entry) {
    $id =  $entry->key;
    $title =  $entry->summary;
    $result[] = "'" . $id . '\': ' . "'" . str_replace("'", '', $title) . "'";

}

$output = implode(',' . PHP_EOL, $result);

$file = file_get_contents('consumer_sample.js');
$file = str_replace('//generated_list', $output, $file);
file_put_contents('consumer.js', $file);

echo 'Done';