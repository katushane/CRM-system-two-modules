<?php global $router ; global $lang;?>

              <!-- Стили библиотек -->

        <!-- Font-awesome - шрифт из иконок -->
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
        <!-- <link rel="stylesheet" href="<?php echo Config::BASE_URL;?>/assets/css/lib/font-awesome/font-awesome.min.css"> -->
        <!-- Bootstrap -->
        <link rel="stylesheet" href="<?php echo Config::BASE_URL;?>/assets/css/lib/bootstrap/bootstrap.min.css">
        <!-- Bootstrap table -->
        <link rel="stylesheet" href="<?php echo Config::BASE_URL;?>assets/css/lib/bootstrap-table/bootstrap-table.min.css">
        <!-- Bootstrap select -->
        <link rel="stylesheet" href="<?php echo Config::BASE_URL;?>assets/css/separate/vendor/bootstrap-select/bootstrap-select.min.css">
        <!-- Pnotify -->
        <link rel="stylesheet" href="<?php echo Config::BASE_URL;?>assets/css/separate/vendor/pnotify.min.css">
        <!-- Jquery rating -->
        <link rel="stylesheet" href="<?php echo Config::BASE_URL;?>assets/css/lib/jquery-rating/jquery.rating.css">
        <link rel="stylesheet" href="<?php echo Config::BASE_URL;?>assets/css/lib/easy-toggle-state/switchbox.css">


        <!-- Стили star ui -->

        <?php System::addCss('general', 'main'); ?>
        <?php System::addCss('general', 'font'); ?>
        <?php System::addCss('general', 'icons'); ?>
        <?php System::addCss('general', 'fontello'); ?>
        <?php System::addCss('general', 'fontello-embedded'); ?>
   <!--      <link rel="stylesheet" type="text/css" href="<?php echo Config::BASE_URL;?>assets/css/main.css"> -->

        <!-- Наши стили -->

        <!-- Стили tpl-->
        <link rel="stylesheet" href="<?php echo Config::BASE_URL;?>assets/css/custum_css/right_menu.css">


        <!-- Основные библиотеки -->

        <!-- jquery -->
        <!-- <script src="<?php echo Config::BASE_URL;?>/assets/js/lib/jquery/jquery.min.js"></script> -->
        <script src="<?php echo Config::BASE_URL;?>/assets/js/lib/jquery/jquery-3.0.0.js"></script>
        <script src="<?php echo Config::BASE_URL;?>/assets/js/lib/jquery/jquery-migrate-3.0.1.js"></script> 
        <!-- Tether - библиотека для абсолютного позиционирования элементов-->
        <script src="<?php echo Config::BASE_URL;?>/assets/js/lib/tether/tether.min.js"></script>
        <!--bootstrap  -->
        <script src="<?php echo Config::BASE_URL;?>/assets/js/lib/bootstrap/bootstrap.min.js"></script> 

        <!-- Скрипты star-ui -->

        <?php System::addJs('general', 'plugins'); ?>
        <?php System::addJs('general', 'app'); ?>


        <!-- Наши скрипты -->

        <!-- Работа с запросами к backend api -->
        <?php System::addJs('modules', 'api-helper') ?>
        <!-- Работа с формами заполнение/очистка/сбор и т.д. -->
        <?php System::addJs('modules','data-helper') ?>

        <!-- Дополнительные библиотеки -->

        <!-- Bootstrap select - наш основной селект -->
        <script src="<?php echo Config::BASE_URL;?>assets/js/lib/bootstrap-select/bootstrap-select.min.js"></script>
        <!-- Pnotify - мелкие оповещения -->
        <script src="<?php echo Config::BASE_URL;?>assets/js/lib/pnotify/pnotify.js"></script>
        <script src="<?php echo Config::BASE_URL;?>assets/js/lib/pnotify/pnotify-init.js"></script>
        <!-- Notie - крупные оповещения -->
        <script src="<?php echo Config::BASE_URL;?>assets/js/lib/notie/notie.js"></script>
        <script src="<?php echo Config::BASE_URL;?>assets/js/lib/notie/notie-init.js"></script>
        <!-- Bootstrap таблицы -->
        <script src="<?php echo Config::BASE_URL;?>assets/js/lib/bootstrap-table/bootstrap-table.js"></script>
        <script src="<?php echo Config::BASE_URL;?>assets/js/lib/bootstrap-table/bootstrap-table-export.min.js"></script>
        <!-- Jquery caret - изменение положения курсора в input-ах и textarea-х -->
        <script src="<?php echo Config::BASE_URL;?>assets/js/lib/jquery-tag-editor/jquery.caret.min.js"></script>
        <!-- Jquery rating - рейтинг -->
        <script src="<?php echo Config::BASE_URL;?>assets/js/lib/jquery-rating/jquery.rating.min.js"></script>
        <!-- Jquery-bootstrap touchspin - input spinner-->
        <script src="<?php echo Config::BASE_URL;?>assets/js/lib/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js"></script>
        <!-- Jquery validation - валидация -->
        <script type="text/javascript" src="<?php echo Config::BASE_URL;?>/assets/js/lib/jquery-validation/jquery.validate.js"></script>
        <script type="text/javascript" src="<?php echo Config::BASE_URL;?>/assets/js/lib/jquery-validation/additional-methods.min.js"></script>
        <!-- Moment js - библиотека для работы с датами -->
        <script type="text/javascript" src="<?php echo Config::BASE_URL;?>/assets/js/lib/moment/moment-with-locales.min.js"></script>
        <!-- Jquery Mask - работа с масками ввода -->
        <script src="<?php echo Config::BASE_URL;?>assets/js/lib/input-mask/jquery.mask.min.js"></script>
        <script src="<?php echo Config::BASE_URL;?>assets/js/lib/input-mask/input-mask-init.js"></script>
        <script src="<?php echo Config::BASE_URL;?>assets/js/lib/easy-toggle-state/easy-toggle-state.js"></script>

        <!--для пагинации или сортировки хз-->
        <script src="//cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.js"></script>

        <?php System::addJs('pages', 'header');?>

        
        <header class="application__header header" data-block="application" data-block-part="header">
        <div class="header__bar header__bar_left">
            <div class="application__burg-btn" data-block="application" data-block-part="burgerBtn">
                <div class="double-burger">
                    <button class="double-burger__btn double-burger__btn_main application__burg-btn_main">
                        <i class="icon-burger"></i>
                    </button>
                    <button class="double-burger__btn double-burger__btn_sub application__burg-btn_sub">
                        <i class="icon-burger"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="header__bar header__bar_middle">Test1</div>
        <div class="header__bar header__bar_right">Test2</div>
    </header>