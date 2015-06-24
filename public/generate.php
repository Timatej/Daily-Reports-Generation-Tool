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
    'Cookie: TIN=299000; seraph.rememberme.cookie=15024%3A0f1f5c14d284f0b2779977c53744f0c404b787ed; atlassian.xsrf.token=BNLH-U4EQ-MRBX-L4HU|49161617a0fa2731bcc864588f13ea1a4bce43d1|lin; SMIDENTITY=bAuq2VRH0hSp7MtzV+mA2HI64mZtaJerT4xpIEsJYm9CAAy/YIB+QLxjKl33R973z5xp2qK51ax9FpTERC+dvwNV/supBMCuu2k8Q24c4Hv+H3N7zT6vLQAPYa4CedWqYiABK4vfF2Gm5zGrLQ5NWBN8I3muv0P9Oxz3f3YMexNMm64GRZlfhlpsYBW3SaMacK87KkgAKOe/3RCGzSigQgV9BfPP6w9VhkYIlC0slmHUVSUnhJ4tUrlOz0yzdQD19uieDgxLUyy/wyVq68BgK6T8KGD5mBErkT6XCWAsZRkVgXPlRmOklpmaHRgH4eNrPH4QLr316CwFkPNDE6A2sybo0zFAAAttNQV/IuwEeqhBMjVn5i5EvZNRMvW+R6CIxdB4JPIcru6/SDWW8hqeyhwi+c0z7RlipDg3AE5ZG6OEXQP8bOOMBnw7OeriomC+4iyrlZzD1Hg1Q/lt8N1dI8Ocg6hAYoZw34B6mGmWyh/cQVlRsQb81/1mgMP2oGyBbTfmsvrhKxY/26zcALq/NpeDicEaPXWzsPmx3yTnK2nLakVERRBScKUZvlEgnVKaMzyavFBshZM3XB2zBaH9QDjBOQaLCh9VygNyBSVPAaBIb5rAugBUp1HK6KgdI/CZtk/VZFpVDxsLXCXt93bexB28j/tUdgCiDkbEhFmzCPE0mAoGSoA/wclIZyXPptTN3dLxc/p5C7tHMUgmDTuvSxFPysR+Ix0hy5ajuQs2iaIXkAZg9hVYeTUq9vdD88MSKHiASv6KL4N4JNAmL5UIYEUDxRtANiSf; s_cc=true; s_fid=7853C7B334267CF9-3362A1AAD05F524B; s_sq=wdgconfluence%3D%2526pid%253Dusers%25252Fprofile%25252Feditmyprofilepicture.action%2526pidt%253D1%2526oid%253Dhttps%25253A%25252F%25252Fconfluence.disney.com%25252Fusers%25252Fprofile%25252Feditmyprofilepicture.action%252523%2526ot%253DA; F5_ST=1z1z1z1435072101z604800; LastMRH_Session=f83bfa16; MRHSession=acbdb8021934706d6822f65df83bfa16; JSESSIONID=AAF62D8A17C8AC3470144B83C7789A19; SMSESSION=INKuR5MTVS4b8PcgqBq9Tu+8mpugJ29ZllScxppfLgPXH0qPSn7v3pen1CENwQjeqvy8kORt/LKF1eaeh5FW59n8u6QRz7Cl0Ymzd+9zexdb0he9qeJ/FGf3Z7aibfgpPWlQfq3sG1okQD+LeP8F9fWunvmyuSv2FEpH0GQFi5Z+XcKzc3IpOULvz586CRpOMFkN85VXI0cSCuNjApj0DZJw/EK+4fKmMko7eoRfaDRfzhvOVJQelFT9rPWm/kwxKNfo10kjCgFfdt9gg94Ym0RXywHvtrbYeHbGlyIgig27yQ8qHFWA031+tg9bUcE8M4iyJPcFo/oBeYAp3/eutCWkmQIKxrNg/jy09VEIKhz0yCVfNmPam9OVRI2rcNDLzWsI5YqMrOgWB5lvvEIe8Wh1FAFOgXPFAeBiaJP9b9Sn4S/SdqWdhIl/D89nj2mUAIgWTK/aAzbFQUJ1wpjsVpSTNOK5JrHbcP7xZrrfV6ZlCNi6Cnsy4eTapws6IOUuCpoLRtIBZMLzA+ZM2SbMTdiBNhDyU1WhHCwku6220OHAu7+TXc1ahGAfyYJYJejTiWTKxjCyi6E1OtdQ8JmlqBhWwz1kGaF57iCmZM6tCSSxRZHAsqdba1bp4H8wQNMibSs4UYhHy/xZX5Zz4sc3RX0KtLDnqxfEKiLPFUgm1GUgtl4xlIdZ25kiycWa1VW+VVLyCdQuVSkgd6WGeif3ekZJ8dSFdsffRKEKY9c70l1lOVAWbhCKeaSuwygSpJGw6uttkA6Y+MGxjOGzGotIwbJnv7BUionFVBCfksXqTTEVnJFX+AqgfVDuiuH8KAk5phxixYcB97mByFaj8Rjc5ZMNddOldqnrrCzLnPbICRbzUCvMc7/WKNZQ1xV0zZiCYtgkk8NCp3ofpHIfO6rCbDwJePEf0nSZxZATuOVXN9K8X59PBxWL2B04Xlv+yNXUYQ/Io7sKwhHjS9Am4qizbE529aRKKgk25PPH7GzYO9EFOkauxkGPxjyMv6a/lrdqeIe3u9MwSxZKJ8fp+WMQQuyQWAGfKt+0mFARUkghjqOMrA2w4IeyMFCtDFPPRzWfmiGaIG3ZAfe4PuoiNBRVl0UCgWAVpC6/bR3Xqp64Y3BcE2hIK6mF0M3h8VNTVCvI2Tfu/+ppVwECyM/4xeAWvx7rV6uQLu0C26PJKmHO+O8LoAue5VA4OePww0XPZt4rLayyWMd11Knm7zntt7XLq47ASLI5sBX10qYJBTSa84G3huyOGltUr/Y+2HdgPsOH'
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