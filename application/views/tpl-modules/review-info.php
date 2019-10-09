<link rel="stylesheet" href="<?php echo Config::BASE_URL; ?>/assets/css/separate/pages/project.min.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL;?>\assets\css\modules\reviews.css">
<link rel="stylesheet" href="<?php echo Config::BASE_URL;?>/assets/css/lib/easy-toggle-state/switchbox.css">

<div class="forcenter-in">
    <form>
    <div class="panel panel-default scrollable commentsPanel">
        <div class="panel-body">
            <div class="review-block" id = "reviewInfo">
              <div class="review-block__head">
                <div class="review-block__head-left-side">
                  <img class="review-block_client-photo" src="${GlobalVars.baseUrl}assets/img/users/photo-92-3.jpg" alt="">
                  <div class="review-block_title-and-date">
                    <span class="review-block_client-title" id="client-name">Юлия Барабулько</span>
                    <span class="review-block_date" id="reviewTime">10:15 15.05.19</span>
                  </div>
                </div>
                <div class="review-block__head-right-side" style="float: right;">
                  <button type="button" class="for-service example-switchbox" data-toggle-class="is-pressed" id="reviewStatus" data-id="reviewStatus"> 
              </button>
                  <!-- <div class="checkbox-toggle" title="Отображение в виджете">
                    <input id="showReview" type="checkbox" readonly="true">
                    <label></label>
                  </div> -->
                </div>
              </div>
              <div class="review-block__body">
                <span class="review-block-title" id="title">Заголовок</span>
                <span class="review-block-text" id="text">Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта.</span>
              </div>
              <div class="review-block__footer">
                <div class="review-block-stars stars">

                </div>
                <div class="review-block-likes">
                  <span class="review-block-likes_count likes-count">117</span>
                  <i class="fa fa-heart"></i>
                </div>
              </div>
            </div>
            <!-- <section class="review-block" id = "reviewInfo">
                 <section class="proj-page-section proj-page-time-info">
                            <div class="tbl">
                                <div class="tbl-row">
                                    <div class="tbl-cell">Показывать в виджете</div>
                                    <div class="tbl-cell tbl-cell-time">
                                        <div class="checkbox-toggle" style="float:right;">
                                          <input id="showReview" type="checkbox">
                                          <label for="showReview"></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="tbl-row">
                                    <div class="tbl-cell semibold" id="client-name"></div>
                                    <div class="tbl-cell tbl-cell-time" id="reviewTime"></div>
                                </div>
                            </div>
                        </section>
                        <section class="proj-page-section proj-page-labels">
                            <header class="proj-page-subtitle padding-sm">
                                <h3 id="title">Здесь будет заголовок отзыва</h3>
                            </header>
                            <p id="text">Текст отзыва тута</p>
                        </section>
                        <section class="proj-page-section proj-page-time-info">
                         <div class="card-typical-section">
                            <div class="card-typical-linked">
                                <div class="footer-review card-typical-linked">
                                    <div class="stars">
                                        
                                    </div>

                                    <div class="likes" style="float:right; color: #f18482;">
                                        <i class="fa fa-heart"></i>
                                        <span class="likes-count">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section> -->
        </div>
    </div>
</form>
</div>




    <?php System::addJs('modules', 'review-info'); ?>