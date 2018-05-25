<?php
if (isset($_POST['nameperson'])) {
    $msg = 'Имя: '.$_POST['nameperson'].PHP_EOL ;
};

if (isset($_POST['phone'])) {
    $msg .= 'Телефон: '.$_POST['phone'].PHP_EOL;
};

if (isset($_POST['email'])) {
    $msg .= 'Email: '.$_POST['email'].PHP_EOL ;
};

if (isset($_POST['address'])) {
    $msg .= 'Адрес: '.$_POST['address'].PHP_EOL ;
};

if (isset($_POST['title'])) {
    for(  $i = 0; $i < count($_POST['title']); $i++ ) {
        $msg .= 'Товар: '.$_POST['title'][$i]. ', цвет: '.$_POST['color'][$i]. ', количество: '.$_POST['count'][$i]. ', цена: '.$_POST['price'][$i].PHP_EOL ;
    }
}


mail("paradoxnumber7@gmail.com", "Сообщение от клиента LoftBox", $msg);

print_r($_POST);
