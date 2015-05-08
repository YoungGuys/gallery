<?php
/**
 * Created by PhpStorm.
 * User: Андрій
 * Date: 03.01.2015
 * Time: 0:10
 */

namespace Balon\System;


class Balon {
    function __construct() {
        $this->user = "Balon";
        // TODO: Implement __construct() method.
    }

    public function newMVCComponent() {
        echo "Start creating new MVC Component...<br>";
        if (User::trueDev()) {
            echo "Hi, developer...<br>";
            if ($_GET['name']) {
                $name = $_GET['name'];
                echo "Name component - <b>$name</b> <br>";
                if (!is_dir("core/components/$name")) {
                    echo "Creating directory...";
                    mkdir("core/components/$name");
                    //chmod("core/components/$name",0777);
                    echo "<b>success</b><br>";
                    if (!$_GET['components']) {
                        $this->createController($name);
                        $this->createModel($name);
                        $this->createView($name);
                    } else {
                        $components = explode(",", $_GET['components']);
                        if (is_array($components)) {
                            foreach ($components as $comp) {
                                $methodName = "create" . $comp;
                                $this->$methodName($name);
                            }
                        } else {
                            $methodName = "create" . $components;
                            $this->$methodName($name);
                        }
                    }
                    echo "<a href='".SITE."$name'>Перейтина на компонент <b>$name</b></a>";
                }
            }
            else echo "name component does not exist...<br>";
        }
        else echo "you not a developer<br>";
    }

    private function createController($name) {
        echo "Creating controller...";
        $file = file_get_contents("core/system/Balon/template/Controller.tpl");
        $user = $this->user;
        $date = date("d.m.Y");
        $time = date("H:i");
        $file = preg_replace("/{{name}}/", $name, $file);
        $file = preg_replace("/{{user}}/", $user, $file);
        $file = preg_replace("/{{date}}/", $date, $file);
        $file = preg_replace("/{{time}}/", $time, $file);
        mkdir("core/components/$name/Controller");
        //chmod("core/components/$name/Controller",0777);
        file_put_contents("core/components/$name/Controller/$name.php", $file);
        //chmod("core/components/$name/Controller/$name.php",0777);
        echo " <b>success</b>! <br>";
    }

    private function createModel($name) {
        echo "Creating model...";
        $file = file_get_contents("core/system/Balon/template/Model.tpl");
        $user = $this->user;
        $date = date("d.m.Y");
        $time = date("H:i");
        $file = preg_replace("/{{name}}/", $name, $file);
        $file = preg_replace("/{{user}}/", $user, $file);
        $file = preg_replace("/{{date}}/", $date, $file);
        $file = preg_replace("/{{time}}/", $time, $file);
        mkdir("core/components/$name/Model");
        //chmod("core/components/$name/Model",0777);
        file_put_contents("core/components/$name/Model/$name.php", $file);
        //chmod("core/components/$name/Model/$name.php",0777);
        echo " <b>success</b>! <br>";
    }

    private function createView($name) {
        echo "Creating view...";
        $file = file_get_contents("core/system/Balon/template/View.tpl");
        $user = $this->user;
        $date = date("d.m.Y");
        $time = date("H:i");
        $file = preg_replace("/{{name}}/", $name, $file);
        $file = preg_replace("/{{user}}/", $user, $file);
        $file = preg_replace("/{{date}}/", $date, $file);
        $file = preg_replace("/{{time}}/", $time, $file);
        mkdir("core/components/$name/View");
        //chmod("core/components/$name/View",0777);
        file_put_contents("core/components/$name/View/$name.php", $file);
        //chmod("core/components/$name/View/$name.php",0777);
        echo " <b>success</b>! <br>";
    }
} 