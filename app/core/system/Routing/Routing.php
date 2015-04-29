<?php
/**
 * @author balon
 * @copyright 2014
 */

namespace Balon;

/**
 * Класс відображує сторінку.
 * Містить функції, які піключають відповіді види
 */
class Routing {

    /*
    !!! закриття </body>  тепер в NoneElement
*/
    private $cache;

    function __construct() {

    }


    function loadPage() {
        if ($_GET['method']) {
            $oauth = new OAuth;
            $oauth->routing($_GET);
        }
        $part = \Role::getPart()[0];
        $part[0] = strtolower($part[0]);
        $part[0] = ucfirst($part[0]);
        if (!$part[0]) {
            $part[0] = "Main";
        }
        if (!$part[1]) {
            $part[1] = "index";
        }
        $className = "\\Controller\\" . $part[0];
        if (class_exists($className)) {
            $obj = new $className;
            try {
                //if (method_exists($obj, $part[1])) {
                $obj->$part[1]($part);

                //}
            } catch (\Exception $e) {
                echo $e->getMessage();
                //else {
                if (file_exists("/view/404.php")) {
                    include_once("/view/404.php");
                } else {
                    echo "Method \"$part[1]\" in class \"$part[0]\" doesn`t exists";
                }
                //}asdf
            }
        } elseif (class_exists("\\Balon\\System\\" . $part[0]) && (DEV_MOD === true)) {
            $className = "\\Balon\\System\\" . $part[0];
            $obj = new $className;
            $method = $part[1];
            unset($part[0]);
            unset($part[1]);
            array_splice($part,2,-1);
            $obj->$method($part);
            /*if (method_exists($obj, $part[1])) {
                $obj->$part[1]($part);
            } else {
                if (file_exists("/view/404.php")) {
                    include_once("/view/404.php");
                } else {
                    echo "Method \"$part[1]\" in class \"$part[0]\" doesn`t exists";
                }
            }*/
        } else {
            if (file_exists("/view/404.php")) {
                include_once("/view/404.php");
            } else {
                echo "Class \"" . $part[0] . "\" doesn`t exists";
            }
        }

    }

}


?>