<?php
/**
 * Created by PhpStorm.
 * User: Андрей
 * Date: 13.05.14
 * Time: 3:02
 */
namespace Balon\System;

use Balon\DBProc;

class Api {

    private $cache = "";

    public $db;

    public $result;

    function __construct() {
        $this->db = DBProc::instance();
        /*if ($_GET['id_user']) {
            $this->db->update("users", ['active' => rand(0, 100)], ['id' => $_GET['id_user']]);
        }*/
        //header('Content-type:application/json;charset=utf-8');
    }

    function __destruct() {
        echo json_encode($this->result);
    }

    public function get_admin() {
        $this->result = $this->db->select("admin_login", false,
            ['login' => $_GET['login'], 'pass' => md5($_GET['pass'])]);
    }

    public function get_jury() {
        $this->result = $this->db->select("jury", false,
            [
                'login' => $_GET['login'],
                'pass' => md5($_GET['pass'])
            ])[0];
        setcookie("id", $this->result['id_jury'], time() + 60 * 60 * 24 * 360, "/");
        setcookie("token", md5("balon" . $this->result['id_jury']), time() + 60 * 60 * 24 * 360, "/");
    }

    public function get_juryProjects()
    {
        $id = $_GET['id_jury'];
        $sql = "SELECT projects.* FROM rating LEFT JOIN projects ON rating.id_project = projects.id_project
                WHERE rating.id_jury=$id";
        $array = $this->db->send_query($sql);
        $this->result = $array;
    }

    public function get_allJury() {
        $sql = "SELECT j.*, r.id_project, p.title_eng, p.title_ukr FROM `jury` AS j LEFT JOIN `rating` AS r ON j.id_jury = r.id_jury LEFT JOIN `projects` AS p ON p.id_project = r.id_project";
        $result = $this->db->send_query($sql);
        $newResult = [];
        foreach ($result as $key => $val) {
            if (!$newResult[$val['id_jury']]) $newResult[$val['id_jury']] = $result[$key];
            if ($val['id_project']) {
                $newResult[$val['id_jury']]['projects'][] = [
                    "id_project" => $val['id_project'],
                    "title_ukr" => $val['title_ukr'],
                    "title_eng" => $val['title_eng']
                ];
            }
            else {
                $newResult[$val['id_jury']]['projects'][] = [];
            }
            unset($newResult[$val['id_jury']]['id_project']);
        }
        $this->result = $newResult;
    }

    public function get_allUsers() {
        $this->result = $this->db->send_query("SELECT * FROM `users` as u LEFT JOIN `statements` as s ON u.id_user = s.id_user");
    }

    public function get_user() {
        $id = $_GET['id_user'];
        $sql = "SELECT * FROM `users` as u LEFT JOIN `statements` as s ON u.id_user = s.id_user WHERE u.id_user = $id";
        $this->result = $this->db->send_query($sql)[0];
    }

    public function get_projects() {
        $sql = "SELECT p.*, s.*, pp.*, (SELECT COUNT(*) FROM `rating` WHERE `rating`.id_project = p.id_project AND `rating`.repeat_vote = 0) AS rate FROM `projects` as p
            LEFT JOIN `statements` as s ON p.`id_statement` = s.`id_statement`
            LEFT JOIN `project_photos` as pp ON pp.id_project = p.id_project ";
        $result = $this->db->send_query($sql);
        $newResult = [];
        $b = 0;

        foreach ($result as $key => $val) {
            $newResult[$val['id_project']] = $val;
            $arr[$val['id_project']][] = ['id' => $val['id_photo'], 'src' => $val['src']];
            //print_r ($arr);
            //$newResult[$val['id_project']]['photos'] = 2;//['id' => $val['id_photo'], 'src' => $val['src']];
            unset($newResult[$val['id_project']]['src']);
            unset($newResult[$val['id_project']]['id_photo']);
        }
        $result = [];
        foreach ($newResult as $key => &$val) {
            $val['photos'] = $arr[$val['id_project']];
            $result[] = $val;
        }
        //var_dump($result);
        $this->result = $result;
    }

