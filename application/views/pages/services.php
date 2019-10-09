<?php 

  global $lang;
  $pageLang = $lang['services'];
  $filterLang = $lang['filters'];

  System::addCss('modules', 'widgets'); 
  System::addCss('modules', 'services');
  System::addCss('pages', 'services');
  System::addCss('modules', 'statuses'); 
  System::addCss('modules', 'simple_category');
  System::addCss('modules', 'search');
  System::addCss('modules', 'master_item');
  System::addCss('modules', 'selectable-item');
?>

<link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet">

<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/lib/jqueryui/jquery-ui.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/lib/picker/picker.css">  

<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/lib/fullcalendar/fullcalendar.min.css">

<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/separate/vendor/select2.min.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/separate/vendor/select2.css">

<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/separate/pages/contacts.min.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/lib/jquery-minicolors/jquery.minicolors.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/separate/vendor/jquery.minicolors.min.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/lib/ion-range-slider/ion.rangeSlider.skinHTML5.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/separate/pages/calendar.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/separate/pages/calendar.min.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/lib/ion-range-slider/ion.rangeSlider.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/lib/daterangepicker/daterangepicker.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/lib/bootstrap/bootstrap.min.css">

<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/separate/vendor/tags_editor.min.css">

<div class="page-content"> 
   <section class="services">
          <div class="services-content services__item" id="services-list">
            <div class="services-bar">
              <div class="services-bar__search">
                <span class="services-bar__search__icon"><i class="fas fa-search" style="color: #555555;"></i></span>
                <input placeholder="Поиск услуги..." name="" class="search services-bar__search__input services-bar__input" style="margin: 0 0 0 10px;" />
              </div>
              <div class="services-bar__filter">
                <img src="<?php echo Config::BASE_URL; ?>/assets/img/filter.svg">
              </div>
              <div class="services-bar__sort">
                <div class="services-bar__sort-dropdown">
                  <i class="fas fa-exchange-alt" style="transform: rotate(90deg); color: #AC74BA;"></i>
                  <i class="fas fa-long-arrow-alt-up hidden" style="color: #AC74BA;     margin-top: 5px;"></i>              
                  <i class="arrow-down fas fa-long-arrow-alt-down hidden" style="color: #AC74BA; margin-top: 7px;"></i>
                  <button class="arrow-up services-bar__sort-dropdown__button"><span class="services-bar__input">Сортировка</span></button>
                  <div class="services-bar__sort-dropdown__content">
                    <a class="sort" data-sort="services-list__title__span">Название</a>
                    <a class="sort" data-sort="services-list__cost__coin">Цена</a>
                    <a class="sort" data-sort="services-list__discount__span">Скидка</a>
                    <a class="sort" data-sort="services-list__visits-profit-count-visits">Посещения</a>
                    <a class="sort" data-sort="services-list__visits-profit-summ">Прибыль</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="services-list">
              <table id="table"
                                       class="table table-striped"
                                       data-toolbar="#toolbar"
                                       data-search="true"
                                       data-show-refresh="true"
                                       data-show-toggle="true"
                                       data-show-columns="true"
                                       data-show-export="true"                                     
                                       data-minimum-count-columns="2"
                                       data-show-pagination-switch="true"
                                       data-pagination="true"
                                       data-id-field="id"
                                       data-page-list="[10, 25, 50, 100, ALL]"
                                       data-show-footer="false"
                                       data-response-handler="responseHandler">
              </table>
                <div class="services-list__header">
                  <div class="services-list__block-of-title-cost">
                    <div class="services-list__title">Наименование</div>
                    <div class="service-full-title">
                      <div class="services-list__category">Категория</div>
                      <div class="service-full-cost">Стоимость</div>
                    </div>
                  </div>
                  <div class="services-list__discount">Текущая скидка</div>
                  <div class="services-list__visits-profit">Посещения / Прибыль</div>
                  <div class="services-list__masters">Мастера</div>
                </div>
                <div id="listPagination">
                 
                <ul class="list"></ul>
                <ul class="pagination services-list__pagination"></ul>
                </div>
            </div>
          </div>
          <div class="services-filter-analyst">
            <div class="services-filter-analyst__buttons">
              <div class="services-filter-analyst__buttons__elem">
              <img class="services-filter-analyst__buttons__img" src="<?php echo Config::BASE_URL; ?>assets/img/filter.svg">
              <u style="text-decoration: none" class="services-filter-analyst__buttons__title">Фильтр</u></div>
              <div class="services-filter-analyst__buttons__elem active">
              <img class="services-filter-analyst__buttons__img" src="<?php echo Config::BASE_URL; ?>assets/img/analyst.svg">
              <u style="text-decoration: none" class="services-filter-analyst__buttons__title">Аналитика</u></div>
            </div>
            <div class="services-filter__content services-filter-basic">
              <div class="services-filter-category" data-id="filter-category">
                <ul class="colors-guide-list forcategories">
                  <div data-id="hidden-categories" style="display:none;"></div>
                </ul>
              </div>
              <div class="services-filter-users filter__content__bootstrap-select">
                   <select class="bootstrap-select bootstrap-select-arrow" size="1" multiple title="Мастера" name="filter-users" data-id="filter-users"></select>
                <span style="width: 20%" class="canselUser hidden"><i class="font-icon font-icon-close-2" style="color:#dbe4ea"></i></span>
              </div>
              <div class="services-filter-discount fordiscount filter__content__bootstrap-select">
                <header ><?php echo $filterLang['currentDiscount'];?></header>
                <div class="form-group range-slider-simple slider-filter">
                  <input type="text" data-id="range-slider-discount" name="range-slider-discount" value="" />
                </div>
              </div>
             <div class="services-filter-buttons">
                <div class="services-filter-show forshow">
                  <button type="button" class="btn btn-rounded btn-inline btn-info"><?php echo $filterLang['show'];?></button>
              </div>
                <div class="services-filter-cancel">
                    <button type="button" class="btn btn-rounded btn-inline btn-danger-outline"><?php echo $filterLang['reset'];?></button>
                </div>
              </div>
            </div>
            <div class="services-filter__content services-filter-analytic active">
              <div class="services-filter-category" data-id="filter-category">
                <ul class="colors-guide-list forcategories">
                  <div data-id="hidden-categories" style="display:none;"></div>
                </ul>
              </div>
              <div class="services-filter-users filter__content__bootstrap-select">
                   <select class="bootstrap-select bootstrap-select-arrow" size="1" multiple title="Мастера" name="filter-users" data-id="filter-users"></select>
                <span style="width: 20%" class="canselUser hidden"><i class="font-icon font-icon-close-2" style="color:#dbe4ea"></i></span>
              </div>
              <div class="services-filter-clients filter__content__bootstrap-select">
                <select class="bootstrap-select bootstrap-select-arrow" multiple title="Клиенты" name="filter-clients" data-id="filter-clients"></select>
                <span style="width: 20%" class="canselClient hidden"><i class="font-icon font-icon-close-2" style="color:#dbe4ea"></i></span>
              </div>
              <div class="services-filter-dates  filter__content__dates">
                <section class="forDates" style="display: flex;">
                            <div class="form-group" >
                              <div class="input-group date">
                                <input data-id="filter-range-start" id="data-start" type="text" class="form-control form-control-rounded" data-date-format="Y-m-d" style="text-align: center; padding: 7px 7px;" >
                              </div>
                            </div>
                            <div style="padding: 5px 2px">
                              &#8212;
                            </div>
                            <div class="form-group">
                              <div class="input-group date">
                                <input data-id="filter-range-end" id="data-end" type="text" class="form-control form-control-rounded" data-date-format="Y-m-d" style="text-align: center; padding: 7px 7px;">
                              </div>
                          </div>
                        </section>
              </div>
              <div class="services-filter-visits filter__content__slider forVisit">
                <header><?php echo $filterLang['Visit'];?></header>
                <div class="form-group range-slider-simple slider-filter">
                  <input type="text" data-id="range-slider-visits" name="range-slider-visits" value="" />
                </div>
              </div>
              <div class="services-filter-profit filter__content__slider  forTotal">
                <header><?php echo $filterLang['Profit'];?></header>
                <div class="form-group range-slider-simple slider-filter">
                  <input type="text" data-id="range-slider-profit" name="range-slider-profit" value="" />
                </div>
              </div>
              <div class="services-filter-buttons">
                <div class="services-filter-show forshow">
                  <button type="button" class="btn btn-rounded btn-inline btn-info"><?php echo $filterLang['show'];?></button>
              </div>
                <div class="services-filter-cancel">
                    <button type="button" class="btn btn-rounded btn-inline btn-danger-outline"><?php echo $filterLang['reset'];?></button>
              </div>
              </div>
            </div>
          </div>
          
   </section>

