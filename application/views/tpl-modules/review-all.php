
<div class="forcenter-in">
	<form id='review-all'>
	<div id="f_mainComments" class="panel panel-default scrollable commentsPanel">
		<div class="services-bar__sort">
                <div class="services-bar__sort-dropdown">
                  <i class="icon-arrows fa-exchange-alt" style="color: #AC74BA;"></i>
                  <i class="icon-arrow-up fa-long-arrow-alt-up hidden" style="color: #AC74BA;"></i>              
                  <i class="icon-arrow-down fa-long-arrow-alt-down hidden" style="color: #AC74BA;"></i>
                  <button class="services-bar__sort-dropdown__button"><span class="services-bar__input">Сортировка</span></button>
                  <div class="services-bar__sort-dropdown__content">
                    <a class="sort" data-sort="review-block_date">Дата</a>
                    <a class="sort" data-sort="stars">Рейтинг</a>
                    <a class="sort" data-sort="review-block-likes_count">Количество лайков</a>
                  </div>
                </div>
              </div>
		<div class="panel-body list">

		</div>
		<ul class="pagination services-list__pagination"></ul>
	</div>
</form>
</div>
<?php System::addJs('modules', 'review-all'); ?>
<?php System::addJs('modules', 'review-all-inner'); ?>