    public function get_project() {
        $id = $_GET['id_project'];
        $sql = "SELECT * FROM `projects` as p WHERE p.id_project = $id";
        $project = $this->db->send_query($sql)[0];
        $sql = "SELECT `src` FROM `project_photos` as p WHERE p.id_project = $id";
        $photos = $this->db->send_query($sql);
        $id_statement = $project['id_statement'];
        $sql = "SELECT * FROM `statements` as s WHERE s.`id_statement` = $id_statement";
        $statement = $this->db->send_query($sql)[0];
        if ($statement) {
            if ($statement['id_user']) {
                $user = $this->db->select("users", false, ['id_user' => $statement['id_user']])[0];
                $this->result = [
                    "project" => $project,"photos" => $photos,'statement' => $statement, 'user' => $user
                ];
            } elseif ($statement['id_group']) {
                $group = $this->db->select("group", false, ['id' => $statement['id_group']])[0];
                $users[0] = $this->db->select("users", false, ['id_group' => $statement['id_group']])[0];
                $this->result = [
                    "project" => $project,
                    "photos" => $photos,
                    "statement" => $statement,
                    "group" => $group,
                    "users" => $users
                ];
            }
        }
    }

    public function get_artistProjects() {
        $id = $_GET['artist'];
        $group_id = $this->db->select("users", false, ['id_user' => $id])[0];
        if ($group_id['id_group']) {
            $searchId = $group_id['id_group'];
        } else $searchId = $group_id['id_user'];
        $sql = "SELECT * FROM `projects` as p LEFT JOIN `statements` as s ON p.`id_statement` = s.`id_statement`";
        $sql .= " LEFT JOIN `project_photos` as pp ON pp.id_project = p.id_project";
        $sql .= " WHERE s.";
        if ($group_id['id_group'])
            $sql .= "`id_group`";
        else $sql .= "`id_user`";
        $sql .= " = ";
        if ($group_id['id_group'])
            $sql .= $group_id['id_group'];
        else $sql .= $group_id['id_user'];
        $result = $this->db->send_query($sql);
        foreach ($result as $key => $val) {
            $arr[$val['id_project']][] = ['id' => $val['id_photo'], 'src' => $val['src']];
            $newResult[$val['id_project']] = $val;
        }
        foreach ($newResult as $key => &$val) {
            $val['photos'] = $arr[$val['id_project']];
        }
        $result = array_values($newResult);
        $this->result = $result;
        //$this->result = $group_id;
    }

    public function get_myRateProject() {
        $my_id = $_COOKIE['id'];
        //echo $my_id;
        //$my_id = 1;
        $sql = "SELECT * FROM `projects` as p
          LEFT JOIN `statements` as s ON p.`id_statement` = s.id_statement
          LEFT JOIN `rating` as r ON r.id_project = p.id_project
          WHERE r.id_jury = $my_id AND r.repeat_vote = 0";
        $this->result = $this->db->send_query($sql);
    }

    public function get_ratingVisibility()
    {
        $array = file_get_contents("settings.json");
        $array = json_decode($array, true);
        if ($array['rating_visibility'] != 0) {
            $this->result = true;
        }
        else {
            $this->result = false;
        }
    }

    public function get_myRepeatProject()
    {
        $my_id = $_COOKIE['id'];
        //echo $my_id;
        //$my_id = 1;
        $sql = "SELECT * FROM `projects` as p
          LEFT JOIN `statements` as s ON p.`id_statement` = s.id_statement
          LEFT JOIN `rating` as r ON r.id_project = p.id_project
          WHERE r.id_jury = $my_id AND r.repeat_vote = 1";
        $this->result = $this->db->send_query($sql);
    }

    public function post_addJury() {
        self::trueAdmin();
        $this->result = $this->db->insert("jury",
            [
                'fio' => $_GET['fio'],
                'bio' => $_GET['bio'],
                'login' => $_GET['login'],
                'pass' => md5($_GET['pass']),
                'photo' => $_GET['photo']
            ], true);
    }

    public function post_addArtist() {
        $fio_ukr = $_GET['fio_ukr'];
        $fio_eng = $_GET['fio_eng'];
        $bio = $_GET['bio'];
        $photo = $_GET['photo'];
        $id_user = $this->db->insert("users", [
            "fio_ukr" => $fio_ukr,
            "fio_eng" => $fio_eng
        ], true);
        $id_statement = $this->db->insert("statements", [
            "bio" => $bio,
            "photo" => $photo,
            "id_user" => $id_user
        ], true);
        if ($id_statement) {
            $this->result = $id_user;
        }
    }

