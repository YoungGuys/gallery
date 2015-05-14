<?php
    /**
     * @author balon
     * @copyright 2014
     */

    /**
     * Класс відображує сторінку.
     * Містить функції, які піключають відповіді види
     */
    session_start();
    class Routing{

        /*
            !!! закриття </body>  тепер в NoneElement
        */


        function __construct() {
        }



        /**
         * @param boolean $admin
         * @param String $page
         * @param array $part
         */
        function loadPage ($admin,$page,$part) {
            if ($page == "ru" && !$part[0]) {
                $_SESSION['lang'] = "ru";
            }
            else if ($page == "eng" && !$part[0]) {
                $_SESSION['lang'] = "eng";
            }
            else if (!$_SESSION['lang'] || $page == "ukr"){
                $_SESSION['lang'] = "ua";
            }
            if ($part[0] != "Успіх" && $page != "Maps" && $part[0] != "Новий_пароль" &&
                $part[1] != "Остання_перевірка" && $part[0] != "Запит" && $part[0] != "Вхід" && $part[0] != "Заявка"
                && $page != "Додати_амбасаду" && $part[0] != "Підтвердження" && $page != "Редагувати_амбасаду") {
                $this->loadHead();
            }
            include_once("balon_core/cmp_system/DBProc/DBProc.php");
            preg_match_all("/username=(.*)&.*/Uis",$_COOKIE['sa_auth'],$role);
            if ($role[1][0] == "urban.boguslav@gmail.com" || $role[1][0] == "fajolyfrackir@mail.ru") {
                $role = true;
            }
            else {
                $role = false;
            }
            switch ($page) {
                case "Maps":
                    include_once("balon_core/cmp_system/DBProc/DBProc.php");
                    $db = DBProc::instance();
                    $array = $db->select("t_skills");
                    if ($part[0] == "ru") {
                        foreach ($array as $key => $val) {
                            $array[$key]['text'] = $array[$key]['text_ru'];
                            $array[$key]['content'] = $array[$key]['ru'];
                        }
                        $_SESSION['lang'] = "ru";

                    }
                    elseif ($part[0] == "eng") {
                        foreach ($array as $key => $val) {
                            $array[$key]['text'] = $array[$key]['text_eng'];
                            $array[$key]['content'] = $array[$key]['eng'];
                        }
                        $_SESSION['lang'] = "eng";
                    }
                    else {
                        $_SESSION['lang'] = "ua";
                    }
                    include_once("balon_core/view/skill.php");
                    break;
                case "Реєстрація":
                    include_once("balon_core/cmp_system/DBProc/DBProc.php");
                    if ($part[0] == "Підтвердження") {
                        header('Access-Control-Allow-Origin: *');
                        $name = $_POST['name'];
                        $mail = $_POST['email'];
                        $pass = md5($_POST['pass']);
                        $password = $_POST['pass'];
                        $db = DBProc::instance();
                        $a = $db->select("user","email","email = $mail");
                        if (!$a) {
                            $id = $db->insert("user","roleId = 1;name = $name;email = $mail;password = $pass;status = 1",true);
                            if ($id) {
                                /*$token = "balon";
                                $num = md5($token.$id);
                                $href = $_SESSION['site']."Реєстрація/Успіх?token=$num&id=$id&pass={$_POST['pass']}&mail=$mail";
                                $headers= "MIME-Version: 1.0\r\n";
                                $headers .= "Content-type: text/html; charset=utf-8\r\n";
                                mail($mail,"Підтвердження реєстрації","<p>Для закінчення реєстрації, будь ласка перейдіть за
                                    <a href='$href'>посиланням</a></p>",$headers);
                                FileSystem::includeView("success.php");*/
                                $message = '

 <table style="width: 100%;"
 border="0"
 cellpadding="0"
 cellspacing="0"
     >
 <tbody>
 <tr>
 <td>
 <table border="0"
 cellpadding="0"
 cellspacing="0"
 bgcolor="#fff"
 style="width: 800px; margin: 0 auto; padding: 25px 0">
 <tbody>
 <tr>
 <td>
 <a href="http://skillsacademy.com.ua" style="text-align: center; display: block; margin-bottom: 55px;">
 <img src="http://blog.skillsacademy.com.ua/wp-content/uploads/email-pic/logo.png" width="312" height="180" alt="logo" />
 </a>
 </td>
 </tr>
 <tr>
 <td style="
 padding: 0 57px;
 color: #000;
 text-align: center;
 line-height: 22px;
 -webkit-text-size-adjust:none;
 font-size: 20px;
 font-weight: 300;
 font-family: Verdana, Arial, sans-serif;
 ">

 <p>Створюйте своє майбутнє з нами!</p>

 <p>
                                Вітаємо Вас з реєстрацією та початком захоплюючої <br/>
 подорожі у світ знань, проектів, роботи вашої мрії і <br/>
 усвідомленому вибору у всіх сферах життя.
 </p>

 <p>
                                Допоможи собі сам! Розвивайтесь. Зростайте.
 <br/>
 Досягайте успіху!
 </p>

 <p>Команда Skills Academy.</p>

 <p>
                                Ваш логін для входу: <b>'.$mail.'</b>
 <br/>
 Ваш пароль для входу: <b>'.$password.'</b>
 </p>

 <p>
                                Слідкуйте за нашими новинами
                                <br/>
 у соціальних мережах та на нашому блозі
                                </p>

 <br/>
 <br/>

 <p style="margin: 0 auto;">
 <a href="https://www.youtube.com/user/SkillsAcademyUA" style="display: inline-block; margin: 0 18px;">
 <img src="http://blog.skillsacademy.com.ua/wp-content/uploads/email-pic/soc-y.png" alt="icon-youtube"/>
 </a>
 <a href="https://www.facebook.com/skills.academy" style="display: inline-block; margin: 0 18px;">
 <img src="http://blog.skillsacademy.com.ua/wp-content/uploads/email-pic/soc-f.png" alt="icon-facebook"/>
 </a>
 <a href="http://vk.com/skills_academy" style="display: inline-block; margin: 0 18px;">
 <img src="http://blog.skillsacademy.com.ua/wp-content/uploads/email-pic/soc-v.png" alt="icon-vkontakte"/>
 </a>
 <a href="http://blog.skillsacademy.com.ua" style="display: inline-block; margin: 0 18px;">
 <img src="http://blog.skillsacademy.com.ua/wp-content/uploads/email-pic/blog-logo.png" alt="icon-blog"/>
 </a>
 </p>

 <br/>


 <p>Наші партнери</p>

 <br/>

 <a href="http://www.eba.com.ua/uk" style="display: inline-block; vertical-align: middle; margin: 30px 22px">
 <img src="http://blog.skillsacademy.com.ua/wp-content/uploads/email-pic/eba.png" alt="logo-eba"/>
 </a>
 <a href="http://visegradfund.org/" style="display: inline-block; vertical-align: middle; margin: 30px 22px">
 <img src="http://blog.skillsacademy.com.ua/wp-content/uploads/email-pic/vh.png" alt="logo-visegrad_found"/>
 </a>
 <a href="http://www.yss.com.ua/" style="display: inline-block; vertical-align: middle; margin: 30px 22px">
 <img src="http://blog.skillsacademy.com.ua/wp-content/uploads/email-pic/st.png" alt="logo-stud-spilka"/>
 </a>
 <a href="http://www.dcz.gov.ua/control/uk/index" style="display: inline-block; vertical-align: middle; margin: 30px 22px">
 <img src="http://blog.skillsacademy.com.ua/wp-content/uploads/email-pic/work_gaverment.png" alt="logo-work_gaverment"/>
 </a>
 <a href="https://www.facebook.com/UrbanX.Ukraine" style="display: inline-block; vertical-align: middle; margin: 30px 10px">
 <img src="http://blog.skillsacademy.com.ua/wp-content/uploads/email-pic/urbanx.png" alt="logo-urbanx"/>
 </a>
 <a href="http://www.me.gov.ua/?lang=uk-UA" style="display: inline-block; vertical-align: middle; margin: 30px 25px">
 <img src="http://blog.skillsacademy.com.ua/wp-content/uploads/email-pic/mert_ua.png" alt="logo-mert_ua"/>
 </a>
 <a href="http://www.mon.gov.ua/" style="display: inline-block; vertical-align: middle; margin: 30px 0">
 <img src="http://blog.skillsacademy.com.ua/wp-content/uploads/email-pic/mino.png" alt="logo-min_osvity"/>
 </a>
 <a href="http://dsmsu.gov.ua/index/ua" style="display: inline-block; vertical-align: middle; margin: 30px 0">
 <img src="http://blog.skillsacademy.com.ua/wp-content/uploads/email-pic/mins.png" alt="min_sporty"/>
 </a>
 </td>
 </tr>
 </tbody>
 </table>
 </td>
 </tr>
 </tbody>
 </table>
';
                                $headers= "MIME-Version: 1.0\r\n";
                                $headers .= "From: SkillsAcademy <info@skillsacademy.com.ua>" . "\r\n". "Content-type: text/html; charset=utf-8\r\n";
                                if (mail($mail,"Підтвердження реєстрації",$message,$headers)) {
                                    echo "
                            <script type=\"text/javascript\" src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js\"></script>
                            <script>
                            $(document).ready(function() {
                                $.ajax({
                                    url: '/auth/ajaxLogin',
                                    type: 'POST',
                                    dataType: 'json',
                                    data: 'email=$mail&password={$_POST['pass']}&autologin=1',
                                    success: function(data) {
                                            window.location.href = 'http://skillsacademy.com.ua/profile';

                                    }
                                }).done(function() {
                                            window.location.href = 'http://skillsacademy.com.ua/profile';
                            });

                            })</script>";
                                };

                            }
                        }
                        else {
                            if ($a['status'] == "0") {
                                $error = "Email не підтверджено";
                            }
                            else {
                                $error = "Такий емейл вже існує";
                            }
                            $_GET['error'] = $error;
                            $this->loadHead();
                            if ($_SESSION['lang'] == "ru") {
                                FileSystem::includeView("registr_ru.php");
                            }
                            else if ($_SESSION['lang'] == "eng") {
                                FileSystem::includeView("registr_en.php");
                            }
                            else {
                                FileSystem::includeView("registr.php");
                            }
                        }
                    }
                    elseif ($part[0] == "Успіх"){
                        $id = $_GET['id'];
                        $email = $_GET['mail'];
                        $pass = $_GET['pass'];
                        if (md5("balon".$id) == $_GET['token']) {
                            $db = DBProc::instance();
                            $db->update("user","status == 1","userId = $id");
                            $array = $db->select("user",false,"userId = $id")[0];
                            //$email = $array['email'];

                            echo "
                            <script type=\"text/javascript\" src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js\"></script>
                            <script>
                            $(document).ready(function() {
                                $.ajax({
                                    url: '/auth/ajaxLogin',
                                    type: 'POST',
                                    dataType: 'json',
                                    data: 'email=$email&password=$pass&autologin=1',
                                    success: function(data) {
                                            window.location.href = 'http://skillsacademy.com.ua/profile';

                                    }
                                }).done(function() {
                                            window.location.href = 'http://skillsacademy.com.ua/profile';
                            });

                            })</script>";
                        }
                    }
                    else {
                        if ($_SESSION['lang'] == "ru") {
                            FileSystem::includeView("registr_ru.php");
                        }
                        else if ($_SESSION['lang'] == "eng") {
                            FileSystem::includeView("registr_en.php");
                        }
                        else {
                            FileSystem::includeView("registr.php");
                        }
                    }

                    break;

                case "Увійти":
                    if ($part[0] == "Вхід") {
                        if ($_POST['email'] && $_POST['pass']) {
                            $db = DBProc::instance();
                            $email = $_POST['email'];
                            $pass = md5($_POST['pass']);
                            $a = $db->select("user","userId","email = $email;password = $pass");
                            if (is_numeric($a) && ($a)) {

                                echo "
                            <script type=\"text/javascript\" src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js\"></script>
                            <script>
                            $(document).ready(function() {
                                $.ajax({
                                    url: '/auth/ajaxLogin',
                                    type: 'POST',
                                    dataType: 'json',
                                    data: 'email=$email&password={$_POST['pass']}&autologin=1',
                                    success: function() {
                                            window.location.href = 'http://skillsacademy.com.ua/goals';

                                    }
                                }).done(function() {
                                            window.location.href = 'http://skillsacademy.com.ua/goals';
                            });

                            })</script>";
                            }
                            else {
                                header("Location:".$_SESSION['site']."Увійти?error=Не правильний пароль або email");
                            }
                            //echo "<script> window.location.href = 'http://skillsacademy.com.ua/goals';</script>";
                        }
                    }
                    else {

                        if ($_SESSION['lang'] == "ru") {
                            FileSystem::includeView("authorization_ru.php");
                        }
                        else if ($_SESSION['lang'] == "eng") {
                            FileSystem::includeView("authorization_en.php");
                        }
                        else {
                            FileSystem::includeView("authorization.php");
                        }
                    }
                    break;
                case "Зміна_паролю":
                    if ($part[0] == "Новий_пароль") {
                        $db = DBProc::instance();
                        $email = $_POST['email'];
                        /*$pass1 = $_POST['pass1'];
                        $pass2 = $_POST['pass2'];*/
                        $id = $db->select("user","userId","email = $email");
                        if ($id) {
                            $headers= "MIME-Version: 1.0\r\n";
                            $headers .= "Content-type: text/html; charset=utf-8\r\n";
                            $token = md5("balon4ik".$id);
                            $href = $_SESSION['site']."Зміна_паролю/Відновлення?token=$token&balon=$id";
                            mail($email,"Відновлення паролю",
                                "Для того, щоб відновити пароль, будь ласка, перйдіть за цим <a href='$href'>посиланням</a>",$headers);
                            header("Location:".$_SESSION['site']."Зміна_паролю/Відправлено");
                        }
                        else {
                            $error = "Користувач з таким email`ом не зареєстрований";
                            header("Location:".$_SESSION['site']."Зміна_паролю?error=$error");
                        }
                    }
                    elseif ($part[0] == "Відправлено") {
                        include_once("balon_core/view/success4.php");
                    }
                    elseif ($part[0] == "Відновлено") {
                        include_once("balon_core/view/success5.php");
                    }
                    elseif ($part[0] == "Відновлення") {
                        if ($part[1] == "Остання_перевірка") {
                            if ($_GET['token'] == md5("balon4ik".$_GET['balon'])) {
                                if ($_POST['pass1'] == $_POST['pass2']) {
                                    $db = DBProc::instance();
                                    $pass = md5($_POST['pass1']);
                                    $db->update("user","password == ".$pass,"userId=".$_GET['balon']);
                                    header("Location:".$_SESSION['site']."Зміна_паролю/Відновлено");
                                }
                                else {
                                    $error = "Паролі не співпадають";
                                    header("Location:".$_SESSION['site']."Зміна_паролю/Відновлення?
                                        token={$_GET['token']}&balon={$_GET['balon']}&error=");
                                }
                            }
                            else {
                                header("Location:".$_SESSION['site']);
                            }
                        }
                        else {
                            if ($_GET['token'] == md5("balon4ik".$_GET['balon'])) {
                                include_once("balon_core/view/repair_pass.php");
                            }
                        }

                    }
                    else {
                        include_once("balon_core/view/new_pass.php");
                    }
                    break;
                case "Долучитись":
                    switch ($part[0]) {
                        case "Команда":
                            $name_cat = "Команда";
                            if ($_SESSION['lang'] == "ru") {
                                $type = "Присоедениться к команде";
                                include_once("balon_core/view/team_ru.php");
                            }
                            else if ($_SESSION['lang'] == "eng") {
                                $type = "Join the command";
                                include_once("balon_core/view/team_eng.php");
                            }
                            else {
                                $type = "долучитись до команди";
                                include_once("balon_core/view/team.php");
                            }
                            break;
                        case "Тренер":
                            $type = "долучитись як тренер";
                            $name_cat = "Тренер";
                            if ($_SESSION['lang'] == "ru") {
                                $type = "Присоедениться как тренер";
                                include_once("balon_core/view/team_ru.php");
                            }
                            else if ($_SESSION['lang'] == "eng") {
                                $type = "Join as trainer";
                                include_once("balon_core/view/team_eng.php");
                            }
                            else {
                                $type = "долучитись як тренер";
                                include_once("balon_core/view/team.php");
                            }
                            break;
                        case "HR":
                            $type = "долучитись як HR";
                            $name_cat = "HR";
                            if ($_SESSION['lang'] == "ru") {
                                $type = "Присоедениться как HR";
                                include_once("balon_core/view/team_ru.php");
                            }
                            else if ($_SESSION['lang'] == "eng") {
                                $type = "Join as HR";
                                include_once("balon_core/view/team_eng.php");
                            }
                            else {
                                $type = "долучитись як HR";
                                include_once("balon_core/view/team.php");
                            }
                            break;
                        case "Запит":
                            if ($part[1] == "Команда" || $part[1] == "Тренер" || $part[1] == "HR") {
                                $name = $_POST['name'];
                                $email = $_POST['email'];
                                $phone = $_POST['phone'];
                                $text = $_POST['text'];
                                $headers= "MIME-Version: 1.0\r\n";
                                $headers .= "Content-type: text/html; charset=utf-8\r\n";
                                mail("urban.boguslav@gmail.com","Заявка на долученння ($part[1])",
                                    "<p>Категорія - ".$part[1]."<br>
                                    Ім'я - $name<br>
                                    Телефон - $phone<br>
                                    Email - $email<br>
                                    Пару слів про себе - $text</p>",$headers);
                                mail("maryprohorova@gmail.com","Заявка на долученння ($part[1])",
                                    "<p>Категорія - ".$part[1]."<br>
                                    Ім'я - $name<br>
                                    Телефон - $phone<br>
                                    Email - $email<br>
                                    Пару слів про себе - $text</p>",$headers);
                                header("Location:".$_SESSION['site']."Долучитись/Вдало");
                            }
                            break;
                        case "Вдало":
                            include_once("balon_core/view/success3.php");
                            break;
                    }
                    break;
                case "123":
                    echo urldecode("a%3A9%3A%7Bs%3A10%3A%22session_id%22%3Bs%3A32%3A%2207ec7b8be6d35f1f1b617bfc029066ea%22%3Bs%3A10%3A%22ip_address%22%3Bs%3A13%3A%2277.47.167.116%22%3Bs%3A10%3A%22user_agent%22%3Bs%3A102%3A%22Mozilla%2F5.0+%28Windows+NT+6.3%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F35.0.1916.153+Safari%2F537.36%22%3Bs%3A13%3A%22last_activity%22%3Bi%3A1404794090%3Bs%3A9%3A%22user_data%22%3Bs%3A0%3A%22%22%3Bs%3A8%3A%22loggedIn%22%3Bb%3A1%3Bs%3A6%3A%22userId%22%3Bs%3A3%3A%22478%22%3Bs%3A6%3A%22roleId%22%3Bs%3A1%3A%223%22%3Bs%3A9%3A%22ambasador%22%3Bs%3A1%3A%221%22%3B%7Df581467b029a1839abbdc0943f02da8e");
                    print_r ($_COOKIE['sa_auth']);
                    ;                break;
                case "Створити_амбасаду":
                    if ($part[0] == "Заявка") {
                        if ($_POST['link'] && $_POST['vnz'] && $_POST['tel'] && $_POST['text']) {
                            $headers= "MIME-Version: 1.0\r\n";
                            $headers .= "Content-type: text/html; charset=utf-8\r\n";
                            mail("urban.boguslav@gmail.com","Заявка на амбасаду",
                                "<p>Заявка на амбасаду<br>
                                    Лінк на профіль - {$_POST['link']}<br>
                                    ВНЗ - {$_POST['vnz']}<br>
                                    Телефон - {$_POST['tel']}<br>
                                    Пару слів про себе - {$_POST['text']}</p>",$headers);
                            mail("maryprohorova@gmail.com","Заявка на амбасаду",
                                "<p>Заявка на амбасаду<br>
                                    Лінк на профіль - {$_POST['link']}<br>
                                    ВНЗ - {$_POST['vnz']}<br>
                                    Телефон - {$_POST['tel']}<br>
                                    Пару слів про себе - {$_POST['text']}</p>",$headers);
                            header("Location:".$_SESSION['site']."Створити_амбасаду/Вдало");
                        }
                    }
                    $this->loadHead();
                    if ($part[0] == "Вдало") {
                        include_once("balon_core/view/success2.php");
                    }
                    else {
                        if ($_SESSION['lang'] == "ru") {
                            include_once("balon_core/view/ambasads_ru.php");
                        }
                        else if ($_SESSION['lang'] == "eng") {
                            include_once("balon_core/view/ambasads_eng.php");
                        }
                        else {
                            include_once("balon_core/view/ambasads.php");
                        }
                    }
                    break;
                case "Додати_амбасаду":
                    if (!$role) header("Location:".$_SESSION['site']);
                    $href = $_POST['href'];
                    $des_ua = $_POST['des_ua'];
                    $des_ru = $_POST['des_ru'];
                    $des_en = $_POST['des_en'];
                    $white = $_FILES['white'];
                    if ($white['tmp_name']) {
                        copy($white['tmp_name'],"balon_core/lib/img/ambasads/".$white['name']);
                    }
                    $db = DBProc::instance();
                    $db->insert("ambasads","href = $href; white = {$white['name']}; type = {$_POST['type']};
                        des_ua = $des_ua;des_ru = $des_ru;des_en = $des_en");
                    header("Location:".$_SESSION['site']);
                    break;
                case "Редагувати_амбасаду":
                    if (!$role) header("Location:".$_SESSION['site']);
                    $id = $_POST['id'];
                    $what = "";
                    $k = '';
                    if ($_POST['href']) {
                        $what .= "$k href == ".$_POST['href'];
                        $k = ";;";
                    }
                    if ($_POST['des_ua']) {
                        $what .= "$k des_ua == ".$_POST['des_ua'];
                        $k = ";;";
                    }
                    if ($_POST['des_ru']) {
                        $what .= "$k des_ru == ".$_POST['des_ru'];
                        $k = ";;";
                    }
                    if ($_POST['des_en']) {
                        $what .= "$k des_en == ".$_POST['des_en'];
                        $k = ";;";
                    }
                    $white = $_FILES['white'];
                    print_r ($white);
                    if ($white['tmp_name']) {
                        print_r (scandir("balon_core/lib/img/ambasads/"));
                        copy($white['tmp_name'],"balon_core/lib/img/ambasads/".$white['name']);
                        $what .= "$k white == ".$white['name'];
                    }
                    $db = DBProc::instance();
                    $db->update("ambasads",$what,"id = $id");
                    header("Location:".$_SESSION['site']);
                    break;
                default:
                    include_once("balon_core/cmp_system/DBProc/DBProc.php");
                    $db = DBProc::instance();
                    $attendance = $db->select("setting","value","key = attendance");
                    $ambasads = $db->select("ambasads");
                    shuffle($ambasads);
                    foreach ($ambasads as $val) {
                        if ($val['type'] == "school") {
                            $school[] = $val;
                        }
                        elseif ($val['type'] == "company") {
                            $company[] = $val;
                        }
                        elseif ($val['type'] == "vnz") {
                            $vnz[] = $val;
                        }
                    }
                    //print_r ($schools);
                    /*$schools = shuffle($schools);
                    $company = shuffle($company);
                    $vnz = shuffle($vnz);*/
                    if (true) {
                        $coach = $db->select("coach",false,false,"id",true);
                    }
                    else {
                        $coach = $db->select("coach",false,"visibility = 0","id",true);
                    }
                    foreach ($coach as $key => $val) {
                        if ($val['command'] == "trener") {
                            $coachs[] = $val;
                        }
                        elseif ($val['command'] == "hr") {
                            $hr[] = $val;
                        }
                        elseif ($val['command'] == "core") {
                            $core[] = $val;
                        }
                    }
                    $a = $_COOKIE['ci_session'];
                    //preg_match_all("|.*ambasador\";s:[0-9]\"(.*)\".*|Uis",$a,$arr);
                    preg_match_all("/.*{.*ambasador\";s:1:\"(.*)\";}.*/Uis",$a,$arr);
                    //preg_match_all("/.*{.*roleId\";s:1:\"(.*)\".*;}.*/Uis",$a,$role);
                    preg_match_all("/username=(.*)&.*/Uis",$_COOKIE['sa_auth'],$role);
                    if ($role[1][0] == "urban.boguslav@gmail.com" || $role[1][0] == "fajolyfrackir@mail.ru") {
                        $role = true;
                    }
                    else {
                        $role = false;
                    }
                    if ($arr[1][0] == "1") {
                        $ambasadors = true;
                    }
                    include_once("balon_core/admin/cmp_system/Control/Control.php");
                    shuffle($coachs);
                    shuffle($hr);
                    shuffle($core);
                    switch ($page) {
                        case "ru":
                            foreach ($coachs as $key => $v ) {
                                $coach[$key]['name'] = $coachs[$key]['name_ru'];
                                $coach[$key]['spec'] = $coachs[$key]['spec_ru'];
                                $coach[$key]['href'] = $coachs[$key]['href'];
                                $coach[$key]['image'] = $coachs[$key]['image'];
                            }
                            $coachs = $coach;
                            foreach ($hr as $key => $v ) {
                                $hrs[$key]['name'] = $hr[$key]['name_ru'];
                                $hrs[$key]['spec'] = $hr[$key]['spec_ru'];
                                $hrs[$key]['href'] = $hr[$key]['href'];
                                $hrs[$key]['image'] = $hr[$key]['image'];
                            }
                            $hr = $hrs;
                            foreach ($core as $key => $v ) {
                                $cores[$key]['name'] = $core[$key]['name_ru'];
                                $cores[$key]['spec'] = $core[$key]['spec_ru'];
                                $cores[$key]['href'] = $core[$key]['href'];
                                $cores[$key]['image'] = $core[$key]['image'];
                            }
                            $core = $cores;

                            include_once("balon_core/view/index_ru.php");
                            break;
                        case "eng":

                            foreach ($coachs as $key => $v ) {
                                $coach[$key]['name'] = $coachs[$key]['name_eng'];
                                $coach[$key]['spec'] = $coachs[$key]['spec_eng'];
                                $coach[$key]['href'] = $coachs[$key]['href'];
                                $coach[$key]['image'] = $coachs[$key]['image'];
                            }
                            $coachs = $coach;
                            foreach ($hr as $key => $v ) {
                                $hrs[$key]['name'] = $hr[$key]['name_eng'];
                                $hrs[$key]['spec'] = $hr[$key]['spec_eng'];
                                $hrs[$key]['href'] = $hr[$key]['href'];
                                $hrs[$key]['image'] = $hr[$key]['image'];
                            }
                            $hr = $hrs;
                            foreach ($core as $key => $v ) {
                                $cores[$key]['name'] = $core[$key]['name_eng'];
                                $cores[$key]['spec'] = $core[$key]['spec_eng'];
                                $cores[$key]['href'] = $core[$key]['href'];
                                $cores[$key]['image'] = $core[$key]['image'];
                            }
                            $core = $cores;
                            include_once("balon_core/view/index_en.php");
                            break;
                        default:
                            include_once("balon_core/view/index.php");
                            break;
                    }
                    break;
            }
            if ($part[0] != "Успіх" && $part[0] != "Запит" && $part[0] != "Вхід" && $part[0] != "Підтвердження"
                && $page != "Редагувати_амбасаду" && $part[0] != "Новий_пароль") {
                include_once("balon_core/view/none_element.php");
            }
            $_SESSION['what'] = 'add_comand';
        }

        function loadHead() {
            include_once("balon_core/view/header.php");
        }





        public function includeCSS($file_name) {
            echo '<link rel="stylesheet" type="text/css" href="'.$this->site.'lib/style/' . $file_name . '"/>' . "\n";;
        }
        public function includeJS($file_name) {
            echo '<script type="text/javascript" src="'.$this->site.'lib/js/' . $file_name . '"></script>' . "\n";
        }

    }



?>