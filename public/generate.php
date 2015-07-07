<?php
$url1 = 'https://abcjira.disney.com/rest/greenhopper/1.0/xboard/plan/backlog/data.json?rapidViewId=61';
$url2 = 'https://abcjira.disney.com/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=62';

$headers = array(
    'Accept:application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding:gzip, deflate, sdch',
    'Accept-Language:en-US,en;q=0.8,ru;q=0.6,es;q=0.4,nl;q=0.2,fr;q=0.2,ja;q=0.2',
    'Cache-Control:no-cache',
    'Connection:keep-alive',
    'Content-Type:application/json',
    'Cookie: seraph.rememberme.cookie=14723%15168%3A4e753dbb63bc4cbbb41344809b32c246a1847248; F5_ST=1z1z1z1433331018z604800; LastMRH_Session=82318484; MRHSession=784f5aa315618e2ddfa6cdf782318484; JSESSIONID=31E84F2E5DF1FBA0CD122FA60573475E; atlassian.xsrf.token=BNLH-U4EQ-MRBX-L4HU|ae8917309e502893b20db7b4c2dd7fe60c8e4af2|lin'
);

function getData($url_to_load, $headers) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url_to_load);
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
    if (isset($obj->issuesData)) {
        $issues = $obj->issuesData->issues;
    } else {
        $issues = $obj->issues;
    }
    foreach ($issues AS $entry) {
        $id =  $entry->key;
        $title =  $entry->summary;
        $result[] = "'" . $id . '\': ' . "'" . str_replace("'", '', $title) . "'";

    }
    
    return $result;
}

$result = getData($url1, $headers);
$result = array_merge($result, getData($url2, $headers));

$output = implode(',' . PHP_EOL, $result);

$file = file_get_contents('consumer_sample.js');
$file = str_replace('//generated_list', $output, $file);
file_put_contents('consumer.js', $file);

echo 'Done';