<?php
/**
 * Created by PhpStorm.
 * User: {{user}}
 * Date: {{date}}
 * Time: {{time}}
 */

namespace Model;
use Balon\DBProc;
use Balon\System;

class {{name}} extends System\Model{

    function __construct(){
        $this->db = DBProc::instance();
        // TODO: Implement __construct() method.
    }

    public function index(){

    }
}