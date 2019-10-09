<?php
  global $lang;
  $pageLang = $lang['clients'];
   $filterLang = $lang['filters'];

  System::addCss('modules', 'widgets'); 
  System::addCss('modules', 'services');
  System::addCss('pages', 'services');
  System::addCss('modules', 'statuses'); 
  System::addCss('modules', 'simple_category');
  System::addCss('modules', 'search');
  System::addCss('modules', 'master_item');
?>

<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/lib/fullcalendar/fullcalendar.min.css">

<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/separate/vendor/select2.min.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/separate/vendor/select2.css">

<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/separate/pages/calendar.min.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/separate/pages/contacts.min.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/lib/jquery-minicolors/jquery.minicolors.css">

<div class="page-content">
  <section class="clients">
          <div class="services-content services__item" id="hacker-list">
            <div class="services-bar">
              <div class="services-bar__search">
                <span class="services-bar__search__icon"><i class="fas fa-search" style="color: #555555;"></i></span>
                <input placeholder="Поиск клиента..." name="" class="search services-bar__search__input services-bar__input" style="margin: 0 0 0 10px;" />
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
                    <a class="sort" data-sort="services-list__title__span">Имя, фамилия</a>
                    <a class="sort" data-sort="services-list__cost__coin">Телефон</a>
                    <a class="sort" data-sort="services-list__visits-profit-count-visits">Категория</a>
                     <a class="sort" data-sort="services-list__visits-profit-summ">Прибыль</a>
                    <a class="sort" data-sort="services-list__discount__span">Скидка</a>   
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
                    <div class="services-list__title">Фамилия, имя</div>
                    <div class="service-full-title">
                      <div class="service-full-cost">Телефон</div>
                      <div class="services-list__category">Категория</div>
                    </div>
                  </div>
                  <div class="services-list__visits-profit">Прибыль</div>
                  <div class="services-list__discount">Текущая скидка</div>                  
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
              <div class="services-filter-category filter__content__list" data-id="filter-category">
                <div class="services-filter-category__title">
                  <span>Категории клиентов</span>
                  <i class="icon-edit edit-category"></i>
                </div>
                <ul class="colors-guide-list forcategories">
                  <div data-id="hidden-categories" style="display:none;"></div>
                </ul>
              </div>
              <div class="services-filter-sex filter__content__bootstrap-select">
                   <select class="bootstrap-select bootstrap-select-arrow" size="1" multiple title="<?php echo $filterLang['ChangeSex'];?>" name="filter-sex" data-id="filter-sex"></select>
                <span style="width: 20%" class="canselSex hidden"><i class="font-icon font-icon-close-2" style="color:#dbe4ea"></i></span>
              </div>
              <div class="services-filter-age filter__content__slider forAge">
                <header ><?php echo $filterLang['Age'];?></header>
                <div class="form-group range-slider-simple slider-filter">
                  <input type="text" data-id="range-slider-age" name="range-slider-age" value="" />
                </div>
              </div>
              <div class="services-filter-discount filter__content__slider fordiscount">
                <header ><?php echo $filterLang['currentDiscount'];?></header>
                <div class="form-group range-slider-simple slider-filter">
                  <input type="text" data-id="range-slider-discount" name="range-slider-discount" value="" />
                </div>
              </div>
             <div class="services-filter-buttons filter__content__buttons">
                <div class="services-filter-show forshow">
                  <button type="button" class="btn btn-rounded btn-inline btn-info"><?php echo $filterLang['show'];?></button>
              </div>
                <div class="services-filter-cancel">
                    <button type="button" class="btn btn-rounded btn-inline btn-danger-outline"><?php echo $filterLang['reset'];?></button>
                </div>
              </div>
            </div>
            <div class="services-filter__content services-filter-analytic active">
              <div class="services-filter-dates filter__content__dates">
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
              <div class="services-filter-users filter__content__bootstrap-select">
                <select class="bootstrap-select bootstrap-select-arrow" size="1" multiple title="Мастера" name="filter-users" data-id="filter-users"></select>
                <span style="width: 20%" class="canselUser hidden"><i class="font-icon font-icon-close-2" style="color:#dbe4ea"></i></span>
              </div>
              <div class="services-filter-services filter__content__bootstrap-select">
                <select class="bootstrap-select bootstrap-select-arrow" multiple title="Услуги" name="filter-services" data-id="filter-services"></select>
                <span style="width: 20%" class="canselService hidden"><i class="font-icon font-icon-close-2" style="color:#dbe4ea"></i></span>
              </div>
              
              <div class="services-filter-visits filter__content__slider forVisit">
                <header><?php echo $filterLang['Visit'];?></header>
                <div class="form-group range-slider-simple slider-filter">
                  <input type="text" data-id="range-slider-visits" name="range-slider-visits" value="" />
                </div>
              </div>
              <div class="services-filter-profit filter__content__slider forTotal">
                <header><?php echo $filterLang['Profit'];?></header>
                <div class="form-group range-slider-simple slider-filter">
                  <input type="text" data-id="range-slider-profit" name="range-slider-profit" value="" />
                </div>
              </div>
              <div class="services-filter-buttons filter__content__buttons">
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

