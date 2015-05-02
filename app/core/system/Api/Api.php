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

    public function get_allJury() {
        $this->result = $this->db->select("jury");
    }

    public function get_allUsers() {
        $this->result = $this->db->select('users');
    }

    public function get_projects() {
        $sql = "SELECT * FROM `projects` as p LEFT JOIN `statements` as s ON p.`id_statement` = s.`id_statement`";
        $this->result = $this->db->send_query($sql);
    }

    public function get_project() {
        $id = $_GET['id_project'];
        $sql = "SELECT * FROM `projects` as p
          LEFT JOIN `statements` as s ON p.`id_statement` = s.`id_statement`
          WHERE p.id_project = $id";
        $statement = $this->db->send_query($sql)[0];
        if ($statement) {
            if ($statement['id_user']) {
                $user = $this->db->select("users", false, ['id_user' => $statement['id_user']])[0];
                $this->result = ['statement' => $statement, 'user' => $user];
            } elseif ($statement['id_group']) {
                $group = $this->db->select("group", false, ['id' => $statement['id_group']])[0];
                $users[0] = $this->db->select("users", false, ['id_group' => $statement['id_group']])[0];
                $this->result = [
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
        $sql = "SELECT * FROM `projects` as p LEFT JOIN `statements` as s ON p.`id_statement` = s.`id_statement` WHERE s.";
        if ($group_id['id_group'])
            $sql .= "`id_group`"; else $sql .= "`id_user`";
        $sql .= " = ";
        if ($group_id['id_group'])
            $sql .= $group_id['id_group']; else $sql .= $group_id['id_user'];
        $this->result = $this->db->send_query($sql);
        //$this->result = $group_id;
    }

    public function get_myProject() {
        $my_id = $_COOKIE['id'];
        //echo $my_id;
        //$my_id = 1;
        $sql = "SELECT * FROM `projects` as p
          LEFT JOIN `statements` as s ON p.`id_statement` = s.id_statement
          LEFT JOIN `rating` as r ON r.id_project = p.id_project
          WHERE r.id_jury = $my_id";
        echo $sql;
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
        $obj = json_decode($_GET['object']);
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
                        "src" => $v['src']
                    ]);
            }
        }
        $this->result = $id_project;
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

    public function put_project() {
        $val = $_GET;
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
            ], ["id_project" => $_GET['id_project']]);
        $this->result = true;
        /*if ($val['photos']) {
            foreach ($val['photos'] as $k => $v) {
                $this->db->insert("project_photos",
                    [
                        "id_project" => $_GET['id_project'],
                        "src" => $v['src']
                    ]);
            }
        }*/
    }


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
        $this->db->delete("rating", ['id_project' => $id_project, "id_jury" => $_COOKIE['id']]);
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