    public function post_statement() {
        $obj = json_decode($_GET['object'], true);
        /*$obj = [
            'group' => [
                "name_ukr" => 'name_ukr',
                'name_eng' =>'name_eng'
            ],
            "participants" => [
                [
                    "fio_ukr" => 'fio_ukr999',
                    "fio_eng" => 'fio_eng999',
                    "birthday" => 'birthday999',
                    "education" => 'education999',
                    "country" => 'country999',
                    "region" => 'region999',
                    'town' => 'town999',
                    'address' => 'address999',
                    'phone' => 'phone999',
                    'passport_seria' => 'pass1port_seria999',
                    'passport_number' => '33221',
                    'passport_who' => 'passport_who999',
                    'passport_when' => 'passport_whe999n'
                ],
                [
                    "fio_ukr" => 'fio_ukr29999',
                    "fio_eng" => 'fio_eng29999',
                    "birthday" => 'birthday29999',
                    "education" => 'education29999',
                    "country" => 'country29999',
                    "region" => 'region29999',
                    'town' => 'town29999',
                    'address' => 'address29999',
                    'phone' => 'phone29999',
                    'passport_seria' => 'passport_seria29999',
                    'passport_number' => '1122',
                    'passport_who' => 'passport_who29999',
                    'passport_when' => 'passport_when99992',
                ]
            ],
            "statements" => [
                    "type" => 'baalonn',
                    "phone" => 'baalonn',
                    "photo" => 'baalonn',
                    "email" => 'baalonn',
                    "bio" => 'baalonn',
                    "participant" => 'baalonn',
                    "exhibition_list" => 'baalonn'
            ],
            "projects" => [
                [
                    "title_ukr" => 'title_ukr11',
                    "title_eng" => 'title_eng11',
                    "title_long" => 'title_long11',
                    "type" => 'type11',
                    "description_ukr" => 'description_ukr11',
                    "description_eng" => 'description_eng11',
                    "material" => 'material11',
                    "sizes" => 'sizes11',
                    'recomendation' => 'recomendation11',
                    "owner" => 'owner11',
                    'photos' => [
                        ["src" => "dafa"],
                        ["src" => "dasdasdasd"],
                        ["src" => "13123fda s"],
                    ]
                ],
                [
                    "title_ukr" => 'title_ukr2222',
                    "title_eng" => 'title_eng2222',
                    "title_long" => 'title_long2222',
                    "type" => 'type2222',
                    "description_ukr" => 'description_ukr2222',
                    "description_eng" => 'description_eng2222',
                    "material" => 'material2222',
                    "sizes" => 'sizes2222',
                    'recomendation' => 'recomendation2222',
                    "owner" => 'owner2222',
                    'photos' => [
                        ["src" => "123123"],
                    ]
                ]
            ]
        ];*/
        if ($obj['group']) {
            $group = $obj['group'];
            $id_group = $this->db->insert("group",
                ["name_ukr" => $group['name_ukr'], 'name_eng' => $group['name_eng']], true);
        }
        if ($obj['participants']) {
            $users = $obj['participants'];
            foreach ($users as $key => $val) {
                $id_user = $this->db->insert("users",
                    [
                        "id_group" => $id_group,
                        "fio_ukr" => $val['fio_ukr'],
                        "fio_eng" => $val['fio_eng'],
                        "birthday" => $val['birthday'],
                        "education" => $val['education'],
                        "country" => $val['country'],
                        "region" => $val['region'],
                        'town' => $val['town'],
                        'address' => $val['address'],
                        'phone' => $val['phone'],
                        'passport_seria' => $val['passport_seria'],
                        'passport_number' => $val['passport_number'],
                        'passport_who' => $val['passport_who'],
                        'passport_when' => $val['passport_when']
                    ], true
                );
            }
        }
        if ($obj['statements']) {
            $statements = $obj['statements'];
            //foreach ($statements as $key => $val) {
            $id_statement = $this->db->insert("statements",
                [
                    "id_user" => $id_group ? null : $id_user,
                    "id_group" => $id_group ? $id_group : null,
                    "type" => $statements['type'],
                    "phone" => $statements['phone'],
                    "photo" => $statements['photo'],
                    "email" => $statements['email'],
                    "bio" => $statements['bio'],
                    "participant" => $statements['participant'],
                    "exhibition_list" => $statements['exhibition_list']
                ], true);
            //}
            if ($obj['projects']) {
                $project = $obj['projects'];
                foreach ($project as $key => $val) {
                    $id_project = $this->db->insert("projects",
                        [
                            "id_statement" => $id_statement,
                            "title_ukr" => $val['title_ukr'],
                            "title_eng" => $val['title_eng'],
                            "title_long" => $val['title_long'],
                            "type" => $val['type'],
                            "description_ukr" => $val['description_ukr'],
                            "description_eng" => $val['description_eng'],
                            "material" => $val['material'],
                            "sizes" => $val['sizes'],
                            'recomendation' => $val['recomendation'],
                            "owner" => $val['owner'],
                        ], true);
                    if ($val['photos']) {
                        foreach ($val['photos'] as $k => $v) {
                            $this->db->insert("project_photos",
                                [
                                    "id_project" => $id_project,
                                    "src" => $v['src']
                                ]);
                        }
                    }
                    $this->result[] = $id_project;
                }
            }
        }

    }

