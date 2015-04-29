<?php

namespace Balon;

class Date {


    public static function getDate() {
        $month = array(
            1 => 'Січня', 2 => 'Лютого', 3 => 'Березня', 4 => 'Квітня',
            5 => 'Травня', 6 => 'Червня', 7 => 'Липня', 8 => 'Серпня',
            9 => 'Вересня', 10 => 'Жовтня', 11 => 'Листопада', 12 => 'Грудня'
        );
        return (date('d ') . $month[(date('n'))] . date(', H:i'));
    }

    public static function getMonth($number) {
        $month = array(
            1 => 'Січня', 2 => 'Лютого', 3 => 'Березня', 4 => 'Квітня',
            5 => 'Травня', 6 => 'Червня', 7 => 'Липня', 8 => 'Серпня',
            9 => 'Вересня', 10 => 'Жовтня', 11 => 'Листопада', 12 => 'Грудня'
        );
        return $month[$number];
    }

    public static function reformatDate($val) {

        $date = new \DateTime($val);
        $day = $date->format("j");
        $month = \Balon\Date::getMonth($date->format("n"));
        $time = $date->format("H:i");
        return "$day $month, $time";
    }

}

?>