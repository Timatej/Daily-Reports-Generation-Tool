<?php

class Reports
{
    private $_file;

    public function __construct() {
        $this->_file = 'reports/' . date("d-m-Y") . '.json';
    }
    public function getTeamReport() {
        header('Content-Type: application/json');
        if (file_exists($this->_file)) {
            echo file_get_contents($this->_file);
        } else {
            file_put_contents($this->_file, $_GET['init']);
            echo $_GET['init'];
        }
    }
    public function addReport() {
        $data = json_decode(file_get_contents('php://input'));
        $person = $data->person;
        $report = $data->report;
        $reportList = json_decode(file_get_contents($this->_file));
        $reportList->$person = $report;
        file_put_contents($this->_file, json_encode($reportList));
        echo 'OK';

    }
}

$reports = new Reports();

switch ($_GET['action']) {
    case 'get':
       $reports->getTeamReport();
        break;
    case 'save':
        $reports->addReport();
        break;
}