    public function post_rating() {
        if (!self::trueJury())
            return false;
        if ($_GET['id_project']) {
            $this->result = $this->db->insert("rating",
                [
                    "id_project" => $_GET['id_project'],
                    'id_jury' => $_COOKIE['id']
                ], true
            );
        }
    }

    public function post_addAdmin() {
        $this->db->insert("admin_login", ['login' => 'admin', 'pass' => md5("qwerty123")]);
    }

    public function post_project() {
        /*$_GET['json'] = '{
    "id_user": "8",
    "title_eng": "Mycats",
    "description_eng": "cats",
    "photos": [
        "images(1).jpeg",
        "images.jpeg"
    ]
}';*/ 
        $_GET = json_decode($_GET['json'], true);
        if ($_GET['id_user']) {
            $id = $_GET['id_user'];
            $column = "id_user";
        } else {
            $id = $_GET['id_group'];
            $column = "id_group";
        }
        $id_statement = $this->db->select("statements", "id_statement", [$column => $id]);
        $val = $_GET;
        $id_project = $this->db->insert("projects",
            [
                "id_statement" => $id_statement,
                "title_ukr" => $val['title_ukr'],
                "title_eng" => $val['title_eng'],
                "title_long" => $val['title_long'],
                "type" => $val['type'],
                "description_ukr" => $val['description_ukr'],
                "description_eng" => $val['description_eng'],
                "material" => $val['material'],
                "sizes" => $val['sizes'],
                'recomendation' => $val['recomendation'],
                "owner" => $val['owner'],
            ], true);
        if ($val['photos']) {
            foreach ($val['photos'] as $k => $v) {
                $this->db->insert("project_photos",
                    [
                        "id_project" => $id_project,
                        "src" => $v
                    ]);
            }
        }
        $this->result = $id_project;
    }

    public function put_settings()
    {
        self::trueAdmin();
        $array = [
            "rating_visibility" => $_GET['ratingVisibility']
        ];
        $json = json_encode($array);
        file_put_contents('settings.json', $json);
        $this->result = true;
    }

    public function put_jury() {
        self::trueAdmin();
        $this->db->update("jury",
            [
                'fio' => $_GET['fio'],
                'bio' => $_GET['bio'],
                'login' => $_GET['login'],
                'pass' => md5($_GET['pass']),
                'photo' => $_GET['photo'],
            ], ["id_jury" => $_GET['id_jury']]);

    }


