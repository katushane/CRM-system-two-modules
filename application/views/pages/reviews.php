<?php
  global $lang;
  $pageLang = $lang['reviews'];
  $filterLang = $lang['filters'];
?>
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/lib/fullcalendar/fullcalendar.min.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/separate/pages/calendar.min.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/separate/elements/cards.min.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/lib/bootstrap/bootstrap.min.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/modules/filter.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/pages/services.css">


    <div class="page-content">
      <section class="reviews">
         <div id="reviews">
          <div class="reviews-bar">
              <div class="reviews-bar__search">
                <span class="reviews-bar__search__icon"><i class="fas fa-search" style="color: #555555;"></i></span>
                <input placeholder="Поиск по содержанию..." name="" class="search reviews-bar__search__input reviews-bar__input"  style="margin: 0 0 0 10px;" />
              </div>
              <div class="reviews-bar__filter">
                <img src="<?php echo Config::BASE_URL; ?>/assets/img/filter.svg">
              </div> 
          </div>
          <ul class="reviews-content reviews__item list">
          </ul>
          <ul class="pagination reviews-list__pagination"></ul>
        </div>
        <div class="reviews-filter filters-block">
          <div class="filter__content active">
            <div class="filter__content-block filter-lot">
              <div class="tbl-cell tbl-cell-action filter-lot__elem forcalendar">
                <div class="filter-title"><?php echo $filterLang['byCalendar'];?></div>
                <div class="active filter-element-icon">
                    <i class="far fa-calendar-alt"></i>
                    <i class="fas fa-arrow-down"></i>              
                    <i class="fas fa-arrow-up hidden"></i>
                </div>
              </div>
              <div class="tbl-cell tbl-cell-action filter-lot__elem forlikes">
                <div class="filter-title"><?php echo $filterLang['byLikes'];?></div>
                <div class="filter-element-icon">
                    <i class="fas fa-heart"></i>
                    <i class="fas fa-arrow-up hidden"></i>              
                    <i class="fas fa-arrow-down hidden"></i>
                  </div>
              </div>
            </div>
            <div class="filter__content-block forstars">
              <div class="filter-title"><?php echo $filterLang['byRating'];?></div>
             <fieldset class="form-group">
              <div class="filter-element-icon filter-block">
                  <div class="stars">
                    <i class="font-icon font-icon-star" number='1'></i><i class="font-icon font-icon-star" number='2'></i><i class="font-icon font-icon-star" number='3'></i><i class="font-icon font-icon-star" number='4'></i><i class="font-icon font-icon-star" number='5'></i></div>
                </div>
                </fieldset>

             </div>
          </div>
            <div class="filter__content-block">
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
            <div class="filter__content-block forclient">
              <div class="filter-block">
                <fieldset class="form-group">
                        <label class="form-label semibold" for="tClient_id"></label>
                        <select id="select-client" data-width="100%" class="bootstrap-select bootstrap-select-arrow" data-id="tClient_id" data-live-search = "true"></select>
                </fieldset>
              </div>
            </div>
            
          <div class="filter-buttons" style="margin-top: 60px;">
                <div class="filter-buttons__show forshow">
                  <button type="button" class="btn btn-rounded btn-inline btn-info">Показать</button>
              </div>
                <div class="filter-buttons__cancel forcancel">
                    <button type="button" class="btn btn-rounded btn-inline btn-danger-outline">Сбросить</button>
              </div>
              </div>
        </div>
      </section>
       
    </div>


<script src="<?php echo Config::BASE_URL; ?>/assets/js/lib/daterangepicker/daterangepicker.js"></script>
<script src="<?php echo Config::BASE_URL; ?>/assets/js/lib/bootstrap-select/bootstrap-select.min.js"></script>

<script type="text/javascript">

$(document).ready(function() {

  // $('.reviews-bar__filter').on('click',()=>{
  //   console.log($('reviews-filter'));
  //    $('reviews-filter').css('display','block');
  // })

    function setEqualHeight(columns)
  {
  var tallestcolumn = 0;
  columns.each(
  function()
  {
  currentHeight = $(this).height();
  if(currentHeight > tallestcolumn)
  {
  tallestcolumn = currentHeight;
  }
  }
  );
  columns.height(tallestcolumn);
  }
  $(document).ready(function() {
  setEqualHeight($(".reviews-content > li .review-block__body"));
  });



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

  <?php 
    System::addJs('modules', 'block-control'); 
    System::addJs('pages', 'reviews');
    System::addJs('modules', 'filter');
    System::addJs('modules', 'tpl');
    System::addJs('modules', 'tplInner');
    System::addJs('modules', 'review-all');
    System::addJs('modules', 'review-info');
    System::addJs('modules', 'client-info');
    System::addJs('modules', 'review-all-inner');
  ?>