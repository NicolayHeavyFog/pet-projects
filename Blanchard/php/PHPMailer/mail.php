<?php

require_once('PHPMailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  			        // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'testForSummary@gmail.com'; // Ваш логин от почты с которой будут отправляться письма
// testForSummary@gmail.com
$mail->Password = 'xadsaz-Tigwur-8buzxe'; // Ваш пароль от почты с которой будут отправляться письма
// xadsaz-Tigwur-8buzxe

$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('testForSummary@gmail.com', 'Художественная галерея Blanchard'); // от кого будет уходить письмо?
$mail->addAddress('test.test@yandex.ru');     // Кому будет уходить письмо
$mail->addAddress('test@yandex.ru');               // Name is optional            // Name is optional

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с тестового сайта';
$mail->Body    = 'Пользователь <b>' . $name . '</b> оставил заявку. <br> Его телефон <b>' .$phone. '</b>';
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    echo 'Ok';
}
?>