    public function put_user() {
        $this->db->update("users",
            [
                "fio_ukr" => $_GET['fio_ukr'],
                'fio_eng' => $_GET['fio_eng'],
                'birthday' => $_GET['birthday'],
                'education' => $_GET['education'],
                'country' => $_GET['country'],
                'region' => $_GET['region'],
                'town' => $_GET['town'],
                'address' => $_GET['address'],
                'phone' => $_GET['phone'],
                'passport_seria' => $_GET['passport_seria'],
                'passport_number' => $_GET['passport_number'],
                'passport_who' => $_GET['passport_who'],
                'passport_when' => $_GET['passport_when'],
            ], ['id' => $_GET['id_user']]);
        $this->db->update("statements",
            [
                "phone" => $_GET['phone'],
                'photo' => $_GET['photo'],
                'email' => $_GET['email'],
                'bio' => $_GET['bio'],
                'participant' => $_GET['participant'],
                'exhibition_list' => $_GET['exhibition_list'],
            ], ['id_user' => $_GET['id_user']]);
    }

    public function put_project() {
        $val = json_decode($_GET['json'], true);
        //$val = json_decode('{"id_project":"36","id_user":"8","title_eng":"My cats","description_eng":"cats, cats ...123","photos":["cat2.jpg","cat.jpeg"]}', true);
        $this->db->update("projects",
            [
                "title_ukr" => $val['title_ukr'],
                "title_eng" => $val['title_eng'],
                "title_long" => $val['title_long'],
                "type" => $val['type'],
                "description_ukr" => $val['description_ukr'],
                "description_eng" => $val['description_eng'],
                "material" => $val['material'],
                "sizes" => $val['sizes'],
                'recomendation' => $val['recomendation'],
                "owner" => $val['owner'],
            ], ["id_project" => $val['id_project']]);
        $this->result = true;
        if ($val['photos']) {
            $this->db->delete("project_photos",["id_project" => $val['id_project']]);
            foreach ($val['photos'] as $k => $v) {
                //print_r ($v);
                $this->db->insert("project_photos",
                    [
                        "id_project" => $val['id_project'],
                        "src" => $v
                    ]);
            }
        }
    }

    public function put_setRepeat()
    {
        $id_project = $_GET['id_project'];
        $array = explode(",", $id_project);
        if ($array[1]) {
            foreach ($array as $key => $value) {
                $this->db->update("rating", ["repeat_vote" => 1], ['id_project' => $value]);
            }
        }
        else {
            $this->db->update("rating", ["repeat_vote" => 1], ['id_project' => $id_project]);
        }
    }

    public function put_deleteRepeat()
    {
        $id_project = $_GET['id_project'];
        $id_jury = $_GET['id_jury'];
        $this->db->update("rating", ["repeat_vote" => 0], ['id_project' => $id_project, "id_jury" => $id_jury]);
    }



    /*public function put_repeatRate()
    {
        $id_project = $_GET['id_project'];
        $jury = $this->db->send_query("SELECT * FROM `rating` LEFT JOIN `jury` on `jury`.id_jury = `rating`.id_jury");
        $this->db->update("rating", ["repeat_vote" => 1], ['id_project' => $id_project]);
    }

    public function put_newRating()
    {
        $id_project_minus = $_GET['id_project_minus'];
        $id_project_plus = $_GET['id_project_plus'];
        $id_jury = $_GET['id_jury'];
        $this->db->delete("rating", ['id_project' => $id_project_minus]);
        $this->db->update("rating", ['repeat_vote' => 0], ['id_project' => $id_project_plus]);
    }*/


    public function delete_project() {
        $id = $_GET['id_project'];
        $this->db->delete("projects", ['id_project' => $id]);
        $this->result = true;
    }

    public function delete_jury() {
        $id = $_GET['id_jury'];
        $this->db->delete("jury", ['id_jury' => $id]);
        $this->result = true;
    }

    public function delete_rate() {
        $id_project = $_GET['id_project'];
        $this->db->delete("rating", ['id_project' => $id_project, "id_jury" => $_GET['id']]);
        $this->result = true;
    }

    public function delete_user() {
        $this->db->delete("users", ["id_user" => $_GET['id_user']]);
        $this->result = true;
    }

    public static function trueAdmin() {
        return true;
    }

    public static function trueJury() {
        if ($_COOKIE['id'] && md5("balon" . $_COOKIE['id']) == $_COOKIE['token']) {
            return true;
        } else {
            return false;
        }
    }

    function __call($methodname, $args) {
        $args = $args[0];
        $methodname = $methodname . "_" . $args[0];
        if (method_exists($this, $methodname)) {
            $this->$methodname($args);
        } else {
            $this->result = "method doesn't exists";
        }
    }


}