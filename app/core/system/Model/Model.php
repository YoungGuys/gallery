<?php
/**
 * Created by PhpStorm.
 * User: andrii
 * Date: 07.02.15
 * Time: 17:42
 */

namespace Balon\System;

use Balon\DBProc;

abstract class Model {


public static $array = ["politics" => 1, "world" => 2, "economic" => 3, "culture" => 4, "sport" => 5];
public static $nameChapter = [1 => "Політика", 2 => "Світ", 3 => "Економіка", 4 => "Культура", 5 => "Спорт"];

    public $db;

    /*function __construct() {
        //$this->db = DBProc::instance();
        // TODO: Implement __construct() method.
    }*/


    public function loadHeader() {
        $this->db = DBProc::instance();
        $array = $this->db->select("else", false, ['id' => 1]);
        return $array[0];
    }

}