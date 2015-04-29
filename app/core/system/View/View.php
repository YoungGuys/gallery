<?php
/**
 * Created by PhpStorm.
 * User: Андрій
 * Date: 02.01.2015
 * Time: 23:48
 */

namespace Balon\System;


use Balon\DBProc;
use Balon\OAuth;
use Controller\Sidebar;

abstract class View {

    function __construct() {
        // TODO: Implement __construct() method.
    }

    public function loadContent($params = []) {
        include_once("./view/content.php");
    }

    protected function loadHead($params = []) {
        if (file_exists("./view/head.php")) {
            include_once("./view/head.php");
        }
    }

    protected function loadFooter($params = []) {
        // sorry, this is crunches
        $db = DBProc::instance();
        $text = $db->select('footer')[0];
        $menus = $this->menus;
        if (file_exists("./view/footer.php")) {
            include("./translate/translate.php");
            include_once("./view/footer.php");
        }
    }

    protected function loadHeader($active,$params = []) {
        $db = DBProc::instance();
        $ru = $db->send_query("SELECT * FROM `t_lang` WHERE `id` = 1")[0];
        $this->menus = $db->send_query("SELECT * FROM `t_menu`");
        $menus = $this->menus;
        if (file_exists("./view/header.php")) {
            include("./translate/translate.php");
            include_once("./view/header.php");
        }
    }

    protected function loadMenu($params = []) {
        if (file_exists("./view/translate.php")) {
            include_once("./view/translate.php");
        }
    }

    protected function loadSidebar($params = []) {
        if (file_exists("./view/sidebar.php")) {
            include_once("./view/sidebar.php");
        }
    }

    protected function loadModal($params = []) {
        //$oauth = new OAuth();
        if (file_exists("./view/modal.php")) {
            include_once("./view/modal.php");
        } elseif (file_exists("./view/none_element.php")) {
            include_once("./view/none_element.php");
        }
    }

    protected function loadTop() {
        $this->loadHead();
        $this->loadHeader();
        $this->loadContent();
    }



    protected function loadBottom() {
        $this->loadFooter();
        $this->loadModal();
    }

    protected function loadFullSidebar() {
        $sidebar = new Sidebar();
        $sidebar->loadSidebar(["advice","video", "recklama", "blog"]);
    }
}