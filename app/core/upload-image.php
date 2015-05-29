<?php


/*function resizeImage($tmp_name, $file_name, $size_image) {
    $end = explode(".", $tmp_name);
    $end = end($end);
    if (file_exists($tmp_name)) {
        if ($size_image[0] || $size_image[1]) {
            if ($size_image[0] == 100) {
                $a = 0;
                while ($a < 2) {
                    if ($a == 0) {
                        $size_image = [1000];
                    } elseif ($a == 1) {
                        $size_image = [192];
                        $file_name = preg_replace("/(.*)\.([a-z]+)$/", "$1_small.$2", $file_name);
                        $path = preg_replace("/(.*)\.([a-z]+)$/", "$1_small.$2", $path);
                    }
                    $a++;
                    $filename = $tmp_name;
                    $size = getimagesize($filename);
                    $size_w = $size[0]; // ширина оригіналу
                    $size_h = $size[1]; // висота оригіналу
                    $w = $size_image[0]; // потрібна ширина
                    $h = $size_image[1]; // потрібна висота
                    if ($size_w > $size_h) {
                        $h = $size_image[0];
                        $w = round($h * $size_w / $size_h);
                    } else {
                        $w = $size_image[0];
                        $h = round($w * $size_h / $size_w);
                    }
                    $type = $size['mime'];
                    // щоб виликі картинки норм завантажувались
                    if (($size[0] > $w) or ($size[1] > $h)) {
                        exec('mogrify -resize ' . $w . 'x' . $h . ' ' . $filename);
                        $size = getimagesize($filename);
                        $size_w = $w; // ширина оригіналу
                        $size_h = $h; // висота оригіналу
                    }
                    switch ($type) {
                        case 'image/png':
                            $image = imagecreatefrompng($filename);
                            break;
                        case 'image/jpeg':
                            $image = imagecreatefromjpeg($filename);
                            break;
                        case 'image/gif':
                            $image = imagecreatefromgif($filename);
                            break;
                    }
                    $new_image = imagecreatetruecolor($w, $h);
                    imagecopyresampled($new_image, $image, 0, 0, 0, 0, $w, $h, $size_w, $size_h);
                    if ($path) {
                        imagejpeg($new_image, $path, 75);
                    } else {
                        imagejpeg($new_image, $file_name, 75);
                    }
                    imagedestroy($new_image);
                }
            } else {
                $filename = $tmp_name;
                $size = getimagesize($filename);
                $size_w = $size[0]; // ширина оригіналу
                $size_h = $size[1]; // висота оригіналу
                $w = $size_image[0]; // потрібна ширина
                $h = $size_image[1]; // потрібна висота
                if (!$h) {
                    $h = round($w * $size_h / $size_w);
                }
                $type = $size['mime'];
                // щоб виликі картинки норм завантажувались
                if (($size[0] > $w) or ($size[1] > $h)) {
                    exec('mogrify -resize ' . $w . 'x' . $h . ' ' . $filename);
                    $size = getimagesize($filename);
                    $size_w = $w; // ширина оригіналу
                    $size_h = $h; // висота оригіналу
                }
                switch ($type) {
                    case 'image/png':
                        $image = imagecreatefrompng($filename);
                        break;
                    case 'image/jpeg':
                        $image = imagecreatefromjpeg($filename);
                        break;
                    case 'image/gif':
                        $image = imagecreatefromgif($filename);
                        break;
                }
                $new_image = imagecreatetruecolor($w, $h);
                imagecopyresampled($new_image, $image, 0, 0, 0, 0, $w, $h, $size_w, $size_h);
                if ($path) {
                    imagejpeg($new_image, $path, 75);
                } else {
                    imagejpeg($new_image, $file_name, 75);
                }
                imagedestroy($new_image);
                if (file_exists($tmp_name) && !$unlinked) {
                    unlink($tmp_name);
                }
            }
        } else {
            copy($tmp_name, $file_name);
        }
    }
}*/


/*//$filename = $_POST['fileName'];//$_FILES['file']['name'];
$filename = $_FILES['file']['name'];
  $destination = '../images/img/' . $filename;
   // resizeImage($_FILES['file']['tmp_name'], $destination, [1280]);
  move_uploaded_file( $_FILES['file']['tmp_name'] , $destination );*/

//$filename = $_FILES['file']['name'];
$filename = $_POST['fileName'];
$destination = '../images/img/' . $filename;
move_uploaded_file( $_FILES['file']['tmp_name'] , $destination );




?>