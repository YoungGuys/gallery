<?php
    /**
     * Created by PhpStorm.
     * User: Андрей
     * Date: 29.08.14
     * Time: 12:05
     */

namespace Balon;

/**
 * Class OAuth
 *
 *
 */

/*DataBase
 * CREATE TABLE IF NOT EXISTS `t_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `photo` varchar(500) NOT NULL,
  `vk_id` varchar(200) NOT NULL,
  `fb_id` varchar(200) NOT NULL,
  `tw_id` varchar(100) NOT NULL,
  `ggl_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;
 *
 */
class OAuth {

        private $redirect = "http://www.radnyk.com/?method=";

        // Масив данних для підключення до vk api
        private $vk = Array(
            "client" => "4797922",// CLIENT_ID
            "secret" => "z9hlioIyY2PBzsHQ4GyD", // SECRET_ID
            "access_token" => "",
        ),
            // Масив данних для підключення до facebook api
            $fb = Array(
            "client" => "1573265746293344",// CLIENT_ID
            "secret" => "4720582e4f3752d8a4d0bfd91a4efb01", // SECRET_ID
            "access_token" => ""
        ),
            // Масив данних для підключення до twitter api
            $tw = Array(
            "client" => "Sp08O2RJADzO4Q5zQ04Haa0hO ",//API_ID
            "secret" => "",
            "access_token" => ""
        ),
            // Масив данних для підключення до google api
            $ggl = Array(
            "client" => "104385366602-43vgmdainu5k18vo44r518e2nbu50f0n.apps.googleusercontent.com", //API_ID
            "secret" => "dQDdW36fRfY6bdMxK-l654rL" //SECRET_KEY
        );

        public $href = Array();

        private $token = "sd989fgfg98";

        function __construct() {
            //в масиві зберігаються посилання на вікна авторизації через соц. мережі
            $this->href = Array(
                "vk" => "http://oauth.vk.com/authorize?client_id={$this->vk['client']}&response_type=code&scope=email&display=popup&v=5.24&redirect_uri=".$this->redirect."vk",
                //"tw" => $this->get_tw_code(),
                "fb" => "https://www.facebook.com/v2.1/dialog/oauth?response_type=code&display=popup&client_id={$this->fb['client']}&scope=user_friends&redirect_uri=".$this->redirect."fb",
                "ggl" => "https://accounts.google.com/o/oauth2/auth?redirect_uri={$this->redirect}ggl&response_type=code&client_id={$this->ggl['client']}&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile"
            );
        }

        /**
         * @param $array - Array - масив значень
         */
        function routing($array) {
            //if ($_SESSION['id']) return;
            if ($array['method'] == "vk") {
                $this->vk_auth($array['code']);
            }
            elseif ($array['method'] == "fb") {
                $this->fb_auth($array['code']);
            }
            elseif ($array['method'] == "tw") {
                $this->tw_auth($array);
            }
            elseif ($array['method'] == "ggl") {
                $this->ggl_auth($array);
            }
        }

        // registration from http://vk.com