</div>


<?php System::addJs('pages', 'services'); 
      System::addJs('modules', 'block-control');
      System::addJs('modules', 'tplinner');
      System::addJs('modules', 'simple-category');
      System::addJs('modules', 'services_masters_selected');
      System::addJs('modules', 'services_masters_unselected');
      System::addJs('modules', 'services_work');
      System::addJs('modules', 'search');
      System::addJs('modules', 'services_master_edit');
      
      System::addJs('modules', 'filter');
      ?> 
      
<?php echo '<script src="'.Config::BASE_URL.'assets\js\lib\jqueryui\jquery-ui.js"></script>'; ?>
<?php echo '<script src="'.Config::BASE_URL.'assets\js\lib\picker\picker.js"></script>'; ?>
<script src="<?php echo Config::BASE_URL; ?>/assets/js/lib/daterangepicker/daterangepicker.js"></script>
<script src="<?php echo Config::BASE_URL; ?>/assets/js/lib/ion-range-slider/ion.rangeSlider.js"></script>
<script src="<?php echo Config::BASE_URL; ?>/assets/js/lib/select2/select2.js"></script>
<script src="<?php echo Config::BASE_URL; ?>/assets/js/lib/select2/select2.min.js"></script>

<script type="text/javascript">

  $(document).ready(function() {
    let normalWidth = $('.services-filter-users')[1].offsetWidth;
    // console.log(normalWidth);
    initializeComponents(normalWidth);
    var size = 20,
      newsContent= document.querySelectorAll('.services-list__text');
      newsContent.forEach((elem) => {
        var newsText = elem.innerText;
        if(newsText.length > size) {
          elem.innerText = newsText.slice(0,size) + '...';
        };
      });
  })
  function initializeComponents(normalWidth){

    $('[data-id = range-slider-general]').ionRangeSlider({
      type: 'double',
      hide_min_max: true,
      input_values_separator: "&#8212;",
    });

    $('[data-id = range-slider-discount]').ionRangeSlider({
      type: 'double',
      hide_min_max: true,
      input_values_separator: "&#8212;",
      min: 0,
      max: 100,
      postfix: '%'
      });

    $('[data-id = range-slider-visits]').ionRangeSlider({
      type: 'double',
      hide_min_max: true,
      input_values_separator: "&#8212;",
      min: 0,
      max: 100
      });

    $('[data-id = range-slider-profit]').ionRangeSlider({
      type: 'double',
      hide_min_max: true,
      input_values_separator: "&#8212;",
      min: 0,
      max: 100,
      postfix: 'руб'
      });

    $('[data-id=filter-users]').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
      this.parentElement.firstElementChild.style.width=normalWidth+'px';
    });

    $('[data-id=filter-clients]').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
      this.parentElement.firstElementChild.style.width=normalWidth+'px';
    });

    $(document).ready(function() {
       $(".js-example-basic-multiple").select2({
        tags:true
       });
    });

    $('[data-id=category-arrow]').click(function(){
        $('[data-id=hidden-categories]').toggle('200');
        $('[data-id=category-arrow]').children().toggleClass('fa-chevron-down');
        $('[data-id=category-arrow]').children().toggleClass('fa-chevron-up');
      });
  }
</script>


	
	
    