<script src="<?php echo Config::BASE_URL; ?>/assets/js/lib/daterangepicker/daterangepicker.js"></script>
<script src="<?php echo Config::BASE_URL; ?>/assets/js/lib/bootstrap-select/bootstrap-select.min.js"></script>
<script src="<?php echo Config::BASE_URL; ?>/assets/js/lib/jquery-minicolors/jquery.minicolors.min.js"></script>
<script src="<?php echo Config::BASE_URL; ?>/assets/js/lib/ion-range-slider/ion.rangeSlider.js"></script>
<script src="<?php echo Config::BASE_URL; ?>/assets/js/lib/select2/select2.js"></script>
<script src="<?php echo Config::BASE_URL; ?>/assets/js/lib/select2/select2.min.js"></script>


<script type="text/javascript">

$(document).ready(function() {
  initializeComponents();  
  selectTags();
})

function initializeComponents(){

  $('[data-id = range-slider-visits]').ionRangeSlider({
    type: 'double',
    hide_min_max: true,
    input_values_separator: "&#8212;",
  });

  $('[data-id = range-slider-profit]').ionRangeSlider({
    type: 'double',
    hide_min_max: true,
    input_values_separator: "&#8212;",
    min: 0,
    max: 10000
    });

  $('[data-id = range-slider-discount]').ionRangeSlider({
    type: 'double',
    hide_min_max: true,
    input_values_separator: "&#8212;",
    min: 0,
    max: 100,
    postfix: '%'
    });

  $('[data-id = range-slider-age]').ionRangeSlider({
    type: 'integer',
    hide_min_max: true,
    input_values_separator: "&#8212;",
    min: 0,
    max: 10000
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
    })
  
}




function selectTags(){

  $('[data-id=filter-users]').change(function(){
   // addTag('filter-masters', $(this).val());
  })
  $('[data-id=filter-clients]').change(function(){
   // addTag('tag-services', $(this).val());
  })  

}


</script>

<?php 
      System::addJs('pages', 'clients');
      System::addJs('modules', 'block-control');
      System::addJs('modules', 'tplinner');
      System::addJs('modules', 'notes');
      System::addJs('modules', 'notes-inner');
      System::addJs('modules', 'notices');
      System::addJs('modules', 'notices-inner');
      System::addJs('modules', 'review-all');
      System::addJs('modules', 'review-all-inner');
      System::addJs('modules', 'client-info');
      System::addJs('modules', 'filter');     

      
  echo '<script src="'.Config::BASE_URL.'assets\js\lib\jqueryui\jquery-ui.js"></script>'; 
  echo '<script src="'.Config::BASE_URL.'assets\js\lib\picker\picker.js"></script>'; ?>
