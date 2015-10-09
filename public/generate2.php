<?php

namespace Exadel\AppleTVABC\ReportGenerator;

class Auth
{
    const URL_ORIGIN = 'https://abcjira.disney.com';
    const URL_JIRA = 'https://abcjira.disney.com/login.jsp';
    const URL_BIG_IP = 'https://abcjira.disney.com/my.policy';

    /** @var string */
    private $username;

    /** @var string */
    private $password;

    /**
     * Auth constructor.
     * @param $username
     * @param $password
     */
    public function __construct($username, $password)
    {
        $this->username = $username;
        $this->password = $password;
    }

    /**
     * Auth
     */
    public function auth()
    {
        $this->jira();
        $this->bigIp();
        $this->bigIp();
        $this->jira();
    }

    /**
     * Auth JIRA
     */
    protected function jira()
    {
        $this->doRequest(self::URL_JIRA, [
            'os_username' => $this->username,
            'os_password' => $this->password,
            'os_destination' => '',
            'user_role' => '',
            'atl_token' => '',
            'login' => 'Log In',
        ]);
    }

    /**
     * Auth Big-IP
     */
    protected function bigIp()
    {
        $this->doRequest(self::URL_BIG_IP, [
            'username' => $this->username,
            'password' => $this->password,
            'vhost' => 'standard',
        ]);
    }

    /**
     * @param $url
     * @param array $data
     * @param array $headers
     */
    protected function doRequest($url, array $data = [], array $headers = [])
    {
        $headers = array_merge([
            'Origin: ' . self::URL_ORIGIN,
            'Accept-Encoding: gzip, deflate',
            'Accept-Language: ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
            'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36',
            'HTTPS: 1',
            'Content-Type: application/x-www-form-urlencoded',
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Cache-Control: max-age=0',
            'Referer: ' . $url,
            'Connection: Close',
        ], $headers);

        $command = sprintf("curl '%s' --cookie-jar cookie.txt --cookie cookie.txt -k -s ", $url);

        foreach ($headers as $header) {
            $command .= sprintf(" -H '%s' ", $header);
        }

        if (!empty($data)) {
            $command .= sprintf(" --data '%s' ", http_build_query($data));
        }

        exec($command);
    }
}

class Generator
{
    /** @var array */
    private $urls;

    /**
     * @param array $urls
     */
    public function __construct(array $urls = [])
    {
        $this->urls = $urls;
    }

    /**
     * @param string $sample
     * @param string $output
     * @throws \Exception
     */
    public function updateConsumer($sample, $output)
    {
        $result = $this->parse();
        $data = implode(',' . PHP_EOL, array_values($result));

        $file = file_get_contents($sample);
        $file = str_replace('//generated_list', $data, $file);
        file_put_contents($output, $file);
    }

    /**
     * @return array
     * @throws \Exception
     */
    protected function parse()
    {
        $result = [];

        foreach ($this->urls as $url) {
            $result = array_merge($result, $this->getData($url));
        }

        return $result;
    }

    /**
     * @param string $url
     * @return array
     * @throws \Exception
     */
    private function getData($url)
    {
        $response = $this->doRequest($url);
        $data = json_decode($response);

        if (empty($data)) {
            throw new \Exception('Empty response: ' . $url);
        }

        $result = [];

        if (isset($data->issuesData)) {
            $issues = $data->issuesData->issues;
        } else {
            $issues = $data->issues;
        }

        foreach ($issues AS $entry) {
            $id = $entry->key;
            $title = str_replace('"', '', $entry->summary);
            $result[$id] = sprintf('"%s": "%s"', $id, $title);
        }

        return $result;
    }

    /**
     * @param string $url
     * @param array $headers
     * @return mixed
     */
    private function doRequest($url, array $headers = [])
    {
        $curl = curl_init();

        $headers = array_merge(array(
            'Accept:application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding:gzip, deflate, sdch',
            'Accept-Language:en-US,en;q=0.8,ru;q=0.6,es;q=0.4,nl;q=0.2,fr;q=0.2,ja;q=0.2',
            'Cache-Control:no-cache',
            'Connection:keep-alive',
            'Content-Type:application/json',
        ), $headers);

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($curl, CURLOPT_ENCODING, "gzip");
        curl_setopt($curl, CURLOPT_COOKIEFILE, dirname(__FILE__) . '/cookie.txt');

        $out = curl_exec($curl);
        curl_close($curl);

        return $out;
    }
}

$urls = [
    'https://abcjira.disney.com/rest/greenhopper/1.0/xboard/plan/backlog/data.json?rapidViewId=57', // Disney
    'https://abcjira.disney.com/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=57',
];

echo "Authentication .. ";

$auth = new Auth('user', 'pass');
$auth->auth();

echo "OK" . PHP_EOL;
echo "Generation .. ";

$generator = new Generator($urls);
$generator->updateConsumer('consumer_sample.js', 'consumer.js');

echo "OK" . PHP_EOL;