        function vk_auth($code) {
            $code = $_REQUEST["code"];
            // Робимо запит для отримання access_token
            $href = "https://oauth.vk.com/access_token?client_id={$this->vk['client']}&client_secret={$this->vk['secret']}&code=$code&redirect_uri={$this->redirect}vk";//&grant_type=client_credentials";
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, $href);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            $stream = curl_exec($curl);
            $array = json_decode($stream);
            if ($array->access_token) {
                // отримуємо access_token
                $this->vk['access_token'] = $array->access_token;
                //
                $info = file_get_contents("https://api.vk.com/method/users.get?user_id=$array->user_id&v=5.24&access_token={$this->vk['access_token']}&fields=photo_100");
                $info = json_decode($info);
                $info = $info->response[0];
                if ($_COOKIE['user_id']) {
                    $this->db->update("users",["vk_id" => $array->user_id], ["id" => $_COOKIE['user_id']]);
                    header("Location:".SITE);
                    return;
                }
                $ids = $this->db->select("users",false,["vk_id" => $array->user_id]);
                if (!$ids) {
                    $FD = $this->db->insert("users",[
                        "vk_id" => $array->user_id,
                        "first_name" => $info->first_name,
                        "last_name" => $info->last_name,
                        "photo" => $info->photo_100
                    ],true);
                    if ($FD) {
                        $this->db->insert("users_info",["id_user" => $FD]);
                        setcookie("first_name",$info->first_name,time() + 60*60*24*360*2, "/");
                        setcookie("last_name",$info->last_name,time() + 60*60*24*360*2, "/");
                        setcookie("photo",$info->photo_100,time() + 60*60*24*360*2, "/");
                        setcookie("user_id",$FD,time() + 60*60*24*360*2, "/");
                        setcookie("token",md5("balon_".$FD."_core"),time() + 60*60*24*360*2, "/");
                    }
                }
                else {
                    $ids = $ids[0];
                    if ($ids['role']) {
                        setcookie("role",$ids['role'],time() + 60*60*24*360*2, "/");
                        setcookie("role_token",md5("balon_".$ids['role']."_core_role"),time() + 60*60*24*360*2, "/");
                    }
                    setcookie("first_name",$ids['first_name'],time() + 60*60*24*360*2, "/");
                    setcookie("last_name",$ids['last_name'],time() + 60*60*24*360*2, "/");
                    setcookie("photo",$ids['photo'],time() + 60*60*24*360*2, "/");
                    setcookie("user_id",$ids['id'],time() + 60*60*24*360*2, "/");
                    setcookie("token",md5("balon_".$ids['id']."_core"),time() + 60*60*24*360*2, "/");
                }
                $this->vk['expires_in'] = $array->expires_in;
                $this->vk['user_id'] = $array->user_id;
                $this->vk['email'] = $array->email;
            }
            elseif ($array->error_description) {
                echo $array->error_description;
            }
        }

        function fb_auth($code) {
            $fb_param = "first_name,last_name,link,picture,email";
            $access_href = "https://graph.facebook.com/oauth/access_token?code=$code&client_id={$this->fb['client']}&client_secret={$this->fb['secret']}&redirect_uri=".$this->redirect."fb&";
            $access = file_get_contents($access_href);
            $code = explode("=",$access)[1];
            $code = explode("&",$code)[0];
            $href = "https://graph.facebook.com/v2.1/me?&access_token=$code"."&fields=$fb_param";
            $info = file_get_contents($href);
            $info = json_decode($info);
            if ($_COOKIE['user_id']) {
                $this->db->update("users",["fb_id" => $info->id], ["id" => $_COOKIE['user_id']]);
                header("Location:".SITE);
                return;
            }
            $id = $this->db->select("users",false,["fb_id" => $info->id]);
            if (!$id) {
                $id = $this->db->insert("users",[
                    "fb_id" => $info->id,
                    "first_name" => $info->first_name,
                    "last_name" => $info->last_name,
                    "photo" => $info->picture->data->url
                ],true);
                if ($id) {
                    $this->db->insert("users_info",["id_user" => $id]);
                    setcookie("first_name",$info->first_name,time() + 60*60*24*360*2, "/");
                    setcookie("last_name",$info->last_name,time() + 60*60*24*360*2, "/");
                    setcookie("photo",$info->picture->data->url,time() + 60*60*24*360*2, "/");
                    setcookie("user_id",$id,time() + 60*60*24*360*2, "/");
                    setcookie("token",md5("balon_".$id."_core"),time() + 60*60*24*360*2, "/");
                }
            }
            else {
                $id = $id[0];
                if ($id['role']) {
                    setcookie("role",$id['role'],time() + 60*60*24*360*2, "/");
                    setcookie("role_token",md5("balon_".$id['role']."_core_role"),time() + 60*60*24*360*2, "/");
                }
                setcookie("first_name",$id['first_name'],time() + 60*60*24*360*2, "/");
                setcookie("last_name",$id['last_name'],time() + 60*60*24*360*2, "/");
                setcookie("photo",$id['photo'],time() + 60*60*24*360*2, "/");
                setcookie("user_id",$id['id'],time() + 60*60*24*360*2, "/");
                setcookie("token",md5("balon_".$id['id']."_core"),time() + 60*60*24*360*2, "/");
            }
        }


        function tw_auth($array) {
            if (!empty($array['oauth_token']) && !empty($array['oauth_verifier'])) {
                $oauth_nonce = md5(uniqid(rand(), true));
                $oauth_timestamp = time();

                // получаем oauth_token пришедший после перенаправления от Twitter-а
                $oauth_token = $_GET['oauth_token'];
                // получаем oauth_verifier пришедший после перенаправления от Twitter-а
                $oauth_verifier = $_GET['oauth_verifier'];


                $oauth_base_text = "GET&";
                $oauth_base_text .= urlencode(ACCESS_TOKEN_URL)."&";

                $params = array(
                    'oauth_consumer_key=' . CONSUMER_KEY . URL_SEPARATOR,
                    'oauth_nonce=' . $oauth_nonce . URL_SEPARATOR,
                    'oauth_signature_method=HMAC-SHA1' . URL_SEPARATOR,
                    'oauth_token=' . $oauth_token . URL_SEPARATOR,
                    'oauth_timestamp=' . $oauth_timestamp . URL_SEPARATOR,
                    'oauth_verifier=' . $oauth_verifier . URL_SEPARATOR,
                    'oauth_version=1.0'
                );
                $oauth_token_secret = $_SESSION[md5("oauth_token_secret")];
                $key = CONSUMER_SECRET . URL_SEPARATOR . $oauth_token_secret;
                $oauth_base_text = 'GET' . URL_SEPARATOR . urlencode(ACCESS_TOKEN_URL) . URL_SEPARATOR . implode('', array_map('urlencode', $params));
                $oauth_signature = base64_encode(hash_hmac("sha1", $oauth_base_text, $key, true));
                $params = array(
                    'oauth_nonce=' . $oauth_nonce,
                    'oauth_signature_method=HMAC-SHA1',
                    'oauth_timestamp=' . $oauth_timestamp,
                    'oauth_consumer_key=' . CONSUMER_KEY,
                    'oauth_token=' . urlencode($oauth_token),
                    'oauth_verifier=' . urlencode($oauth_verifier),
                    'oauth_signature=' . urlencode($oauth_signature),
                    'oauth_version=1.0'
                );
                $url = ACCESS_TOKEN_URL . '?' . implode('&', $params);

                $response = file_get_contents($url);
                parse_str($response, $response);

                $oauth_nonce = md5(uniqid(rand(), true));
                $oauth_timestamp = time();

                $oauth_token = $response['oauth_token'];
                $oauth_token_secret = $response['oauth_token_secret'];
                $screen_name = $response['screen_name'];

                $params = array(
                    'oauth_consumer_key=' . CONSUMER_KEY . URL_SEPARATOR,
                    'oauth_nonce=' . $oauth_nonce . URL_SEPARATOR,
                    'oauth_signature_method=HMAC-SHA1' . URL_SEPARATOR,
                    'oauth_timestamp=' . $oauth_timestamp . URL_SEPARATOR,
                    'oauth_token=' . $oauth_token . URL_SEPARATOR,
                    'oauth_version=1.0' . URL_SEPARATOR,
                    'screen_name=' . $screen_name
                );
                $oauth_base_text = 'GET' . URL_SEPARATOR . urlencode(ACCOUNT_DATA_URL) . URL_SEPARATOR . implode('', array_map('urlencode', $params));

                $key = CONSUMER_SECRET . '&' . $oauth_token_secret;
                $signature = base64_encode(hash_hmac("sha1", $oauth_base_text, $key, true));

                $params = array(
                    'oauth_consumer_key=' . CONSUMER_KEY,
                    'oauth_nonce=' . $oauth_nonce,
                    'oauth_signature=' . urlencode($signature),
                    'oauth_signature_method=HMAC-SHA1',
                    'oauth_timestamp=' . $oauth_timestamp,
                    'oauth_token=' . urlencode($oauth_token),
                    'oauth_version=1.0',
                    'screen_name=' . $screen_name
                );

                $url = ACCOUNT_DATA_URL . '?' . implode(URL_SEPARATOR, $params);

                $response = file_get_contents($url);

                // преобразуем json в массив
                $user_data = json_decode($response);
                $first_name = explode(" ",$user_data->name)[0];
                $last_name = explode(" ",$user_data->name)[1];
                $id = $user_data->id;
                $photo = $user_data->profile_image_url;
                if ($_COOKIE['user_id']) {
                    $this->db->update("users",["tw_id" => $id], ["id" => $_COOKIE['user_id']]);
                    header("Location:".SITE);
                    return;
                }
                $ids = $this->db->select("users",false,["tw_id" => $id]);
                if (!$ids) {
                    $ids = $this->db->insert("users",[
                        "tw_id" => $id,
                        "first_name" => $first_name,
                        "last_name" => $last_name,
                        "photo" => $photo
                    ],true);
                    if ($ids) {
                        $this->db->insert("users_info",["id_user" => $id]);
                        setcookie("first_name",$first_name,time() + 60*60*24*360*2, "/");
                        setcookie("last_name",$last_name,time() + 60*60*24*360*2, "/");
                        setcookie("photo",$photo,time() + 60*60*24*360*2, "/");
                        setcookie("user_id",$ids,time() + 60*60*24*360*2, "/");
                        setcookie("token",md5("balon_".$ids."_core"),time() + 60*60*24*360*2, "/");
                    }
                }
                else {
                    $ids = $ids[0];
                    if ($ids['role']) {
                        setcookie("role",$ids['role'],time() + 60*60*24*360*2, "/");
                        setcookie("role_token",md5("balon_".$ids['role']."_core_role"),time() + 60*60*24*360*2, "/");
                    }
                    setcookie("first_name",$ids['first_name'],time() + 60*60*24*360*2, "/");
                    setcookie("last_name",$ids['last_name'],time() + 60*60*24*360*2, "/");
                    setcookie("photo",$ids['photo'],time() + 60*60*24*360*2, "/");
                    setcookie("user_id",$ids['id'],time() + 60*60*24*360*2, "/");
                    setcookie("token",md5("balon_".$ids['id']."_core"),time() + 60*60*24*360*2, "/");
                }

            }

        }




        function ggl_auth ($array) {
            $code = $_REQUEST['code'];
            $access_token = "https://accounts.google.com/o/oauth2/token?code=$code&client_id={$this->ggl['client']}&client_secret={$this->ggl['secret']}&grant_type=authorization_code&redirect_uri={$this->redirect}ggl";

            $result = false;

            $params = array(
                'client_id'     => $this->ggl['client'],
                'client_secret' => $this->ggl['secret'],
                'redirect_uri'  => $this->redirect."ggl",
                'grant_type'    => 'authorization_code',
                'code'          => $code
            );

            $url = 'https://accounts.google.com/o/oauth2/token';
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, urldecode(http_build_query($params)));
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            $result = curl_exec($curl);
            curl_close($curl);
            $tokenInfo = json_decode($result, true);
            $access_token = $tokenInfo['access_token'];
            $info = file_get_contents("https://www.googleapis.com/oauth2/v1/userinfo?access_token=".$access_token);
            $info = json_decode($info, true);
            $id = $info['id'];
            $given_name = $info['given_name'];
            $family_name = $info['family_name'];
            $picture = $info['picture'];
            if ($_COOKIE['user_id']) {
                $this->db->update("users",["ggl_id" => $id], ["id" => $_COOKIE['user_id']]);
                header("Location:".SITE);
                return;
            }
            $ids = $this->db->select("users","id",["ggl_id" => $id]);
            if (!$ids) {
                $ids = $this->db->insert("users",[
                    "ggl_id" => $id,
                    "first_name" => $given_name,
                    "last_name" => $family_name,
                    "photo" => $picture
                ],true);
                if ($ids) {
                    $this->db->insert("users_info",["id_user" => $ids]);
                    setcookie("first_name",$given_name,time() + 60*60*24*360*2, "/");
                    setcookie("last_name",$family_name,time() + 60*60*24*360*2, "/");
                    setcookie("photo",$picture,time() + 60*60*24*360*2, "/");
                    setcookie("user_id",$ids,time() + 60*60*24*360*2, "/");
                    setcookie("token",md5("balon_".$ids."_core"),time() + 60*60*24*360*2, "/");
                    $_SESSION['photo'] = $picture;
                }
            }
            else {
                $ids = $ids[0];
                if ($ids['role']) {
                    setcookie("role",$ids['role'],time() + 60*60*24*360*2, "/");
                    setcookie("role_token",md5("balon_".$ids['role']."_core_role"),time() + 60*60*24*360*2, "/");
                }
                setcookie("first_name",$ids['first_name'],time() + 60*60*24*360*2, "/");
                setcookie("last_name",$ids['last_name'],time() + 60*60*24*360*2, "/");
                setcookie("photo",$ids['photo'],time() + 60*60*24*360*2, "/");
                setcookie("user_id",$ids['id'],time() + 60*60*24*360*2, "/");
                setcookie("token",md5("balon_".$ids['id']."_core"),time() + 60*60*24*360*2, "/");
            }
        }



        function get_tw_code() {
            define('CONSUMER_KEY', 'Sp08O2RJADzO4Q5zQ04Haa0hO');
            define('CONSUMER_SECRET', 'eMMCCRLYXJ0tTRzkKHWLgFWuT0ETV1asFzGhEb6jFrcdOflqry');

            // адрес получения токена запроса
            define('REQUEST_TOKEN_URL', 'https://api.twitter.com/oauth/request_token');
            // адрес аутентификации
            define('AUTHORIZE_URL', 'https://api.twitter.com/oauth/authorize');
            // адрес получения токена доступа
            define('ACCESS_TOKEN_URL', 'https://api.twitter.com/oauth/access_token');
            // адрес API получения информации о пользователе
            define('ACCOUNT_DATA_URL', 'https://api.twitter.com/1.1/users/show.json');

            // колбэк, адрес куда должен будет перенаправлен пользователь, после аутентификации
            define('CALLBACK_URL', 'http://plcb.me/?method=tw');

            //определим разделитель, который отделять параметры друг от друга
            define('URL_SEPARATOR', '&');
            // хэш случайной строки
            $oauth_nonce = md5(uniqid(rand(), true));

            // текущее время
            $oauth_timestamp = time();
            // формируем набор параметров
            $params = array(
                'oauth_callback=' . urlencode(CALLBACK_URL) . URL_SEPARATOR,
                'oauth_consumer_key=' . CONSUMER_KEY . URL_SEPARATOR,
                'oauth_nonce=' . $oauth_nonce . URL_SEPARATOR,
                'oauth_signature_method=HMAC-SHA1' . URL_SEPARATOR,
                'oauth_timestamp=' . $oauth_timestamp . URL_SEPARATOR,
                'oauth_version=1.0'
            );

            // склеиваем все параметры, применяя к каждому из них функцию urlencode
            $oauth_base_text = implode('', array_map('urlencode', $params));

            // специальный ключ
            $key = CONSUMER_SECRET . URL_SEPARATOR;

            // формируем общий текст строки
            $oauth_base_text = 'GET' . URL_SEPARATOR . urlencode(REQUEST_TOKEN_URL) . URL_SEPARATOR . $oauth_base_text;

            // хэшируем с помощью алгоритма sha1
            $oauth_signature = base64_encode(hash_hmac('sha1', $oauth_base_text, $key, true));


            // готовим массив параметров
            $params = array(
                URL_SEPARATOR . 'oauth_consumer_key=' . CONSUMER_KEY,
                'oauth_nonce=' . $oauth_nonce,
                'oauth_signature=' . urlencode($oauth_signature),
                'oauth_signature_method=HMAC-SHA1',
                'oauth_timestamp=' . $oauth_timestamp,
                'oauth_version=1.0'
            );

            // склеиваем параметры для формирования url
            $url = REQUEST_TOKEN_URL . '?oauth_callback=' . urlencode(CALLBACK_URL) . implode('&', $params);
            // Отправляем GET запрос по сформированному url
            $response = file_get_contents($url);
            // Парсим ответ
            parse_str($response, $response);

            // записываем ответ в переменные
            $oauth_token = $response['oauth_token'];
            $oauth_token_secret = $response['oauth_token_secret'];
            $_SESSION[md5("oauth_token_secret")] = $oauth_token_secret;

            $link = AUTHORIZE_URL . '?oauth_token=' . $oauth_token;
            return $link;



        }


        function __get($value) {
            if ($value == "db") {
                $this->$value = DBProc::instance();
                return $this->$value;
            }
        }


    }


?>