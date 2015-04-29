<?php

namespace Balon\System;

class User {
    function __construct() {
        // TODO: Implement __construct() method.
    }


    public static function trueUser() {
        if ($_COOKIE['token'] == md5("balon_" . $_COOKIE['user_id'] . "_core")) {
            return true;
        }
    }

    public static function trueAdmin() {
        //return false;
        //return true;
        $role = $_COOKIE['auth'];
        $token = $_COOKIE['token'];
        if ($token == md5("balon_" . $role . "_core_role")) {
            return true;
        }
    }

    public static function trueDev() {
        if (DEV_MOD) {
            return true;
        }
    }

}