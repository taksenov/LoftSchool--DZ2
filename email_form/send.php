<?php

    define("CONTACT_FORM", 'taksenov@gmail.com');

    function ValidateEmail($value){
        $regex = '/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i';

        if($value == '') {
            return false;
        } else {
            $string = preg_replace($regex, '', $value);
        }

        return empty($string) ? true : false;
    }

    $post = (!empty($_POST)) ? true : false;

    if($post){

        $email = stripslashes($_POST['email']);

        $htmlcode = stripslashes($_POST['htmlcode']) ;
        $htmlcode = str_replace('<', '&lt;', $htmlcode);
        $htmlcode = str_replace('>', '&gt;', $htmlcode);
        $htmlcode = preg_replace("/(\n)/", "<br/>", $htmlcode);

        $csscode = stripslashes($_POST['csscode']) ;
        $csscode = preg_replace("/(\n)/", "<br/>", $csscode);

        $subject = 'Код кнопки. CSS Button Generator';
        $error = '';
        $message = '
            <html>
                    <head>
                            <title>Заявка</title>
                    </head>
                    <body>
                            <p>
                                Вы получили это письмо,
                                потому что воспользовались нашим сервисом:
                                CSS Button Generator.
                                <br>
                                С удовольствием, используйте этот код на вашем сайте.
                            </p>
                            <p>
                                <strong>HTML-код :</strong> <br>
                                '.$htmlcode.'
                            </p>
                            <p>
                                <strong>CSS-код :</strong> <br>
                                '.$csscode.'
                            </p>

                    </body>
            </html>';

        if (!ValidateEmail($email)){
            $error = 'Email введен неправильно!';
        }

        if(!$error){
            $mail = mail(
//            CONTACT_FORM,
             $email,
             $subject, $message,
                 "From: Admin <root@ip34.ru>\r\n"
                ."Reply-To: ".$email."\r\n"
                ."Content-type: text/html; charset=utf-8 \r\n"
                ."X-Mailer: PHP/" . phpversion());

            if($mail){
                echo 'OK';
            }
        }else{
            echo '<div class="bg-danger">'.$error.'</div>';
        }

    }
?>
