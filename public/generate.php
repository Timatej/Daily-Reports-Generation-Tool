<?php
//$url1 = 'https://abcjira.disney.com/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=61';
$url1 = 'https://abcjira.disney.com/rest/greenhopper/1.0/xboard/plan/backlog/data.json?rapidViewId=61';
$url2 = 'https://abcjira.disney.com/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=62';
//$url2 = 'https://abcjira.disney.com/rest/greenhopper/1.0/xboard/plan/backlog/data.json?rapidViewId=62';

$headers = array(
    'Accept:application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding:gzip, deflate, sdch',
    'Accept-Language:en-US,en;q=0.8,ru;q=0.6,es;q=0.4,nl;q=0.2,fr;q=0.2,ja;q=0.2',
    'Cache-Control:no-cache',
    'Connection:keep-alive',
    'Content-Type:application/json',
    'Cookie: s_fid=7853C7B334267CF9-3362A1AAD05F524B; seraph.rememberme.cookie=15255%3Ad501135e33f7ce463d6553beecdd5dfdb7d6ce80; F5_ST=1z1z1z1436542309z604800; LastMRH_Session=75883b24; MRHSession=3f3213ee21c56cae26961ecb75883b24; JSESSIONID=F5BAAEA4E0EC8DA8C5289E5CD66D618E; atlassian.xsrf.token=BNLH-U4EQ-MRBX-L4HU|ca64f81e70fe1e7f40764128fa594f0552dbc95a|lin'
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