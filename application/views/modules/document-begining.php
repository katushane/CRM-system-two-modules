<?php global $router ; global $lang;?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title><?php echo $lang[$router -> currentPage]['title'].Config::TITLE_POSTFIX?></title>

        <link href="<?php echo Config::BASE_URL;?>assets/img/favicon.png" rel="icon" type="image/png">
    </head>
    <body class="with-side-menu">
    	<div class="application application_menu_full">