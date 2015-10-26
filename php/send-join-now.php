<?php

// Please put your PHP code here
//
// You can use entered name variable as $_POST['join_now_name'], e-mail variable as $_POST['join_now_email'], message variable as $message

// Please insert here your email address:
$myMail  = 'PUT_YOUR_EMAIL_ADDRESS_HERE';

$to      = $myMail;
$subject = 'Message from '.$_POST['join_now_name'];
$message = 'Your message goes here.';
$headers = 'From: '.$_POST['join_now_email']. "\r\n" .
    'Reply-To: '.$_POST['join_now_email']. "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);

?>